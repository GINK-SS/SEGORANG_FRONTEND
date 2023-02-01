import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
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
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
