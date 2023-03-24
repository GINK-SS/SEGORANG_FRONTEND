import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getUserInfo } from '../api';
import { userInfoState } from '../atoms';
import NormalBoard from './board/NormalBoard';
import Post from './board/Post';
import Login from './Login';
import Main from './main/Main';
import SignUp from './signUp/SignUp';
import SJAuth from './signUp/SJAuth';

interface IGetUserInfo {
  msg: string;
  result: {
    id: string;
    name: string;
    nickname: string;
    major: string;
  };
}

function Router() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const accessToken = localStorage.getItem('sgrUserToken');

    if (accessToken && !userInfo.accessToken) {
      initUserInfo(accessToken);
    }
  }, []);

  const initUserInfo = async (accessToken: string) => {
    const {
      result: { id, name, nickname, major },
    }: IGetUserInfo = await getUserInfo(accessToken);

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
          path={'/board/:title'}
          component={() =>
            userInfo.accessToken ? <NormalBoard /> : <Redirect to={'/login'} />
          }
        />
        <Route
          exact
          path={'/board/:title/:postId'}
          component={() => (userInfo.accessToken ? <Post /> : <Redirect to={'/login'} />)}
        />
        <Route
          exact
          path={'/'}
          component={() => (userInfo.accessToken ? <Main /> : <Redirect to={'/login'} />)}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
