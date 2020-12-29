import React, { useContext, useState, FormEvent } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { HeaderContext } from "../../context";
import "./login.css";
import { registrationUser } from "../../api";

interface AccountDataType {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const DefaultAccountData = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export default function Register(): JSX.Element {
  const { header, setHeader } = useContext(HeaderContext);
  const [accountData, setAccountData] = useState<AccountDataType>(
    DefaultAccountData
  );
  const [emailPrompt, setEmailPrompt] = useState<string>("");
  const [usernamePrompt, setUsernamePrompt] = useState<string>("");
  const [passwordPrompt, setPasswordPrompt] = useState<string>("");
  const [cPasswordPrompt, setCPasswordPrompt] = useState<string>("");
  const history = useHistory();
  const prompt = "* Cannot be left empty";
  const pwdErrorPrompt = "* Passwords dont match";

  function checkInputs() {
    let valid = true;
    if (!accountData.email) {
      setEmailPrompt(prompt);
      valid = false;
    }
    if (!accountData.username) {
      setUsernamePrompt(prompt);
      valid = false;
    }
    if (!accountData.password) {
      setPasswordPrompt(prompt);
      valid = false;
    }
    if (!accountData.confirmPassword) {
      setCPasswordPrompt(prompt);
      valid = false;
    }
    if (accountData.password != accountData.confirmPassword) {
      setCPasswordPrompt(pwdErrorPrompt);
      valid = false;
    }
    return valid;
  }

  async function register(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    if (checkInputs()) {
      const { username, password, email } = accountData;
      const regiStatus = await registrationUser({ email, username, password });
      if (regiStatus) {
        setHeader("Login");
        history.replace("/");
        history.push("/login");
      }
    }
  }

  return (
    <>
      <div id="header">
        <h1>{header}</h1>
      </div>
      <form id="registerForm" className="accountForm">
        <label className="formLabel">
          Email <span className="errorPrompt">{emailPrompt}</span>
        </label>
        <input
          type="text"
          className="regiInput"
          id="regiEmail"
          value={accountData.email}
          onChange={(event) => {
            setAccountData({
              ...accountData,
              email: event.target.value,
            });
            setEmailPrompt("");
          }}
        />
        <label className="formLabel">
          Username <span className="errorPrompt">{usernamePrompt}</span>
        </label>
        <input
          type="text"
          className="regiInput"
          id="regiUsername"
          value={accountData.username}
          onChange={(event) => {
            setAccountData({
              ...accountData,
              username: event.target.value,
            });
            setUsernamePrompt("");
          }}
        />
        <label className="formLabel">
          Password <span className="errorPrompt">{passwordPrompt}</span>
        </label>
        <input
          type="password"
          className="regiInput"
          id="regiPassword"
          value={accountData.password}
          onChange={(event) => {
            setAccountData({
              ...accountData,
              password: event.target.value,
            });
            setPasswordPrompt("");
          }}
        />
        <label className="formLabel">
          Confirm Password{" "}
          <span className="errorPrompt">{cPasswordPrompt}</span>
        </label>
        <input
          type="password"
          className="regiInput"
          id="regiConfirmPassword"
          value={accountData.confirmPassword}
          onChange={(event) => {
            setAccountData({
              ...accountData,
              confirmPassword: event.target.value,
            });
            setCPasswordPrompt("");
          }}
        />
        <input
          className="subBtn"
          type="submit"
          value="Register"
          onClick={(event) => {
            register(event);
          }}
        />
        <p>
          Already have an account?{" "}
          <span
            id="loginForm"
            onClick={() => {
              setHeader("Login");
            }}
          >
            <NavLink to="/login">Log In Here</NavLink>
          </span>
        </p>
      </form>
    </>
  );
}
