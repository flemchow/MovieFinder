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
  const [regiState, setRegiState] = useState<AccountSubmitType>(
    RegiErrorPrompt
  );
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
          setRegiState({
            ...regiState,
            confirmPassword: pwdErrorPrompt,
            submit: false,
          });
        } else {
          const value = RegistrationUser({
            username: accountData.username,
            password: accountData.password,
          });
          value ? alert("Registered!") : alert("error occured 😭");
        }
      } else {
        setRegiState({
          ...regiState,
          password: prompt,
          confirmPassword: prompt,
          username: prompt,
          submit: false,
        });
      }
    }
    isFirstRun.current = false;
  }, [regiState.submit]);

  return (
    <>
      <div id="header">
        <h1>{header}</h1>
      </div>
      <form id="registerForm" className="accountForm">
        <label className="formLabel">
          Username <span className="errorPrompt">{regiState.username}</span>
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
            setRegiState({
              ...regiState,
              username: "",
              // submit: false,
            });
          }}
        />
        <label className="formLabel">
          Password <span className="errorPrompt">{regiState.password}</span>
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
            setRegiState({
              ...regiState,
              password: "",
              // submit: false,
            });
          }}
        />
        <label className="formLabel">
          Confirm Password{" "}
          <span className="errorPrompt">{regiState.confirmPassword}</span>
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
            setRegiState({
              ...regiState,
              confirmPassword: "",
              // submit: false,
            });
          }}
        />
        <input
          className="subBtn"
          type="submit"
          value="Register"
          onClick={(event) => {
            event.preventDefault();
            setRegiState({
              ...regiState,
              submit: true,
            });
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
