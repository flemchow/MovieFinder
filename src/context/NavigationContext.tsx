// created by flemming
import React, { createContext, SetStateAction } from "react";
import { Movie, PageData } from "../models";
/**
 * defines type
 * enahnces user readablity
 * syntactic sugar
 */
interface GenreType {
  genre: string;
  pageNumber: number;
  movies: Movie[];
  pageData: PageData;
}

/**
 * defines type
 * enahnces user readablity
 * syntactic sugar
 */
interface NavContextType {
  data: GenreType;
  setData: React.Dispatch<SetStateAction<GenreType>>;
}

export const NavContext = createContext<NavContextType>({} as NavContextType);
