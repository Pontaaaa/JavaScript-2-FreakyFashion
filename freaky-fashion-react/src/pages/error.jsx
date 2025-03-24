const ErrorPage = ({ message = "Ett fel uppstod", error = {} }) => {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>{message}</h1>
        <h2>{error.status || "500"}</h2>
        <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#f8f8f8", padding: "1rem", borderRadius: "5px" }}>
          {error.stack || "Något gick fel, men vi kunde inte visa mer information."}
        </pre>
      </div>
    );
  };
  
  export default ErrorPage;
