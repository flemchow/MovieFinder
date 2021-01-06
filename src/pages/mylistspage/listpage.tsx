import React from "react";
import { GetStuff } from "../index";
import { MovieCarousel2 } from "../../components";
import { ByGenre } from "../../api";
import { Movie } from "../../models";

async function Wrapper(): Promise<Movie[]> {
  const { movies, pageData } = await ByGenre({ genre: 53, pageNumber: 5 });
  return movies;
}

async function Wrapper2(): Promise<Movie[]> {
  const { movies, pageData } = await ByGenre({ genre: 10749, pageNumber: 5 });
  return movies;
}

export default function ListsPage(): JSX.Element {
  const TopPicks = GetStuff(Wrapper2);
  const movies = GetStuff(Wrapper);

  return (
    <>
      <MovieCarousel2
        carouselTitle={"Your Favorites"}
        slideBy={5}
        movies={TopPicks}
      />
      <MovieCarousel2
        carouselTitle={"Want To Watch"}
        slideBy={5}
        movies={movies}
      />
    </>
  );
}
