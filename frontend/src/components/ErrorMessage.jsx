import { ErrorInfo } from "../utils/ErrorInfo";
import { Link } from "react-router-dom";

export const ErrorMessage = ({ error, resetErrorBoundary }) => {
  console.log("errrr",error)
  const { status } = error.response;

  console.log(error);

  const RenderError = ErrorInfo.filter((value) => value.status === status).map(
    (value) => {
      return (
        <div key={value.status}>
          <h1> {value.status}</h1>
          <h2> {value.description}</h2>
          <Link to="/" onClick={resetErrorBoundary}>
            Ok
          </Link>
        </div>
      );
    }
  );

  return RenderError;
};
