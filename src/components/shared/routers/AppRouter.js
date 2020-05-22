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
import Leaderboard from "../../leaderboard/Leaderboard";
import CreateGame from "../../createGame/CreateGame";
import SubmitNumber from "../../guessingPlayer/SubmitNumber";
import EnterGuess from "../../guessingPlayer/EnterGuess";
import Lobby from "../../lobby/Lobby";
import GameLobby from "../../gameLobby/GameLobby";
import GamePage from "../../gamePage/GamePage";
import SubmitClue from "../../clueingPlayer/SubmitClue";
import GameSummary from "../../gameSummary/GameSummary";
import Statistics from "../../statistics/Statistics";
import NotFound from "../../notFound/NotFound";
import {PageGuard} from "../routeProtectors/PageGuard";
import {RegisterGuard} from "../routeProtectors/RegisterGuard";


class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Switch>
          
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                    <PageGuard>
                  <GameRouter base={"/game"} />
                    </PageGuard>
                </GameGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                    <PageGuard>
                  <Login />
                    </PageGuard>
                </LoginGuard>
              )}
            />
            <Route
              path="/users/:id"
              exact
              render={() => (
                <GameGuard>
                    <PageGuard>
                  <Profile />
                    </PageGuard>
                </GameGuard>
              )}
             />
            <Route
              path="/edit/:id"
              exact
              render={() => (
                <GameGuard>
                    <PageGuard>
                  <Edit />
                    </PageGuard>
                </GameGuard>
                  )}
              />
              <Route
                  path="/overview"
                  exact
                  render={() => (
                      <GameGuard>
                          <PageGuard>
                          <Overview/>
                          </PageGuard>
                      </GameGuard>
                  )}
              />

              <Route
                  path="/gamerules"
                  exact
                  render={() => (
                      <GameGuard>
                      <PageGuard>
                      <GameRules/>
                      </PageGuard>
                      </GameGuard>
                  )}
              />

              <Route
                  path="/profiles"
                  exact
                  render={() => (
                    <GameGuard>
                        <PageGuard>
                      <Profiles/>
                        </PageGuard>
                    </GameGuard> 
                  )}
              />

              <Route
                  path="/leaderboard"
                  exact
                  render={() => (
                    <GameGuard>
                        <PageGuard>
                      <Leaderboard/>
                        </PageGuard>
                    </GameGuard> 
                  )}
              />

              <Route
                  path="/lobby"
                  exact
                  render={() => (
                    <GameGuard>
                        <PageGuard>
                      <Lobby/>
                        </PageGuard>
                    </GameGuard> 
                  )}
              />

              <Route
                  path="/lobby/:id"
                  exact
                  render={() => (
                      <GameGuard>
                          <PageGuard>
                          <GameLobby/>
                          </PageGuard>
                      </GameGuard>
                  )}
              />

              <Route
                  path="/creategame"
                  exact
                  render={() => (
                    <GameGuard>
                        <PageGuard>
                      <CreateGame/>
                        </PageGuard>
                    </GameGuard> 
                  )}
              />

                <Route
                  path="/games/:id/submitnumber/:id"
                  exact
                  render={() => (
                    <GameGuard>
                        <PageGuard>
                      <SubmitNumber/>
                        </PageGuard>
                      </GameGuard>
                     
                  )}
              />

              <Route
                  path="/games/:id/enterguess/:id"
                  exact
                  render={() => (
                    <GameGuard>
                        <PageGuard>
                      <EnterGuess/>
                        </PageGuard>
                    </GameGuard>
                     
                  )}
              />

              <Route
                  path="/games/:id/submitclue/:id"
                  exact
                  render={() => (
                    <GameGuard>
                        <PageGuard>
                      <SubmitClue/>
                        </PageGuard>
                    </GameGuard>
                     
                  )}
              />

              <Route
                  path="/games/:id"
                  exact
                  render={() => (
                    <GameGuard>
                        <PageGuard>
                      <GamePage/>
                        </PageGuard>
                    </GameGuard>
                     
                  )}
              />

              <Route
                  path="/games/:id/gamesummary/:id"
                  exact
                  render={() => (
                    <GameGuard>
                        <PageGuard>
                      <GameSummary/>
                        </PageGuard>
                    </GameGuard>
                     
                  )}
              />

              <Route
                  path="/games/:id/statistics"
                  exact
                  render={() => (
                    <GameGuard>
                        <PageGuard>
                      <Statistics/>
                        </PageGuard>
                    </GameGuard>
                  )}
              />

              <Route
                  path="/404"
                  exact
                  render={() => (
                    <NotFound/>
                  )}
              />

            <Route path="/register" exact render={() => <RegisterGuard> <Register /> </RegisterGuard>} />
            <Route path="/" exact render={() => <Redirect to={"/overview"} />} />
            <Route render={() => <Redirect to={"/404"} />} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;