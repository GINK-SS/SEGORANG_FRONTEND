import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/login'}>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
