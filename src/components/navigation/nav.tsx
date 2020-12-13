// created by Flemming
import React, { useState } from "react";
import logo from "../../assets/logo_v2.1_bigger.png";
import { NavLink, useHistory } from "react-router-dom";
import "./nav.css";

/**
 * simple react element, is nav bar
 * houses nav links to load portions of teh page
 */
export default function NavBar(): JSX.Element {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const history = useHistory();
  const handleEnter = (event: { key: string }) => {
    if (event.key === "Enter") {
      history.push(`/search`, searchKeyword);
      setSearchKeyword("");
    }
  };
  return (
    <div className="navBar">
      <div id="logoContainer">
        <NavLink id="logolink" to="/">
          <img src={logo} alt="MovieFinder" />
        </NavLink>
      </div>
      <div id="innerContainer">
        <ul id="headerList">
          <li className="headerItem">
            <input
              type="text"
              placeholder="Search..."
              value={searchKeyword}
              onChange={(event) => {
                setSearchKeyword(event.target.value);
              }}
              onKeyPress={handleEnter}
            />
          </li>
          <li className="headerItem">
            <NavLink
              to="/"
              exact
              className="headerLink"
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li className="headerItem">
            <NavLink
              to="/genres"
              exact
              className="headerLink"
              activeClassName="active"
            >
              Genres
            </NavLink>
          </li>
          <li className="headerItem">
            <NavLink
              to="/mylists"
              exact
              className="headerLink"
              activeClassName="active"
            >
              MyLists
            </NavLink>
          </li>
          <li className="headerItem">
            <NavLink
              to="/login"
              exact
              className="headerLink"
              activeClassName="active"
              id="loginHeader"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
