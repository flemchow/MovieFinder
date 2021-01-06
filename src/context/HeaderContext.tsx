import { createContext } from "react";

interface HeaderContextType {
  header: string;
  setHeader: React.Dispatch<React.SetStateAction<string>>;
}

export const HeaderContext = createContext<HeaderContextType>(
  {} as HeaderContextType
);
