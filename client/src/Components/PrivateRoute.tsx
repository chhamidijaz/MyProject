import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  return (
    <Route
      {...rest}
      render={(props) =>
        window.localStorage.token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
