import React, { useState } from "react";
import { NavBar, Footer } from "./components/index";
import {
  HomePage,
  LoginPage,
  GenresPage,
  SearchPage,
  ListPage,
  AccountPage,
} from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBarLinkContext } from "./context";

interface AccountType {
  headerLink: string;
  loginStatus: boolean;
}

const AccountDefault = {
  headerLink: "Login",
  loginStatus: false,
};

function App() {
  const [data, setData] = useState<AccountType>(AccountDefault);
  return (
    <BrowserRouter>
      <NavBarLinkContext.Provider value={{ data, setData }}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/account" exact component={AccountPage} />
          <Route path="/genres" exact component={GenresPage} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/mylists" exact component={ListPage} />
        </Switch>
      </NavBarLinkContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
