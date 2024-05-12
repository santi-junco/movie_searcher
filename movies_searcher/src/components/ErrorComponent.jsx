export const ErrorComponent = ({ message }) => {
  return (
    <div
      className="alert alert-danger d-flex justify-content-center align-items-center"
      role="alert">
      <div>{message}</div>
    </div>
  );
};
