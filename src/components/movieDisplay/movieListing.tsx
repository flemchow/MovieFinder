import React, { useContext } from "react";
import { SearchContext, NavContext } from "../../context";
import { MoviePanel } from "../";
import "./movieListing.css";

export default function MovieListing(): JSX.Element {
  const { data, setData } = useContext(NavContext);
  const { searchData, setSearchData } = useContext(SearchContext);
  let load;

  if (!data) {
    load = searchData;
  } else {
    load = data;
  }

  return (
    <>
      <div id="movieListingContainer">
        <div id="movieListing">
          {/* {data.movies.map((element, index) => { */}
          {load.movies.map((element, index) => {
            const {
              title,
              release_date,
              overview,
              poster_path,
              genres,
            } = element;
            return (
              <div className="panelFrame" key={index}>
                <MoviePanel
                  key={index}
                  className="moviePanel"
                  title={title}
                  releaseYear={release_date}
                  description={overview}
                  imgUrl={poster_path}
                  genres={genres}
                />
              </div>
            );
          })}
        </div>
        <div id="pageNavContainer">
          <input
            type="button"
            className="pageNav"
            id="prevPage"
            onClick={() => {
              if (data) {
                setData({
                  ...data,
                  pageNumber: data.pageNumber - 1,
                });
              } else {
                setSearchData({
                  ...searchData,
                  pageNumber: searchData.pageNumber - 1,
                });
              }
            }}
            value="<"
          />
          <input
            type="button"
            className="pageNav"
            id="nextPage"
            onClick={() => {
              if (data) {
                setData({
                  ...data,
                  pageNumber: data.pageNumber + 1,
                });
              } else {
                setSearchData({
                  ...searchData,
                  pageNumber: searchData.pageNumber + 1,
                });
              }
            }}
            value=">"
          />
        </div>
      </div>
    </>
  );
}
