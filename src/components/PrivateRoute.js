import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuth0();

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