import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { fetchUserInfo } from '../api/common';
import { notificationState, userInfoState } from '../atoms';
import Notification from '../container/common/Notification';
import BoardNav from '../container/common/BoardNav';
import Header from '../container/common/Header';
import BoardPage from '../pages/BoardPage';
import MainPage from '../pages/MainPage';
import PostPage from '../pages/PostPage';
import Login from './login/Login';
import SignUp from './signUp/SignUp';
import SJAuth from './signUp/SJAuth';

function Router() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [notification, setNotification] = useRecoilState(notificationState);

  useEffect(() => {
    const accessToken = localStorage.getItem('sgrUserToken');

    if (accessToken && !userInfo.accessToken) {
      initUserInfo(accessToken);
    }
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (notification.visible) {
      timeout = setTimeout(
        () => setNotification((prev) => ({ ...prev, visible: false })),
        3000
      );
    }

    return () => clearTimeout(timeout);
  }, [notification, setNotification]);

  const initUserInfo = async (accessToken: string) => {
    const {
      result: { id, name, nickname, major },
    } = await fetchUserInfo(accessToken);

    setUserInfo((prev) => {
      return {
        ...prev,
        accessToken: accessToken,
        userId: id,
        userName: name,
        userNickname: nickname,
        userMajor: major,
      };
    });
  };

  return (
    <BrowserRouter>
      {notification.visible && <Notification />}

      {userInfo.accessToken ? (
        <>
          <Header />
          <BoardNav />
        </>
      ) : null}

      <Switch>
        <Route
          path={'/login'}
          component={() => (userInfo.accessToken ? <Redirect to={'/'} /> : <Login />)}
        />
        <Route
          path={'/signUp'}
          component={() => (userInfo.accessToken ? <Redirect to={'/'} /> : <SJAuth />)}
        />
        <Route
          path={'/signUpForm'}
          component={() => (userInfo.accessToken ? <Redirect to={'/'} /> : <SignUp />)}
        />
        <Route
          exact
          path={'/board/:boardTitle'}
          component={() =>
            userInfo.accessToken ? <BoardPage /> : <Redirect to={'/login'} />
          }
        />
        <Route
          exact
          path={'/post/:postId'}
          component={() =>
            userInfo.accessToken ? <PostPage /> : <Redirect to={'/login'} />
          }
        />
        <Route
          exact
          path={'/'}
          component={() =>
            userInfo.accessToken ? <MainPage /> : <Redirect to={'/login'} />
          }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
