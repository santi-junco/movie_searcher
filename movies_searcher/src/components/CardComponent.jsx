export const CardComponent = ({ movie, url_img }) => {
  const url_base = "https://www.themoviedb.org/movie/";
  return (
    <div key={movie.id} className="movie-card">
      <img src={`${url_img}${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <a
        className="btn btn-outline-info"
        href={`${url_base}${movie.id}${movie.original_title}`}
        target="blank"
        role="button">
        More info
      </a>
    </div>
  );
};
