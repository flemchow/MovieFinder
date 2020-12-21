//created by Flemming
import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { HeaderContext } from "../../context";
import "./login.css";
import { RegistrationUser } from "../../api";

/**
 * used for defining types, syntactic sugar
 */
interface AccountDataType {
  username: string;
  password: string;
  confirmPassword: string;
}

/**
 * defining default type, syntatic sugar
 */
const DefaultAccountData = {
  username: "",
  password: "",
  confirmPassword: "",
};

/**
 * used for defining types, syntactic sugar
 */
interface AccountSubmitType {
  username: string;
  password: string;
  confirmPassword: string;
  submit: boolean;
}

/**
 * defining default type, syntatic sugar
 */
const RegiErrorPrompt = {
  username: "",
  password: "",
  confirmPassword: "",
  submit: false,
};

/**
 * retuns react element for registers
 */
export default function Register(): JSX.Element {
  const { header, setHeader } = useContext(HeaderContext);
  const [accountData, setAccountData] = useState<AccountDataType>(
    DefaultAccountData
  );
  const [usernamePrompt, setUsernamePrompt] = useState<string>("");
  const [passwordPrompt, setPasswordPrompt] = useState<string>("");
  const [cPasswordPrompt, setCPasswordPrompt] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const prompt = "* Cannot be left empty";
  const pwdErrorPrompt = "* Passwords dont match";
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (!isFirstRun.current) {
      if (
        accountData.password &&
        accountData.confirmPassword &&
        accountData.username
      ) {
        if (accountData.confirmPassword !== accountData.password) {
          setCPasswordPrompt(pwdErrorPrompt);
          setSubmit(false);
        } else {
          // setSubmit(false);
          console.log("registration process start");

          (async () => {
            const regiStatus = await RegistrationUser({
              username: accountData.username,
              password: accountData.password,
            });
            console.log(regiStatus);
          })();
        }
      } else {
        setSubmit(false);
        if (!accountData.username) setUsernamePrompt(prompt);
        if (!accountData.password) setPasswordPrompt(prompt);
        if (!accountData.confirmPassword) setCPasswordPrompt(prompt);
      }
    }
    isFirstRun.current = false;
  }, [submit]);

  return (
    <>
      <div id="header">
        <h1>{header}</h1>
      </div>
      <form id="registerForm" className="accountForm">
        <label className="formLabel">
          Email <span className="errorPrompt">{usernamePrompt}</span>
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
            event.preventDefault();
            setUsernamePrompt("");
            setPasswordPrompt("");
            setCPasswordPrompt("");
            setSubmit(true);
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
