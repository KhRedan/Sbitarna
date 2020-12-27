import React from "react";
import "./App.css";
import Login from "./features/Authentification/login/Login";
import Signup from "./features/Authentification/signup/Signup";
import Dashboard from "./features/dashboard/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

export let axiosInstance = axios.create({
  baseURL: "/api", //declaration des API du backend
  headers: {
    "Content-Type": "application/json",
  },
});

function App() {
  return (
    //Gerer le routing entre connexion inscription et les tableaux de board
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
