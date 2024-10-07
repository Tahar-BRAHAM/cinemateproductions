import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, authToken, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authToken ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default ProtectedRoute;
