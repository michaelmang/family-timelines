import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ children, isAuthenticated, ...rest }) {
  if (!isAuthenticated) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <Route {...rest}>
      {children}
    </Route>
  );
}