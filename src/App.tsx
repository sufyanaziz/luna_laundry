import React, { FC, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
// App.css ----
import "./App.css";
// route -----
import routes from "routes/routes";
import { route_type } from "routes/route-types";
// layout -----
import { AppLayout } from "components/layout";
import { LoadingApp } from "components/global/Loading";
import { DecodeToken } from "app-types";
import axios from "connection/axios";

import { useUser } from "context";

interface Props {}

const App: React.FC<Props> = () => {
  const LocalStorageToken = localStorage.getItem("luna_laundry");

  const { event } = useUser();

  const decodingToken = () => {
    if (LocalStorageToken !== null) {
      const token: DecodeToken = jwtDecode(LocalStorageToken);
      event.getDataUserFromToken({
        customerId: token.customerId,
        username: token.username,
        email: token.email,
      });
    }
  };

  useEffect(decodingToken, [LocalStorageToken]); // eslint-disable-line react-hooks/exhaustive-deps

  // Public Route --------------
  const PublicRoute: FC<route_type> = ({
    component: Component,
    type,
    ...rest
  }) => {
    if (LocalStorageToken === null) {
      return <Route {...rest} component={Component} />;
    } else {
      const token: DecodeToken = jwtDecode(LocalStorageToken);
      // Check token expired ----
      if (token.exp <= new Date().getTime() / 1000) {
        localStorage.removeItem("luna_laundry");
        delete axios.defaults.headers.common["Authorization"];
        return <Redirect to="/" />;
      } else {
        //  Token is not expired ----
        const authToken = `Bearer ${LocalStorageToken}`;
        axios.defaults.headers.common["Authorization"] = authToken;
        // Check role after decode token ----
        if (token.roles === "ROLE_USER") {
          // Check type route for ROLE_USER
          return <Redirect from="/" to="/home" />;
        } else {
          // Check type route for ROLE_ADMIN?
          return <Redirect from="/" to="/employee-orders" />;
        }
      }
    }
  };
  // Private Route ------------
  const PrivateRoute: FC<route_type> = ({
    component: Component,
    type,
    ...rest
  }) => {
    if (LocalStorageToken === null) {
      return <Redirect to="/" />;
    } else {
      const token: DecodeToken = jwtDecode(LocalStorageToken);
      // Check token expired ----
      if (token.exp <= new Date().getTime() / 1000) {
        localStorage.removeItem("luna_laundry");
        delete axios.defaults.headers.common["Authorization"];
        return <Redirect to="/" />;
      } else {
        //  Token is not expired ----
        const authToken = `Bearer ${LocalStorageToken}`;
        axios.defaults.headers.common["Authorization"] = authToken;
        // Check role after decode token ----
        if (token.roles === "ROLE_USER") {
          // Check type route for ROLE_USER
          if (type === "private-user")
            return <Route {...rest} component={Component} />;
          // if route is not for user, then redirect to /home
          else return <Redirect to="/home" />;
        } else {
          // Check type route for ROLE_ADMIN?
          if (type === "private-admin")
            return <Route {...rest} component={Component} />;
          // if route is not for admin, then redirect to /employee-orders
          else return <Redirect to="/employee-orders" />;
        }
      }
    }
  };
  // Error Route --------------------
  const ErrorRoute: FC<route_type> = ({
    component: Component,
    type,
    ...rest
  }) => {
    return <Route {...rest} component={Component} />;
  };

  return (
    <AppLayout>
      <Suspense fallback={<LoadingApp />}>
        <Switch>
          {routes.map(route => {
            return route.type === "public" ? (
              <PublicRoute
                key={route.name}
                component={route.component}
                exact={route.exact}
                name={route.name}
                path={route.path}
                type={route.type}
              />
            ) : route.type === "error" ? (
              <ErrorRoute
                key={route.name}
                component={route.component}
                exact={route.exact}
                name={route.name}
                path={route.path}
                type={route.type}
              />
            ) : (
              <PrivateRoute
                key={route.name}
                component={route.component}
                exact={route.exact}
                name={route.name}
                path={route.path}
                type={route.type}
              />
            );
          })}
        </Switch>
      </Suspense>
    </AppLayout>
  );
};

export default App;
