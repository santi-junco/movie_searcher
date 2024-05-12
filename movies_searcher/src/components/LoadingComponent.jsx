export const LoadingComponent = () => {
  return (
    <div className="container text-center">
      <div className="d-flex justify-content-center align-items-center">
        <strong role="status">Loading...</strong>
        <div className="spinner-border m-5" aria-hidden="true"></div>
      </div>
    </div>
  );
};
