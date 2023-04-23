import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div>
      <h1>404</h1>

      <h2>Sorry, we could not find this page.</h2>
      <Link to="/">Go back to home page</Link>
    </div>
  );
}
