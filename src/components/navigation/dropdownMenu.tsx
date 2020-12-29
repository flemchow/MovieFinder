import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./dropdownMenu.css";

interface Props {
  title: string;
  genres: Map<number, string>;
}
export default function DropDown(props: Props): JSX.Element {
  let arGenres: string[] = [];
  props.genres.forEach((element) => {
    arGenres.push(element);
  });
  return (
    <>
      <Link id="title" to="/account">
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
