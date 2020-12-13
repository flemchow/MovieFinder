// created by flemming
/**
 * defines the context for useContext
 */
import { createContext, SetStateAction } from "react";
import { Movie, PageData } from "../models";

/**
 * typing used by said context
 */
interface SearchType {
  pageNumber: number;
  movies: Movie[];
  pageData: PageData;
}

/**
 * defines type
 * enahnces user readablity
 * syntactic sugar
 */
interface SearchContextType {
  searchData: SearchType;
  setSearchData: React.Dispatch<SetStateAction<SearchType>>;
}

/**
 * export statement for exporting the context to various components that require it
 */
export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);
