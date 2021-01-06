import { createContext, SetStateAction } from "react";
import { Movie, PageData } from "../models";

interface SearchType {
  pageNumber: number;
  movies: Movie[];
  pageData: PageData;
}

interface SearchContextType {
  searchData: SearchType;
  setSearchData: React.Dispatch<SetStateAction<SearchType>>;
}

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);
