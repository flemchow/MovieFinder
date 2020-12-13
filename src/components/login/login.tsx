// created by Flemming
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { HeaderContext } from "../../context";
import { LoginUser } from "../../api";
import "./login.css";

/**
 * interface used to define typing, syntactic sugar
 */
interface UserLoginTypes {
  username: string;
  password: string;
}

/**
 * interface used to define typing, syntactic sugar
 */
interface UserSubmitType {
  username: string;
  password: string;
  submit: boolean;
}

/**
 * constant used for defining default stat values
 */
const UserLogin = {
  username: "",
  password: "",
};

/**
 * constant used for defining default stat values
 */
const LoginErrorPrompt = {
  username: "",
  password: "",
  submit: false,
};

/**
 * returns a react login element
 */
export default function LoginComponent(): JSX.Element {
  const { header, setHeader } = useContext(HeaderContext);
  const [userData, setUserData] = useState<UserLoginTypes>(UserLogin);
  const [loginState, setLoginState] = useState<UserSubmitType>(
    LoginErrorPrompt
  );
  const prompt = "* Cannot be left empty";

  /**
   * ensure the interface rerenders upon each loginState state change
   */
  const isFirstRun = useRef(true);
  useEffect(() => {
    // this needs to be redone, just a simple poc right now
    if (userData.password && userData.username) {
      const value = LoginUser({
        username: userData.username,
        password: userData.password,
      });
      value ? alert("Logged in!") : alert("error occured 😭");
    } else {
      if (!isFirstRun.current) {
        setLoginState({
          ...loginState,
          username: prompt,
          password: prompt,
          submit: false,
        });
      }
      isFirstRun.current = false;
    }
  }, [loginState.submit]);

  return (
    <>
      <div id="header">
        <h1>{header}</h1>
      </div>
      <form method="get" id="loginForm" className="accountForm">
        <label className="formLabel">
          Username <span className="errorPrompt">{loginState.username}</span>
        </label>
        <input
          className="loginInput"
          id="loginUsername"
          type="text"
          value={userData.username}
          onChange={(event) => {
            setUserData({ ...userData, username: event.target.value });
            setLoginState({ ...loginState, username: "" });
            // setLoginState({ ...loginState, username: "", submit: false });
          }}
        />
        {/* <label className="errorPrompt">{loginState.username}</label> */}
        <label className="formLabel">
          Password <span className="errorPrompt">{loginState.password}</span>{" "}
        </label>
        <input
          className="loginInput"
          id="loginPassword"
          type="password"
          value={userData.password}
          onChange={(event) => {
            setUserData({ ...userData, password: event.target.value });
            setLoginState({ ...loginState, password: "" });
            // setLoginState({ ...loginState, password: "", submit: false });
          }}
        />
        {/* /<label className="errorPrompt">{loginState.password}</label> */}
        <input
          className="subBtn"
          type="button"
          value="Log In"
          onClick={() => {
            setLoginState({
              ...loginState,
              submit: true,
            });
          }}
        />
        <p>
          Don't have an account?{" "}
          <span
            id="registerLink"
            onClick={() => {
              setHeader("Register");
            }}
          >
            <NavLink to="/register">Register Here</NavLink>
          </span>
        </p>
      </form>
    </>
  );
}
