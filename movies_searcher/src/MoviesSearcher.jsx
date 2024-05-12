import { useState } from "react";
import { CONSTANTS } from "./constants";
import { LoadingComponent } from "./components/LoadingComponent";
import { ErrorComponent } from "./components/ErrorComponent";
import { CardComponent } from "./components/CardComponent";

export const MoviesSearcher = () => {
  const { API_KEY, url_base, url_img } = CONSTANTS;
  const [movieSearch, setMovieSearch] = useState("");
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setMovieSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movieSearch.trim().length === 0) {
      setError("Please enter a movie title");
      return;
    }
    setError(null);
    fetchMovies();
  };

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${url_base}?query=${movieSearch}&api_key=${API_KEY}`
      );
      const data = await response.json();
      if (!data.results) return;
      if (data.results.length === 0)
        setError("No movies found with that title");
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
      setMovies(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Movies searcher</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search Movie"
          value={movieSearch}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {isLoading && <LoadingComponent />}
      {error && <ErrorComponent message={error} />}
      {movies && (
        <div className="movie-list">
          {movies.map((movie) => (
            <CardComponent movie={movie} url_img={url_img} />
          ))}
        </div>
      )}
    </div>
  );
};
