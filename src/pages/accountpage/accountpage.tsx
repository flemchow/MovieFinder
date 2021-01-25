import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { NavBarLinkContext } from "../../context";
import { AccountSidebar } from "../../components/account";

export default function AccountPage(): JSX.Element {
  const { data, setData } = useContext(NavBarLinkContext);
  const [expTime, setExptime] = useState();
  useEffect(() => {
    const time = JSON.parse(
      atob(localStorage.getItem("access")!.split(".")[1])
    );
    setExptime(time.exp);
  }, []);

  return data.loginStatus === false ||
    new Date().getTime() / 1000 > expTime! ? (
    <Redirect to="/login" />
  ) : (
    <>
      <h1>Hello, {localStorage.getItem("username")}</h1>
      <AccountSidebar />
    </>
  );
}
