import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';

import YuelingLiu from './pages/YuelingLiu';
import DuncanHerington from './pages/DuncanHerington'
import MarcelAzouri from './pages/MarcelAzouri'
import NathanLeHowland from './pages/NathanLeHowland'
import PriyaPradeep from './pages/PriyaPradeep'
import SamuelElias from './pages/SamuelElias'
import YassonHaddish from './pages/YassonHaddish'

function App() {
  return (
   <>
    <Router basename="/">
          <Switch>
            <Route exact path="/" component={Home} />

            <Route  path="/YuelingLiu" component={YuelingLiu} />
            <Route exact path="/DuncanHerington" component={DuncanHerington} />
            <Route exact path="/MarcelAzouri" component={MarcelAzouri} />
            <Route exact path="/NathanLeHowland" component={NathanLeHowland} />
            <Route exact path="/PriyaPradeep" component={PriyaPradeep} />
            <Route exact path="/SamuelElias" component={SamuelElias} />
            <Route exact path="/YassonHaddish" component={YassonHaddish} />
          </Switch>
        </Router>
   </>
  );
}

export default App;
