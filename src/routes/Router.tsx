import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../atoms';
import Login from './Login';
import SignUp from './signUp/SignUp';
import SJAuth from './signUp/SJAuth';

function Router() {
  const accessToken = localStorage.getItem('sgrUserToken');
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  if (accessToken) {
    setUserInfo((prev) => {
      return {
        ...prev,
        accessToken: accessToken,
      };
    });
  }

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
