import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../../context/auth/Context";
console.log("hello");
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuth } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        isAuth === null || !isAuth ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
