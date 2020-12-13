//created by flemming
import React from "react";
import "./nav.css";
import logo from "../../assets/logo_v2.2.png";
import tmdb from "../../assets/theMovieDB.svg";

/**
 * returns react element footer
 * simple components at the bottom of the page
 */
export default function Footer() {
  return (
    <footer id="footerContainer">
      <div className="footdiv" id="creditsDiv">
        <img className="images" id="tmdb" src={tmdb} alt="the movie database" />
      </div>
      <div className="footdiv" id="randomInfoDiv">
        <ul id="footList">
          <li className="footItem">
            <h3>Contact us</h3>
          </li>
          <li className="footItem">
            <h3>budgetNetflix@gmail.com</h3>
          </li>
          <li className="footItem">
            <h3>(604) - 1 - BUDGET (283438)</h3>
          </li>
        </ul>
      </div>
      <div className="footdiv" id="logoDiv">
        <img className="images" id="mfLogo" src={logo} alt="logo" />
      </div>
    </footer>
  );
}
