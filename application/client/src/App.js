import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Recipe from "./pages/Recipe";
import PostRecipe from "./pages/PostRecipe";

function App() {
  return (
   <>
    <Router basename="/">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/recipes" component={Recipe} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/post-recipe" component={PostRecipe} />
      </Switch>
    </Router>
   </>
  );
}

export default App;
