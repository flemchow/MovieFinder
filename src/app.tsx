// created by flemming
import React from "react";
import { NavBar, Footer } from "./components/index";
import { HomePage, LoginPage, GenresPage, SearchPage, ListPage } from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/**
 * the base root component that serves as the platform for hoisting all the other components that aggregate into the application
 */
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/genres" exact component={GenresPage} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/mylists" exact component={ListPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
