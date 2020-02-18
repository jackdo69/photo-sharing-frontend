import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import "./App.css";

import User from "./pages/User/User";
import Auth from "./pages/Auth/Auth";
import Header from "./components/Header/Header";
import ImageList from "./components/Image/ImageList";

const App = () => {
  let routes = (
    <Switch>
      <Route path="/" exact>
        <ImageList />
      </Route>
      <Route path="/user" exact>
        <User />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div className="App">
      <Router>
        <Header />
        {routes}
      </Router>
    </div>
  );
};

export default App;
