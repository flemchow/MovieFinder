// created by Flemming
import React, { useEffect, useState } from "react";
import { ShowCasePanel } from "../";
import { Movie } from "../../models";
import "./movieCarousel.css";

/**
 * defining types, syntactic sugar
 */
interface Props {
  carouselTitle: string;
  movies: Movie[];
}

/**
 * defining types, syntactic sugar
 */
interface window {
  start: number;
}

/**
 * defining default values
 */
const flags = {
  start: 0,
};

/**
 * returns react element, a large cyclic movie show
 */
export default function Carousel(props: Props) {
  const [movieWindow, setMovieWindow] = useState<window>(flags);
  const [movies, setMovies] = useState<Movie[]>(props.movies);

  /**
   * used for rerending upon each delta of movies
   */
  useEffect(() => {
    setMovies(props.movies);
  }, [props.movies]);

  /**
   * used for moving forward a singular movie
   */
  function forward() {
    if (movies.length - 1 === movieWindow.start) {
      setMovieWindow({ start: 0 });
    } else {
      setMovieWindow({
        start: movieWindow.start + 1,
      });
    }
  }

  /**
   * movies back a single movie pane
   */
  function back() {
    if (movieWindow.start === 0) {
      setMovieWindow({ start: movies.length - 1 });
    } else {
      setMovieWindow({
        start: movieWindow.start - 1,
      });
    }
  }

  /**
   * actual carousel here
   *
   */
  return (
    <div className="wrapper">
      <h1>{props.carouselTitle}</h1>
      <div className="slider">
        <input className="arrow" type="button" value="<" onClick={back} />
        <div className="window">
          {movies.length > 0 && (
            <ShowCasePanel
              key={movies[movieWindow.start].title}
              movie={movies[movieWindow.start]}
            />
          )}
        </div>
        <input className="arrow" type="button" value=">" onClick={forward} />
      </div>
    </div>
  );
}
