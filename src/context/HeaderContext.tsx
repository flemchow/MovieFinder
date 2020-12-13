//created by flemming
/**
 * React TypeScript file for defining the state.
 * Allows other files to access said state
 */
import { createContext } from "react";

/**
 * defines static typing, syntactic sugar, ehnaces readibility
 */
interface HeaderContextType {
  header: string;
  setHeader: React.Dispatch<React.SetStateAction<string>>;
}

export const HeaderContext = createContext<HeaderContextType>(
  {} as HeaderContextType
);
