import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Register from "../../register/Register";
import Profile from "../../profile/Profile";
import Edit from "../../edit/Edit";
import Overview from "../../overview/Overview";
import GameRules from "../../gameRules/GameRules";
import Profiles from "../../profiles/Profiles";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */

//Below you find the Router with the various routs. It allows us to dynamically go from one window to another.

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
              path="/game"
              render={() => (
                <GameGuard>                       {/* When the path is "/game" it first digs in the GameGuard before accessing the GameRouter  */}
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
              path="/users/:id"
              exact
              render={() => (
                <GameGuard>
                  <Profile />
                </GameGuard>
              )}
             />
            <Route
              path="/edit/:id"
              exact
              render={() => (
                <GameGuard>
                  <Edit />
                </GameGuard>
                  )}
              />
              <Route
                  path="/overview"
                  exact
                  render={() => (
                      <GameGuard>
                          <Overview/>
                      </GameGuard>
                  )}
              />

              <Route
                  path="/gamerules"
                  exact
                  render={() => (
                          <GameRules/>
                  )}
              />

              <Route
                  path="/profiles"
                  exact
                  render={() => (
                      <Profiles/>
                  )}
              />

            <Route path="/register" exact render={() => <Register />} />

            <Route path="/" exact render={() => <Redirect to={"/game"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
