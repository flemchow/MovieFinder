import React, { useState } from "react";
import { Movie } from "../../models";
import "./showcasePanel.css";
interface Props {
  movie: Movie;
}

export default function ShowCasePanel(props: Props) {
  const [movie] = useState<Movie>(props.movie);

  return (
    <div className="showcasepanel">
      <img
        className="backgroundImage"
        src={movie.poster_path}
        alt={movie.title}
      ></img>
      <div className="overlay"></div>
      <div className="movieDetails">
        <div className="descriptionStyles">
          <label className="scDescription">Title</label>
          <p className="scDescription">{movie.title}</p>
          <label className="scDescription">Genres</label>
          <p className="scDescription">{movie.genres}</p>
          <label className="scDescription">Release Date</label>
          <p className="scDescription">{movie.release_date}</p>
          <label className="scDescription">Description</label>
          <p className="scDescription">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
