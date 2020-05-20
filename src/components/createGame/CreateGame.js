import React from "react";
import {
  BaseContainer,
  FormContainer,
  ButtonContainer,
  Container,
  Form,
  InputField,
  Label,
} from "../../helpers/layout";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import { CustomizedButton } from "../../views/design/Button";
import Switch from "react-switch";

class CreateGame extends React.Component {
  constructor() {
    super();
    this.state = {
      gameName: null,
      hasBot: false,
      adminPlayerId: null,
      alreadyClicked: false,
      isDemoGame: false,
    };
    this.handleChangeBot = this.handleChangeBot.bind(this);
    this.handleChangeDemo = this.handleChangeDemo.bind(this);
  }

  handleChangeBot(hasBot) {
    this.setState({ hasBot });
    console.log(this.state);
  }

  handleChangeDemo(isDemoGame) {
    this.setState({ isDemoGame });
  }

  back() {
    sessionStorage.setItem("isValid", "true");
    this.setState({ alreadyClicked: true });
    this.props.history.push(`/overview`);
  }

  setBot() {
    this.setState({ hasBot: !this.state.hasBot });
  }

  async createNewGame() {
    try {
      sessionStorage.setItem("isValid", "true");
      this.setState({ alreadyClicked: true });
      const requestBody = JSON.stringify({
        gameName: this.state.gameName,
        hasBot: this.state.hasBot,
        isDemoGame: this.state.isDemoGame,
        adminPlayerId: sessionStorage.UserId,
      });

      console.log(requestBody);
      const response = await api.post("/games", requestBody);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // this.setState({ game: response.data });

      alert("Successfully created a new game.");
      console.log(response);

      sessionStorage.setItem("PlayerId", response.data.players[0].playerId);
      sessionStorage.setItem("CurrentGameRound", 1);
      if (this.state.isDemoGame == true) {
        sessionStorage.setItem("TotalGameRounds", 2);
      } else {
        sessionStorage.setItem("TotalGameRounds", 13);
      }

      this.props.history.push(`/lobby/${response.data.gameId}`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
      this.setState({ alreadyClicked: false });
    }
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
    console.log(this.state.hasBot);
    console.log(this.state.gameName);
  }

  componentDidMount() {
    sessionStorage.setItem("isValid", "false");
    const pathName = this.props.location.pathname;
    sessionStorage.setItem("pathName", pathName);
  }

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Container>
            <h2>Create new game </h2>
          </Container>
          <Form>
            <Label>Please enter a game name: </Label>
            <InputField
              placeholder="Enter here..."
              onChange={(e) => {
                this.handleInputChange("gameName", e.target.value);
              }}
            />

            <Label>Do you want to include a bot? </Label>

            <ButtonContainer style={{ marginTop: "0px" }}>
              <label htmlFor="normal-switch">
                <Switch
                  onChange={this.handleChangeBot}
                  checked={this.state.hasBot}
                  id="normal-switch"
                />
              </label>
            </ButtonContainer>

            <Label>Demo game? </Label>

            <ButtonContainer style={{ marginTop: "0px" }}>
              <label htmlFor="normal-switch2">
                <Switch
                  onChange={this.handleChangeDemo}
                  checked={this.state.isDemoGame}
                  id="normal-switch2"
                />
              </label>
            </ButtonContainer>

            <ButtonContainer>
              <CustomizedButton
                disabled={!this.state.gameName || this.state.alreadyClicked}
                width="50%"
                color1={"palegreen"}
                color2={"limegreen"}
                onClick={() => {
                  this.createNewGame();
                }}
              >
                Create game
              </CustomizedButton>
            </ButtonContainer>

            <ButtonContainer>
              <CustomizedButton
                disabled={this.state.alreadyClicked}
                color1={"red"}
                color2={"darkred"}
                width={"50%"}
                onClick={() => {
                  this.back();
                }}
              >
                Back
              </CustomizedButton>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(CreateGame);
