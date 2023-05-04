import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Recipe from "./pages/Recipe";
import PostRecipe from "./pages/PostRecipe";
import Navbar from "./components/Nav/Navbarmenu";
import Search from "./pages/Search";
import PostDetails from "./pages/PostDetails";
import Follows from "./pages/Follows";
import TopRated from "./pages/TopRated";
import Favorites from "./pages/Favorites";

function App() {

  return (
   <>
    <Router basename="/">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register} />
        <Route exact path="/recipes" component={Recipe} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/post/:postId" component={PostDetails} />
        <Route exact path="/post-recipe" component={PostRecipe} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/follows/:userID" component={Follows} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/favorites" component={Favorites} />
      </Switch>
    </Router>
   </>
  );
}

export default App;
