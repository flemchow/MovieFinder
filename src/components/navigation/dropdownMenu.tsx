// created by flemming
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./dropdownMenu.css";
/**
 * this is for static typing, syntactic sugar, allows developers to know what types are assigned without having to parse too much code
 */
interface Props {
  title: string;
  genres: Map<number, string>;
}

/**
 * returns an interactable dropdown menu
 */
export default function DropDown(props: Props): JSX.Element {
  let arGenres: string[] = [];
  props.genres.forEach((element) => {
    arGenres.push(element);
  });
  return (
    <>
      <Link id="title" to="/genres">
        {props.title}
      </Link>
      <div id="items">
        {arGenres.map((element, index) => {
          return (
            <p className="dropdownItem" key={index}>
              <Link to={`/genres/${element}`}>{element}</Link>
            </p>
          );
        })}
      </div>
    </>
  );
}
