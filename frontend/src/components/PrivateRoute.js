/* 
This will act as a wrapper for components that require authentification  
*/
import React from "react";
import Route, { Redirect } from "react-router-dom";
export const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
