//created by Flemming
/**
 * this file is used for making fetch calls from the 3rd party api "the movie database"
 */
import { Movie, PageData, Genres } from "../models";
import {
  genreUrl,
  nowPlayingMovies,
  popularMovies,
  posterUrl,
  searchUrl,
} from "./constants";

/**
 * this "interface" is used to define typing for TypeScipt, is a sort of Syntactic Sugar
 */
interface ApiResponseObject {
  title: string;
  release_date: number;
  overview: string;
  poster_path: string;
  genre_ids: number[];
}

interface Data {
  movies: Movie[];
  pageData: PageData;
}
/**
 * generalized function to make fetch call
 *
 * @param query apiUrl as string
 */
async function apiQuery(query: RequestInfo): Promise<Data> {
  let returnArray: Data = {
    movies: [],
    pageData: { page: 0, totalPages: 0 },
  };
  await fetch(query)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let pageData: PageData = {
        page: data.page,
        totalPages: data.total_pages,
      };
      let movieArray: Movie[] = [];
      data.results.map((element: ApiResponseObject) => {
        let genres: string[] = [];
        element.genre_ids.forEach((genre) => {
          genres.push(Genres.get(genre)!);
        });

        let movie: Movie = {
          title: element.title,
          release_date: element.release_date,
          overview: element.overview,
          poster_path: posterUrl + element.poster_path,
          genres: genres,
        };
        movieArray.push(movie);
      });
      returnArray.movies = movieArray;
      returnArray.pageData = pageData;
    });

  return returnArray;
}

/**
 * generic function wrapped and called below for ease of use
 * @param query url string
 */
async function autoQuery(query: RequestInfo): Promise<Movie[]> {
  let movieArray: Movie[] = [];
  await fetch(query)
    .then((res) => {
      // console.log(res);

      return res.json();
    })
    .then((data) => {
      data.results.map((element: ApiResponseObject) => {
        let genres: string[] = [];
        element.genre_ids.forEach((genre) => {
          genres.push(Genres.get(genre)!);
        });

        let movie: Movie = {
          title: element.title,
          release_date: element.release_date,
          overview: element.overview,
          poster_path: posterUrl + element.poster_path,
          genres: genres,
        };
        movieArray.push(movie);
      });
    });

  return movieArray;
}

/**
 * this API call retrieves all teh currently played movies from "tmdb"
 */
export async function getNowPlayingMovies(): Promise<Movie[]> {
  return await autoQuery(nowPlayingMovies);
}

/**
 * returns all the popular movies from "tmdb"
 */
export async function getPopularMovies(): Promise<Movie[]> {
  return await autoQuery(popularMovies);
}

/**
 * "interface" is used for defining typing, is Syntactic Sugar
 */
interface GenreInformation {
  genre: number;
  pageNumber: number;
}

/**
 * constant used for defining initial state
 */
getByGenre.defaultProps = {
  genre: 0,
  pageNumber: 1,
};

/**
 * return an array of movies given the genre id and the page number
 * @param props object, with genre_id and the page_number
 */
export async function getByGenre(props: GenreInformation): Promise<Data> {
  let search =
    props.genre == 0
      ? `${genreUrl}&page=${props.pageNumber}`
      : `${genreUrl}&with_genres=${props.genre}&page=${props.pageNumber}`;
  return await apiQuery(search);
}

/**
 * typing
 */
interface SearchInfo {
  search: string;
  pageNumber: number;
}

/**
 * default params
 */
getSearchResults.defaultProps = {
  search: "",
  pageNumber: 1,
};

/**
 * wrapper function used to get movies by search keyword(s)
 */
export async function getSearchResults(props: SearchInfo): Promise<Data> {
  return await apiQuery(searchUrl + props.search + "&page=" + props.pageNumber);
}
