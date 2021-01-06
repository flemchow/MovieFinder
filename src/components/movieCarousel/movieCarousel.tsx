import React, { useEffect, useState } from "react";
import { ShowCasePanel } from "../";
import { Movie } from "../../models";
import "./movieCarousel.css";

interface Props {
  carouselTitle: string;
  movies: Movie[];
}

interface window {
  start: number;
}

const flags = {
  start: 0,
};

export default function Carousel(props: Props) {
  const [movieWindow, setMovieWindow] = useState<window>(flags);
  const [movies, setMovies] = useState<Movie[]>(props.movies);

  useEffect(() => {
    setMovies(props.movies);
  }, [props.movies]);

  function forward() {
    if (movies.length - 1 === movieWindow.start) {
      setMovieWindow({ start: 0 });
    } else {
      setMovieWindow({
        start: movieWindow.start + 1,
      });
    }
  }

  function back() {
    if (movieWindow.start === 0) {
      setMovieWindow({ start: movies.length - 1 });
    } else {
      setMovieWindow({
        start: movieWindow.start - 1,
      });
    }
  }

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
