import React, { createContext, SetStateAction } from "react";

interface HeaderType {
  headerLink: string;
  loginStatus: boolean;
}

interface NavBarLinkType {
  data: HeaderType;
  setData: React.Dispatch<SetStateAction<HeaderType>>;
}

export const NavBarLinkContext = createContext<NavBarLinkType>(
  {} as NavBarLinkType
);
