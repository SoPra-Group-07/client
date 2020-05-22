import React from "react";
import styled from "styled-components";
import {
  BaseContainer,
  SummaryForm,
  FormContainer,
  ButtonContainer,
  Container,
  Label,
  PlayerContainer,
  Users,
} from "../../helpers/layout";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import { CustomizedButton } from "../../views/design/Button";
import { Spinner } from "../../views/design/Spinner";
import LeaderboardEntity from "../../views/design/Board";

const LabelTrue = styled.label`
  color: green;
  margin-bottom: 10px;
  text-align: center;
`;
const ButtonContainer2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

const LabelFalse = styled.label`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 0px;
  background: linear-gradient(wheat, sandybrown);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

class GameSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      gameRound: null,
      gameOver: false,
      gameStats: null,
      count: 0,
      seconds: 8,
      timercount: 0,
      digit: 0,
    };
  }

  updateGameRoundInfo() {
    sessionStorage.setItem(
      "CurrentGameRound",
      parseInt(sessionStorage.getItem("CurrentGameRound")) + 1
    );
    if (
      this.state.gameRound.guess.correctGuess == false &&
      this.state.gameRound.guess.didSubmit
    ) {
      sessionStorage.setItem(
        "TotalGameRounds",
        parseInt(sessionStorage.getItem("TotalGameRounds")) - 1
      );
    }
  }

  async startNextRound() {
    try {
      sessionStorage.setItem("isValid", "true");
      const requestBody = JSON.stringify({
        gameId: this.state.gameRound.gameId,
      });
      const response = await api.post(
        `/games/${this.state.gameRound.gameId}/gameRounds`,
        requestBody
      );

      sessionStorage.setItem("GameRoundId", response.data.gameRoundId);
      this.updateGameRoundInfo();

      this.props.history.push(`/games/${this.state.gameRound.gameId}`);
    } catch (error) {
      alert(`Something went wrong: \n${handleError(error)}`);
    }
  }

  async updateLocalStorage() {
    if (this.state.gameRound) {
      try {
        const response = await api.get(
          `/games/lobby/${this.state.gameRound.gameId}`
        );
        if (response.data.gameRoundId != sessionStorage.GameRoundId) {
          this.updateGameRoundInfo();
          sessionStorage.setItem("isValid", "true");
          sessionStorage.setItem("GameRoundId", response.data.gameRoundId);
          this.props.history.push(`/games/${this.state.gameRound.gameId}`);
        }
      } catch (error) {
        alert(`Something went wrong: \n${handleError(error)}`);
      }
    }
  }

  async updateGameRound() {
    try {
      const response = await api.get(
        `/gameRounds/${sessionStorage.GameRoundId}`
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));
      //console.log(response.data);

      this.setState({ gameRound: response.data });
    } catch (error) {
      alert(`Something went wrong: \n${handleError(error)}`);
    }
  }

  async checkIfGameOver() {
    if (this.state.gameRound) {
      try {
        const response = await api.get(`/games/${this.state.gameRound.gameId}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        //console.log(response.data);

        this.setState({ gameOver: response.data });
      } catch (error) {
        alert(`Something went wrong: \n${handleError(error)}`);
      }
    }
  }

  async statistics() {
    if (this.state.count == 0) {
      try {
        const response = await api.get(
          `/gameRounds/${sessionStorage.GameRoundId}/gameRoundStatistics`
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));
        //console.log(response.data);

        this.setState({ gameStats: response.data });
        this.getSubNum2();

        this.state.gameStats.map((stat) => {
          if (
            stat.playerId == sessionStorage.PlayerId &&
            (this.state.gameRound.guess.didSubmit == true ||
              this.state.gameRound.guess.word == "noGuess")
          ) {
            sessionStorage.setItem("points", stat.totalPoints);
            this.state.count++;
          }
        });
      } catch (error) {
        alert(`Something went wrong: \n${handleError(error)}`);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  async componentDidMount() {
    try {
      sessionStorage.setItem("isValid", "false");
      sessionStorage.setItem("subNum2", 0);
      const pathName = this.props.location.pathname;
      sessionStorage.setItem("pathName", pathName);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.updateGameRound();

      this.interval = setInterval(async () => {
        if (this.state.gameOver == true) {
          sessionStorage.setItem("isValid", "true");
          this.props.history.push(
            `/games/${this.state.gameRound.gameId}/statistics`
          );
        }
        this.checkIfGameOver();
        this.statistics();
        this.updateGameRound();
        this.updateLocalStorage();
      }, 1000);
    } catch (error) {
      alert(
        `Something went wrong: \n${handleError(error)}`
      );
    }
  }

  updateTimer() {
    if (this.state.seconds == 1) {
      clearInterval(this.timerInterval);
      this.setState({ timercount: 1 });
    }
    this.setState(({ seconds }) => ({
      seconds: seconds - 1,
    }));
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  getSubNum() {
    if (this.state.gameRound) {
      let num = 0;
      this.state.gameRound.submissions.map((sub) => {
        if (sub.playerId == sessionStorage.getItem("PlayerId")) {
          sessionStorage.setItem("subNum", num);
        }
        num++;
      });
    }
  }

  getSubNum2() {
    if (this.state.gameStats) {
      let num2 = 0;
      this.state.gameStats.map((sub) => {
        if (sub.playerId == sessionStorage.getItem("PlayerId")) {
          sessionStorage.setItem("subNum2", num2);
        }
        num2++;
      });
    }
  }

  pointsOn() {
    document.getElementById("overlay").style.display = "block";
  }

  pointsOff() {
    document.getElementById("overlay").style.display = "none";
  }

  render() {
    {
      if (this.state.gameRound && this.state.count != 0) {
        this.startTimer();
        if (sessionStorage.PlayerId == this.state.gameRound.guessingPlayerId) {
          if (this.state.gameRound.guess.correctGuess == true) {
            return (
              <BaseContainer>
                <div
                  id="overlay"
                  onClick={() => {
                    this.pointsOff();
                  }}
                >
                  <div id="text">
                    Guess was: <LabelTrue>Correct</LabelTrue> <br></br>
                    Guess Points:{" "}
                    <Label style={{ color: "skyblue" }}>
                      {
                        this.state.gameStats[sessionStorage.getItem("subNum2")]
                          .rightGuessPoints
                      }{" "}
                    </Label>
                    <br></br>
                    Submission Time:{" "}
                    {
                      this.state.gameStats[sessionStorage.getItem("subNum2")]
                        .duration
                    }{" "}
                    sec<br></br>
                    Submission Points:{" "}
                    <Label style={{ color: "skyblue" }}>
                      {
                        this.state.gameStats[sessionStorage.getItem("subNum2")]
                          .durationPoints
                      }
                    </Label>
                    <br></br>
                    Total points:{" "}
                    <Label style={{ color: "blue" }}>
                      {
                        this.state.gameStats[sessionStorage.getItem("subNum2")]
                          .totalPoints
                      }
                    </Label>
                  </div>
                </div>
                <p
                  style={{
                    position: "absolute",
                    marginTop: "-150px",
                    marginLeft: "5px",
                    fontSize: "20px",
                  }}
                >
                  {sessionStorage.getItem("CurrentGameRound")}/
                  {sessionStorage.getItem("TotalGameRounds")}
                </p>
                <FormContainer>
                  <Container>
                    <h2>ROUND SUMMARY</h2>
                  </Container>
                  <SummaryForm>
                    <Label>You guessed the word:</Label>
                    <LabelTrue style={{ fontWeight: "bold", fontSize: "20px" }}>
                      Correct
                    </LabelTrue>

                    <Label>Points earned:</Label>
                    <Label style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {sessionStorage.points}
                    </Label>
                    <Label>Clueing words given: </Label>
                    <Users>
                      {" "}
                      {this.state.gameRound.submissions.map((user) => {
                        this.state.digit++;
                        return (
                          <PlayerContainer>
                            <LeaderboardEntity
                              count={this.state.digit}
                              user={user}
                            />
                          </PlayerContainer>
                        );
                      })}{" "}
                    </Users>
                    <ButtonContainer>
                      <CustomizedButton
                        disabled={this.state.timercount == 0}
                        width="60%"
                        color1={"palegreen"}
                        color2={"limegreen"}
                        onClick={() => {
                          this.startNextRound();
                        }}
                      >
                        Next round
                      </CustomizedButton>
                    </ButtonContainer>
                    <ButtonContainer2>
                      <CustomizedButton
                        disabled={this.state.timercount == 0}
                        width="60%"
                        color1={"lightskyblue"}
                        color2={"royalblue"}
                        onClick={() => {
                          this.pointsOn();
                        }}
                      >
                        How points get calculated
                      </CustomizedButton>
                    </ButtonContainer2>
                  </SummaryForm>
                </FormContainer>
              </BaseContainer>
            );
          } else {
            return (
              <BaseContainer>
                <div
                  id="overlay"
                  onClick={() => {
                    this.pointsOff();
                  }}
                >
                  <div id="text">
                    Guess was: <LabelFalse>Wrong</LabelFalse> <br></br>
                    Guess Points:{" "}
                    <Label style={{ color: "skyblue" }}>
                      {
                        this.state.gameStats[sessionStorage.getItem("subNum2")]
                          .rightGuessPoints
                      }{" "}
                    </Label>
                    <br></br>
                    Submission Time:{" "}
                    {
                      this.state.gameStats[sessionStorage.getItem("subNum2")]
                        .duration
                    }{" "}
                    sec<br></br>
                    Submission Points:{" "}
                    <Label style={{ color: "skyblue" }}>
                      {
                        this.state.gameStats[sessionStorage.getItem("subNum2")]
                          .durationPoints
                      }
                    </Label>
                    <br></br>
                    Total points:{" "}
                    <Label style={{ color: "blue" }}>
                      {
                        this.state.gameStats[sessionStorage.getItem("subNum2")]
                          .totalPoints
                      }
                    </Label>
                  </div>
                </div>
                <p
                  style={{
                    position: "absolute",
                    marginTop: "-150px",
                    marginLeft: "5px",
                    fontSize: "20px",
                  }}
                >
                  {sessionStorage.getItem("CurrentGameRound")}/
                  {sessionStorage.getItem("TotalGameRounds")}
                </p>
                <FormContainer>
                  <Container>
                    <h2>ROUND SUMMARY</h2>
                  </Container>
                  <SummaryForm>
                    <Label>You guessed the word:</Label>
                    <LabelFalse>Wrong</LabelFalse>
                    <Label>
                      The word to be guessed would have been:{" "}
                      <Label style={{ color: "blue" }}>
                        {this.state.gameRound.mysteryWord}
                      </Label>
                    </Label>
                    <Label>Points earned:</Label>
                    <Label style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {sessionStorage.points}
                    </Label>
                    <Label>Clueing words given: </Label>
                    <Users>
                      {" "}
                      {this.state.gameRound.submissions.map((user) => {
                        this.state.digit++;
                        return (
                          <PlayerContainer>
                            <LeaderboardEntity
                              count={this.state.digit}
                              user={user}
                            />
                          </PlayerContainer>
                        );
                      })}{" "}
                    </Users>
                    <ButtonContainer>
                      <CustomizedButton
                        disabled={this.state.timercount == 0}
                        width="60%"
                        color1={"palegreen"}
                        color2={"limegreen"}
                        onClick={() => {
                          this.startNextRound();
                        }}
                      >
                        Next round
                      </CustomizedButton>
                    </ButtonContainer>
                    <ButtonContainer2>
                      <CustomizedButton
                        disabled={this.state.timercount == 0}
                        width="60%"
                        color1={"lightskyblue"}
                        color2={"royalblue"}
                        onClick={() => {
                          this.pointsOn();
                        }}
                      >
                        How points get calculated
                      </CustomizedButton>
                    </ButtonContainer2>
                  </SummaryForm>
                </FormContainer>
              </BaseContainer>
            );
          }
        } else {
          if (this.state.gameRound.guess.word != null) {
            if (this.state.gameRound.guess.correctGuess == true) {
              return (
                <BaseContainer>
                  <div
                    id="overlay"
                    onClick={() => {
                      this.pointsOff();
                    }}
                  >
                    <div id="text">
                      No-Clue points:{" "}
                      <Label style={{ color: "red" }}>
                        {
                          this.state.gameStats[
                            sessionStorage.getItem("subNum2")
                          ].notCluePoints
                        }{" "}
                      </Label>
                      <br></br>
                      Duplicate Clue Points:{" "}
                      <Label style={{ color: "red" }}>
                        {
                          this.state.gameStats[
                            sessionStorage.getItem("subNum2")
                          ].duplicateCluePoints
                        }
                      </Label>
                      <br></br>
                      Submission Time:{" "}
                      {
                        this.state.gameStats[sessionStorage.getItem("subNum2")]
                          .duration
                      }{" "}
                      sec<br></br>
                      Submission Points:{" "}
                      <Label style={{ color: "skyblue" }}>
                        {
                          this.state.gameStats[
                            sessionStorage.getItem("subNum2")
                          ].durationPoints
                        }
                      </Label>
                      <br></br>
                      Correct Guess Bonus Points:{" "}
                      <Label style={{ color: "green" }}>
                        {
                          this.state.gameStats[
                            sessionStorage.getItem("subNum2")
                          ].rightGuessPoints
                        }
                      </Label>
                      <br></br>
                      Total points:{" "}
                      <Label style={{ color: "blue" }}>
                        {
                          this.state.gameStats[
                            sessionStorage.getItem("subNum2")
                          ].totalPoints
                        }
                      </Label>
                    </div>
                  </div>
                  <p
                    style={{
                      position: "absolute",
                      marginTop: "-150px",
                      marginLeft: "5px",
                      fontSize: "20px",
                    }}
                  >
                    {sessionStorage.getItem("CurrentGameRound")}/
                    {sessionStorage.getItem("TotalGameRounds")}
                  </p>
                  <FormContainer>
                    <Container>
                      <h2>ROUND SUMMARY</h2>
                    </Container>
                    <Form>
                      <Label>The guessing player guessed the word:</Label>
                      <LabelTrue>Correct</LabelTrue>

                      <Label>Points earned:</Label>
                      <Label style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {sessionStorage.points}
                      </Label>
                      <ButtonContainer2>
                        <CustomizedButton
                          width="60%"
                          color1={"lightskyblue"}
                          color2={"royalblue"}
                          onClick={() => {
                            this.pointsOn();
                          }}
                        >
                          How points get calculated
                        </CustomizedButton>
                      </ButtonContainer2>
                      <Label style={{ marginTop: "20%" }}>
                        Waiting for guessing player to start new round...
                      </Label>
                    </Form>
                  </FormContainer>
                </BaseContainer>
              );
            } else {
              return (
                <BaseContainer>
                  <div
                    id="overlay"
                    onClick={() => {
                      this.pointsOff();
                    }}
                  >
                    <div id="text">
                      No-Clue points:{" "}
                      <Label style={{ color: "red" }}>
                        {
                          this.state.gameStats[
                            sessionStorage.getItem("subNum2")
                          ].notCluePoints
                        }{" "}
                      </Label>
                      <br></br>
                      Duplicate Clue Points:{" "}
                      <Label style={{ color: "red" }}>
                        {
                          this.state.gameStats[
                            sessionStorage.getItem("subNum2")
                          ].duplicateCluePoints
                        }
                      </Label>
                      <br></br>
                      Submission Time:{" "}
                      {
                        this.state.gameStats[sessionStorage.getItem("subNum2")]
                          .duration
                      }{" "}
                      sec<br></br>
                      Submission Points:{" "}
                      <Label style={{ color: "skyblue" }}>
                        {
                          this.state.gameStats[
                            sessionStorage.getItem("subNum2")
                          ].durationPoints
                        }
                      </Label>
                      <br></br>
                      Correct Guess Bonus Points:{" "}
                      <Label style={{ color: "green" }}>
                        {
                          this.state.gameStats[
                            sessionStorage.getItem("subNum2")
                          ].rightGuessPoints
                        }
                      </Label>
                      <br></br>
                      Total points:{" "}
                      <Label style={{ color: "blue" }}>
                        {
                          this.state.gameStats[
                            sessionStorage.getItem("subNum2")
                          ].totalPoints
                        }
                      </Label>
                    </div>
                  </div>
                  <p
                    style={{
                      position: "absolute",
                      marginTop: "-150px",
                      marginLeft: "5px",
                      fontSize: "20px",
                    }}
                  >
                    {sessionStorage.getItem("CurrentGameRound")}/
                    {sessionStorage.getItem("TotalGameRounds")}
                  </p>
                  <FormContainer>
                    <Container>
                      <h2>ROUND SUMMARY</h2>
                    </Container>
                    <Form>
                      <Label>The guessing player guessed the word:</Label>
                      <LabelFalse>Wrong</LabelFalse>

                      <Label>Points earned:</Label>
                      <Label style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {sessionStorage.points}
                      </Label>
                      <ButtonContainer2>
                        <CustomizedButton
                          width="60%"
                          color1={"lightskyblue"}
                          color2={"royalblue"}
                          onClick={() => {
                            this.pointsOn();
                          }}
                        >
                          How points get calculated
                        </CustomizedButton>
                      </ButtonContainer2>
                      <Label style={{ marginTop: "20%" }}>
                        Waiting for guessing player to start new round...
                      </Label>
                    </Form>
                  </FormContainer>
                </BaseContainer>
              );
            }
          } else {
            return (
              <BaseContainer>
                <p
                  style={{
                    position: "absolute",
                    marginTop: "-150px",
                    marginLeft: "5px",
                    fontSize: "20px",
                  }}
                >
                  {sessionStorage.getItem("CurrentGameRound")}/
                  {sessionStorage.getItem("TotalGameRounds")}
                </p>
                <FormContainer>
                  <Container>
                    <h2>PLEASE WAIT A MOMENT...</h2>
                  </Container>
                  <Form>
                    <Label>
                      Please wait for the game round to be completed...
                    </Label>
                    <Spinner />
                  </Form>
                </FormContainer>
              </BaseContainer>
            );
          }
        }
      } else {
        return (
          <BaseContainer>
            <p
              style={{
                position: "absolute",
                marginTop: "-150px",
                marginLeft: "5px",
                fontSize: "20px",
              }}
            >
              {sessionStorage.getItem("CurrentGameRound")}/
              {sessionStorage.getItem("TotalGameRounds")}
            </p>
            <FormContainer>
              <Container>
                <h2>PLEASE WAIT A MOMENT...</h2>
              </Container>
              <Form>
                <Label>Please wait for the game round to be completed...</Label>
                <Spinner />
              </Form>
            </FormContainer>
          </BaseContainer>
        );
      }
    }
  }
}

export default withRouter(GameSummary);