// created by Flemming
import React from "react";
import "./moviePanel.css";

/**
 * used for typing, syntatic sugar.
 * enhances code readability
 */
interface PanelProps {
  className: string;
  title: string;
  releaseYear: number;
  description: string;
  imgUrl: string;
  genres: string[];
}

/**
 *
 * @param props is an object containing title, releaseyear, description, poster url, genres of the given movie
 */
export default function MoviePanel(props: PanelProps) {
  const { title, releaseYear, description, imgUrl, genres } = props;

  return (
    <div className="moviePanel">
      <img className="img" src={imgUrl} alt={title} />
      <div className="details">
        <div id="descStyle">
          <div className="cover">
            <label>Title:</label>
            <p>{title}</p>
            <label>Genres:</label>
            <p>{genres}</p>
            <label>Release Date:</label>
            <p>{releaseYear}</p>
            <label>Movie Description:</label>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
