// created by flemming
import React, { useContext, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { NavContext } from "../../context";
import { ByGenre } from "../../api";
import { Genres } from "../../models";

/**
 * return box housing all available genres for user selction
 */
export default function GenreNav() {
  let { data, setData } = useContext(NavContext);

  // converts object to array of usable genres
  let arGenres: string[] = [];
  Genres.forEach((element) => {
    arGenres.push(element);
  });

  // updates when ever rerender is initialized, rerender occurs upon new state change.
  // calls fetch to get listing of all movies of the updated genre
  useLayoutEffect(() => {
    Genres.forEach(async (value, key) => {
      if (value === data.genre) {
        const { movies, pageData } = await ByGenre({
          genre: key,
          pageNumber: data.pageNumber,
        });

        setData({ ...data, movies: movies });
      }
    });
    window.scrollTo(0, 0);
  }, [data.genre, data.pageNumber]);

  return (
    <div id="genresDiv">
      {arGenres.map((element, index) => {
        return (
          <p
            className="genreItem"
            key={index}
            onClick={() => {
              setData({
                ...data,
                genre: element,
                pageNumber: 1,
              });
            }}
          >
            <Link to={`/genres/${element}`}>{element}</Link>
          </p>
        );
      })}
    </div>
  );
}
