import { useState, useEffect } from "react";
import { CONSTANTS } from "./constants";
import { LoadingComponent } from "./components/LoadingComponent";
import { ErrorComponent } from "./components/ErrorComponent";
import { CardComponent } from "./components/CardComponent";

export const MoviesSearcher = () => {
  const elements = [];
  const { API_KEY, url_base, url_img } = CONSTANTS;
  const [movieSearch, setMovieSearch] = useState("");
  const [pages, setPages] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (movieSearch === "") return;
    fetchMovies();
  }, [actualPage]);

  const handleChange = (e) => {
    setMovieSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movieSearch.trim().length === 0) {
      setError("Please enter a movie title");
      setPages(0);
      setActualPage(1);
      return;
    }
    setError(null);
    fetchMovies();
  };

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${url_base}?page=${actualPage}&query=${movieSearch}&api_key=${API_KEY}`
      );
      const data = await response.json();
      if (!data.results) return;
      if (data.results.length === 0) {
        setError("No movies found with that title");
        setPages(0);
        setActualPage(1);
      }
      setMovies(data.results);
      if (data.total_results > 20) {
        setPages(data.total_pages);
        setActualPage(data.page);
      } else {
        setPages(0);
        setActualPage(1);
      }
    } catch (error) {
      setError(error.message);
      setMovies(null);
      setPages(0);
      setActualPage(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    setActualPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setActualPage((prevPage) => prevPage - 1);
  };

  const handlePageClick = (pageNum) => {
    setActualPage(pageNum);
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
      {pages > 1 && (
        <>
          <hr />
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${actualPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={handlePrevPage}>
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {Array.from({ length: pages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    index + 1 === actualPage ? "active" : ""
                  }`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageClick(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  actualPage === pages ? "disabled" : ""
                }`}>
                <button className="page-link" onClick={handleNextPage}>
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};
