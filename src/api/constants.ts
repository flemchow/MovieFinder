export const apiKey: string = process.env.API_KEY!;
export const movieUrl: string = "https://api.themoviedb.org/3/movie/";
export const posterUrl: string = "https://image.tmdb.org/t/p/original/";
export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
export const genreUrl: string = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;
export const searchUrl: string = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&include_adult=false&query=`;
export const accountServerURL: string = process.env.SERVER_URL!;
