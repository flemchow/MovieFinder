import React, { FormEvent, useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { HeaderContext, NavBarLinkContext } from "../../context";
import { loginUser } from "../../api";
import "./login.css";

interface UserLoginTypes {
  username: string;
  password: string;
}

interface UserSubmitType {
  username: string;
  password: string;
  submit: boolean;
}

const UserLogin = {
  username: "",
  password: "",
};

const LoginErrorPrompt = {
  username: "",
  password: "",
  submit: false,
};

export default function LoginComponent(): JSX.Element {
  const { data, setData } = useContext(NavBarLinkContext);
  const { header, setHeader } = useContext(HeaderContext);
  const [userData, setUserData] = useState<UserLoginTypes>(UserLogin);
  const [loginState, setLoginState] = useState<UserSubmitType>(
    LoginErrorPrompt
  );
  const history = useHistory();
  const prompt = "* Cannot be left empty";

  const checkInputs = () => {
    if (!userData.username || !userData.password) {
      setLoginState({
        ...loginState,
        username: prompt,
        password: prompt,
        submit: false,
      });
      return false;
    }
    return true;
  };

  async function login(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    if (checkInputs()) {
      const { username, password } = userData;
      const logStatus = await loginUser({ username, password });
      if (logStatus) {
        setData({ ...data, loginStatus: true });

        history.goBack();
      }
    }
  }

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
          }}
        />
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
          }}
        />
        <input
          className="subBtn"
          type="submit"
          value="Log In"
          onClick={(event) => {
            login(event);
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
