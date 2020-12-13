// created by Flemming
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RegisterComponent, LoginComponent } from "./";
import { HeaderContext } from "../../context";
import "./login.css";

/**
 * function for houseing the login and register components
 * allows sharing of login/register states
 */
export default function Login(): JSX.Element {
  const [header, setHeader] = useState<string>("Login");
  return (
    <div id="container">
      <BrowserRouter>
        <Switch>
          <HeaderContext.Provider value={{ header, setHeader }}>
            <Route path="/login" exact component={LoginComponent} />
            <Route path="/register" exact component={RegisterComponent} />
          </HeaderContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
