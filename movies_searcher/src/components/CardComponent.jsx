export const CardComponent = ({ movie, url_img }) => {
  return (
    <div key={movie.id} className="movie-card">
      <img src={`${url_img}${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
    </div>
  );
};
