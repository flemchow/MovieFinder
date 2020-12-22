import React, { createContext, SetStateAction } from "react";
import { Movie, PageData } from "../models";

interface GenreType {
  genre: string;
  pageNumber: number;
  movies: Movie[];
  pageData: PageData;
}

interface NavContextType {
  data: GenreType;
  setData: React.Dispatch<SetStateAction<GenreType>>;
}

export const NavContext = createContext<NavContextType>({} as NavContextType);
