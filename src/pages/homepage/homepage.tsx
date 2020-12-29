import React, { useEffect, useState } from "react";
import { MovieCarousel, MovieCarousel2 } from "../../components";
import { PopularMovies, NowPlaying } from "../../api";

export function useGetStuffFromArray<T>(func: () => Promise<T[]>): T[] {
  const [stuff, setStuff] = useState<T[]>([]);
  useEffect(() => {
    (async () => {
      const movie = await func();
      setStuff(movie);
    })();
  }, []);
  if (stuff.length === 0) {
    return [];
  } else {
    return stuff;
  }
}

export default function HomePage() {
  const popularMovies = useGetStuffFromArray(PopularMovies);
  const nowPlayingMovies = useGetStuffFromArray(NowPlaying);

  return (
    <>
      <MovieCarousel carouselTitle="Popular Movies" movies={popularMovies} />
      <MovieCarousel2
        carouselTitle={"Top Picks"}
        movies={nowPlayingMovies}
        slideBy={5}
      />
    </>
  );
}
