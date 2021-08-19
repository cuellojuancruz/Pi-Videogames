import CreateGames from "./components/CreateGames/CreateGame";
import { Route } from "react-router-dom";
import Games from "./components/Games/Games";
import  Home  from "./conteiners/Home";
import React from "react";
import Detail from "./components/Detail/Detail"

import './App.css';



function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Home}/>
      <Route path="/Games" component={Games}/>
      <Route path="/CreateGames" component={CreateGames}/>
      <Route path="/Detail" component = {Detail}/>
    </React.Fragment>
  );
}

export default App;
