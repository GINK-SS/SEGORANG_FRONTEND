import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getUserInfo } from '../api';
import { userInfoState } from '../atoms';
import Login from './Login';
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
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
