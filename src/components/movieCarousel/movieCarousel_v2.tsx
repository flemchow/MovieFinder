import React, { useEffect, useState } from "react";
import { Movie } from "../../models";
import { MoviePanel } from "../";
import "./movieCarousel_v2.css";

interface SliderProps {
  carouselTitle: string;
  movies: Movie[];
  slideBy: number;
}

interface Slider {
  start: number;
  end: number;
}

const sliderObjLiteral = {
  start: 0,
  end: 0,
};

export default function Carousel2(props: SliderProps) {
  sliderObjLiteral.end = props.slideBy;
  const { slideBy } = props;
  const [movies, setMovies] = useState<Movie[]>(props.movies);
  const [slider, setSlider] = useState<Slider>(sliderObjLiteral);
  useEffect(() => {
    setMovies(props.movies);
  }, [props.movies]);

  function back() {
    if (slider.start - slideBy > -1) {
      setSlider({ start: slider.start - slideBy, end: slider.end - slideBy });
    } else {
      setSlider({ start: 0, end: slideBy });
    }
  }

  function forward() {
    if (slider.end + slideBy >= movies.length) {
      setSlider({ start: movies.length - slideBy, end: movies.length });
    } else {
      setSlider({ start: slider.start + slideBy, end: slider.end + slideBy });
    }
  }

  return props.movies && props.movies.length === 0 ? (
    <div>No Movies To Show</div>
  ) : (
    <div className="wrap">
      <h1 id="carouselTitle">{props.carouselTitle}</h1>
      <div id="carouselContainer">
        <div id="wrapper">
          <input
            id="leftArrow"
            className="arrow"
            type="button"
            value="<"
            onClick={back}
          />
          <div id="innerWrapper">
            <div id="carousel">
              {movies
                .slice(slider.start, slider.end)
                .map((movie: Movie, index: number) => {
                  const {
                    title,
                    release_date,
                    overview,
                    poster_path,
                    genres,
                  } = movie;

                  return (
                    <MoviePanel
                      className="moviePanel"
                      key={index}
                      title={title}
                      releaseYear={release_date}
                      description={overview}
                      imgUrl={poster_path}
                      genres={genres}
                    />
                  );
                })}
            </div>
          </div>
          <input
            id="rightArrow"
            className="arrow"
            type="button"
            value=">"
            onClick={forward}
          />
        </div>
      </div>
    </div>
  );
}
