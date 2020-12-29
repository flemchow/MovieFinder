import { Movie, PageData, Genres } from "../models";
import {
  genreUrl,
  nowPlayingMovies,
  popularMovies,
  posterUrl,
  searchUrl,
} from "./constants";

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

export async function getNowPlayingMovies(): Promise<Movie[]> {
  return await autoQuery(nowPlayingMovies);
}

export async function getPopularMovies(): Promise<Movie[]> {
  return await autoQuery(popularMovies);
}

interface GenreInformation {
  genre: number;
  pageNumber: number;
}

getByGenre.defaultProps = {
  genre: 0,
  pageNumber: 1,
};

export async function getByGenre(props: GenreInformation): Promise<Data> {
  let search =
    props.genre == 0
      ? `${genreUrl}&page=${props.pageNumber}`
      : `${genreUrl}&with_genres=${props.genre}&page=${props.pageNumber}`;
  return await apiQuery(search);
}

interface SearchInfo {
  search: string;
  pageNumber: number;
}

getSearchResults.defaultProps = {
  search: "",
  pageNumber: 1,
};

export async function getSearchResults(props: SearchInfo): Promise<Data> {
  return await apiQuery(searchUrl + props.search + "&page=" + props.pageNumber);
}
