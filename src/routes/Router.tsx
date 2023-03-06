import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import SignUp from './signUp/SignUp';
import SJAuth from './signUp/SJAuth';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/login'}>
          <Login />
        </Route>
        <Route path={'/signUp'}>
          <SJAuth />
        </Route>
        <Route path={'/signUpForm'}>
          <SignUp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
