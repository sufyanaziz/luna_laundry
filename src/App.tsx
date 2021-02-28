import React, { FC, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
// App.css ----
import "./App.css";
// route -----
import routes from "./routes";
import { route_type } from "./utils/types/route-types";
// layout -----
import { AppLayout } from "components/layout";
import { LoadingApp } from "components/global/Loading";

interface Props {}

const App: React.FC<Props> = ({ children }) => {
  // Public Route --------------
  const PublicRoute: FC<route_type> = ({
    component: Component,
    type,
    ...rest
  }) => {
    return <Route {...rest} component={Component} />;
  };
  // TODO Private Route ------------
  // const PrivateRoute: FC<route_type> = ({
  //   component: Component,
  //   type,
  //   ...rest
  // }) => {
  //   return <Route {...rest} component={Component} />;
  // };

  return (
    <AppLayout>
      <Suspense fallback={<LoadingApp />}>
        <Switch>
          {routes.map(route => {
            return (
              <PublicRoute
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
