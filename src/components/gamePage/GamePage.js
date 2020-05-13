import React from 'react';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, Label } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';


class GamePage extends React.Component {

  constructor() {
    super();
    this.state = {
        gameRound: null
    };
  }

  drawCard(){
      console.log("draw");
  }
 
  async updateGameRound() {
    try {
     //localStorage.setItem("GameRoundId",localStorage.GameRoundId++)

      const response = await api.get(`/gameRounds/${sessionStorage.GameRoundId}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

     this.setState({ gameRound: response.data });
      
     if(sessionStorage.PlayerId == this.state.gameRound.guessingPlayerId){
         sessionStorage.setItem("isValid", "true");
         sessionStorage.setItem("seconds", "60");
        this.props.history.push(`/games/${this.state.gameRound.gameId}/submitnumber/${this.state.gameRound.gameRoundId}`); 
     }
     else{
         sessionStorage.setItem("isValid", "true");
         sessionStorage.setItem("seconds", "60");
        this.props.history.push(`/games/${this.state.gameRound.gameId}/submitclue/${this.state.gameRound.gameRoundId}`); 
     }
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }


  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  async componentDidMount() {
    try {
        sessionStorage.setItem("isValid", "false");
        const pathName = this.props.location.pathname;
        sessionStorage.setItem("pathName", pathName);

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateGameRound();
    } catch (error) {
        alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
}

  render() {
        {if(this.state.gameRound){
            if(sessionStorage.PlayerId == this.state.gameRound.guessingPlayerId){
            return (
                <BaseContainer>
                  <FormContainer>
                  <Container>
                  <h2>GUESSING PLAYER</h2>
                  </Container>
                      <Form>
                      <Label>Please enter a number between 1 and 5:</Label>
                          <ButtonContainer>
                              <CustomizedButton 
                              width="60%" color1={"palegreen"} color2={"limegreen"} onClick={() => {
                                      this.drawCard();
                                  }}>
                                      Draw card
                              </CustomizedButton>
                          </ButtonContainer>
                        </Form>
                    </FormContainer>
                </BaseContainer>
              );
            }
        else {
            return(
                <BaseContainer>
                <FormContainer>
                <Container>
                <h2>CLUEING PLAYER</h2>
                </Container>
                    <Form>
                    <Label>Please wait for Guessing Player</Label>
                        
                      </Form>
                  </FormContainer>
              </BaseContainer>
            );
            }
   
        }
        else {
            return(
            <BaseContainer>
                <FormContainer>
                <Container>
                <h2>PLEASE WAIT A MOMENT...</h2>
                </Container>
                    <Form>
                    <Label>Please wait for game to be created...</Label>
                        
                      </Form>
                  </FormContainer>
            </BaseContainer>
            );}  
        }  
    }
    
}

export default withRouter(GamePage);
