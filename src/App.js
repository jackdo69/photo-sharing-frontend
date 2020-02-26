import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import User from "./pages/User/User";
import Auth from "./pages/Auth/Auth";
import Header from "./components/Header/Header";
import ImageList from "./pages/ImageList/ImageList";
import { AuthContext } from "./context/auth-context";
import useAuth from "./hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <ImageList />
        </Route>
        <Route path="/:userId" exact>
          <User />
        </Route>
      </Switch>
    );
    
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <ImageList />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <Header />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
