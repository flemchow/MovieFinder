// created by flemming
import React, { useEffect, useState } from "react";
import { GenreNav, MovieListing } from "../../components";
import { NavContext } from "../../context";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Movie, PageData } from "../../models";
import { ByGenre } from "../../api";

/**
 * syntactic sugar, defines type
 */
interface ListingData {
  genre: string;
  pageNumber: number;
  movies: Movie[];
  pageData: PageData;
}

/**
 * sets default value for genre page
 */
const defaultData = {
  genre: "",
  pageNumber: 1,
  movies: [],
  pageData: { page: 0, totalPages: 0 },
};

/**
 * returns page house all to deal with genres page
 */
export default function GenresPage(): JSX.Element {
  const [data, setData] = useState<ListingData>(defaultData);

  // auto loads in movies when genre page first gets rendered
  useEffect(() => {
    (async () => {
      const { movies, pageData } = await ByGenre({
        genre: 0,
        pageNumber: data.pageNumber,
      });

      setData({
        ...data,
        movies: movies,
        pageData: {
          page: pageData.page,
          totalPages: pageData.totalPages,
        },
        genre: "All",
      });
    })();
  }, []);

  return (
    <>
      <h1>Genre: {data.genre}</h1>
      <BrowserRouter>
        <Switch>
          <NavContext.Provider value={{ data, setData }}>
            <GenreNav />
            <Route path="/genres" component={MovieListing} />
          </NavContext.Provider>
        </Switch>
      </BrowserRouter>
    </>
  );
}
