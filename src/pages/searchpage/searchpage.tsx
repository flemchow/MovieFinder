import React, { useLayoutEffect, useRef, useState } from "react";
import { SearchResults } from "../../api";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { MovieListing } from "../../components";
import { SearchContext } from "../../context";
import { Movie, PageData } from "../../models";

interface SearchType {
  pageNumber: number;
  movies: Movie[];
  pageData: PageData;
}

const SearchDefault = {
  pageNumber: 1,
  movies: [],
  pageData: { page: 1, totalPages: 0 },
};

export default function SearchPage(): JSX.Element {
  const [searchData, setSearchData] = useState<SearchType>(SearchDefault);
  const sendKeyword = useLocation<string>();
  let query: string = sendKeyword.state;
  const prevSearch = useRef(query);
  useLayoutEffect(() => {
    if (query !== prevSearch.current) {
      prevSearch.current = query;
      searchData.pageNumber = 1;
    }
    (async () => {
      const { movies, pageData } = await SearchResults({
        search: query,
        pageNumber: searchData.pageNumber,
      });
      setSearchData({ ...searchData, movies: movies, pageData: pageData });
    })();
    window.scrollTo(0, 0);
  }, [sendKeyword, searchData.pageNumber]);
  return (
    <>
      <h1>Search Results for "{sendKeyword.state}"</h1>
      <BrowserRouter>
        <Switch>
          <SearchContext.Provider value={{ searchData, setSearchData }}>
            <Route path="/search" component={MovieListing} />
          </SearchContext.Provider>
        </Switch>
      </BrowserRouter>
    </>
  );
}
