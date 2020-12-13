//created by flemming
/**
 * this file is used to condense all of everything that needs to be exported into a single location.
 * cleans up the import statements in other files
 */

export {
  getNowPlayingMovies as NowPlaying,
  getPopularMovies as PopularMovies,
  getByGenre as ByGenre,
  getSearchResults as SearchResults,
} from "./getMovies";
export { LoginUser, RegistrationUser } from "./loginLogic";
