import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getUserInfo } from '../api';
import { userInfoState } from '../atoms';
import Login from './Login';
import SignUp from './signUp/SignUp';
import SJAuth from './signUp/SJAuth';

function Router() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const accessToken = localStorage.getItem('sgrUserToken');

    if (accessToken) {
      initUserInfo(accessToken);
    }
  }, []);

  const initUserInfo = async (accessToken: string) => {
    const { name, nickname, major } = await getUserInfo(accessToken);

    setUserInfo((prev) => {
      return {
        ...prev,
        accessToken: accessToken,
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
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
