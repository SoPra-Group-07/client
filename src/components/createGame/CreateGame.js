import React from 'react';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, InputField, Label } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';
import Switch from "react-switch";

class CreateGame extends React.Component {

  constructor() {
    super();
    this.state = {
        gameName: null,
        hasBot: false,
        adminPlayerId: null,
        alreadyClicked: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(hasBot) {
    this.setState({ hasBot });
  }
  

  back() {
      this.setState({alreadyClicked: true});
    this.props.history.push(`/overview`);
  }

  setBot() {
    this.setState({hasBot: !this.state.hasBot});
  }
 
  async createNewGame() {
    try {
        this.setState({alreadyClicked: true});
      const requestBody = JSON.stringify({
          gameName: this.state.gameName,
          hasBot: this.state.hasBot,
          adminPlayerId: sessionStorage.UserId
    });

    console.log(requestBody)
      const response = await api.post('/games', requestBody);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

     // this.setState({ game: response.data });

      alert("Successfully created a new game.")
      console.log(response);
      
      sessionStorage.setItem("PlayerId", response.data.players[0].playerId);

      this.props.history.push(`/lobby/${response.data.gameId}`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
    console.log(this.state.hasBot);
    console.log(this.state.gameName);
  }

  componentDidMount() {}

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
              onChange={e => {
                this.handleInputChange('gameName', e.target.value);
              }}
            />
          
            <Label>Do you want to include a bot? </Label>
           
            <ButtonContainer >
            <label htmlFor="normal-switch">
           
           <Switch
          onChange={this.handleChange}
          checked={this.state.hasBot}
          id="normal-switch"
            />
           </label>
            
            </ButtonContainer>

            <ButtonContainer>
                <CustomizedButton 
                disabled={!this.state.gameName || this.state.alreadyClicked}
                width="50%" color1={"palegreen"} color2={"limegreen"} onClick={() => {
                        this.createNewGame();
                    }}>
                        Create game
                </CustomizedButton>
            </ButtonContainer>

            <ButtonContainer>
                <CustomizedButton
                    disabled={this.state.alreadyClicked}
                    color1={"red"} color2={"darkred"} width = {"50%"}
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
