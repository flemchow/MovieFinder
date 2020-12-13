//created by flemming
import React, { useEffect, useState } from "react";
import { MovieCarousel, MovieCarousel2 } from "../../components";
import { PopularMovies, NowPlaying } from "../../api";

/**
 *  generic function used to set state, allows a returned value from something to be workable before promise is returned
 * @param func api call
 */
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

/**
 * exportable component that serves as the base platfrom for rending all homepage correlated components
 */
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
