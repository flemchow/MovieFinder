import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavBarLinkContext } from "../../context";
import "./dropdownMenu.css";

export default function DropDown(): JSX.Element {
  const { data, setData } = useContext(NavBarLinkContext);
  const [reroute, setReroute] = useState<string>("Login");
  useEffect(() => {
    if (!data.loginStatus) {
      setData({ ...data, headerLink: "Login" });
      setReroute(`/login`);
    } else {
      setData({ ...data, headerLink: "MyAccount" });
      setReroute(`/account`);
    }
  }, [data.loginStatus]);
  return (
    <>
      <NavLink
        to={reroute}
        exact
        className="headerLink"
        activeClassName="active"
        id="title"
      >
        {data.headerLink}
      </NavLink>
      <div id="items">
        <p>hello</p>
      </div>
    </>
  );
}
