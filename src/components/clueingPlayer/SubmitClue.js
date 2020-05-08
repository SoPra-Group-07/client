import React from 'react';
import styled from 'styled-components';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, InputField, Label } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';


const Label2 = styled.label`
  color: blue;
  margin-bottom: 10px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

class SubmitClue extends React.Component {

  constructor() {
    super();
    this.state = {
        gameRound: null,
        clue: null,
        seconds: 60,
        count: 0
    };
  }


  async submitClue(){
      console.log("clue");
      const requestBody = JSON.stringify({
        playerId: sessionStorage.PlayerId,
        gameRoundId: this.state.gameRound.gameRoundId,
        clue: this.state.clue
      });
      console.log(requestBody);
  
      const response =  await api.put('/gameRounds/clues', requestBody);
  
      console.log(response.data);

      this.props.history.push(`/games/${this.state.gameRound.gameId}/gamesummary/${this.state.gameRound.gameRoundId}`); 
  }

  async submitNoClue(){
    const requestBody = JSON.stringify({
      playerId: sessionStorage.PlayerId,
      gameRoundId: this.state.gameRound.gameRoundId,
      clue: "noClue"
    });
    console.log(requestBody);

    const response =  await api.put('/gameRounds/clues', requestBody);

    console.log(response.data);
    this.props.history.push(`/games/${this.state.gameRound.gameId}/gamesummary/${this.state.gameRound.gameRoundId}`); 
}


 
  async updateGameRound() {
    try {
      const response = await api.get(`/gameRounds/${sessionStorage.GameRoundId}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

     this.setState({ gameRound: response.data });

      console.log(response.data);     
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  
  updateTimer(){
    if(this.state.seconds==1){
      clearInterval(this.timerInterval);
      this.submitNoClue();
    };
    this.setState(({ seconds }) => ({
      seconds: seconds - 1
    }))
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  async componentDidMount() {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateGameRound();
        this.interval = setInterval(async() => {
            this.updateGameRound();
        },5000);
    } catch (error) {
        alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
}


startTimer(){
      if(this.state.count==0){
      this.timerInterval = setInterval(() => {
          this.updateTimer();
      }, 1000);
      this.state.count=1;
    }
}

componentWillUnmount(){
  clearInterval(this.interval);
  clearInterval(this.timerInterval);
}

isAllAlphabet(){
  var currentInput = this.state.clue;
  var count=0;
  if(currentInput!=null && currentInput!=""){
    for (var i = 0; i < currentInput.length; i++) {
      if((currentInput.charCodeAt(i) >= 65 && currentInput.charCodeAt(i) <= 90) || (currentInput.charCodeAt(i) >= 97 && currentInput.charCodeAt(i) <= 122)){
        console.log(count);
      }else{
        count++;
      }
    }
    if(count>=1){
      return true;
    }else{
      return false;
    }
  }
  return true;
}

  render() {
        {if(this.state.gameRound){
            if(this.state.gameRound.mysteryWord != null){
              this.startTimer();
            return (
                <BaseContainer>
                  <FormContainer>
                  <Container>
                  <h2>ClUEING PLAYER</h2>
                  <h3>Time Remaining: { this.state.seconds }</h3>
                  </Container>
                      <Form>
                      <Label>Current word:</Label>
                      <Label2>{this.state.gameRound.mysteryWord}</Label2>
                      <Label>Please enter your clue:</Label>
                        <InputField
                          placeholder="Enter here..."
                          onChange={e => {
                            this.handleInputChange('clue', e.target.value);
                          }}
                        />
                          <ButtonContainer>
                              <CustomizedButton 
                              disabled={ this.isAllAlphabet()}
                              width="60%" color1={"palegreen"} color2={"limegreen"} onClick={() => {
                                      this.submitClue();
                                  }}>
                                      Submit clue
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
                  <h2>PLEASE WAIT A MOMENT...</h2>
                  </Container>
                      <Form>
                      <Label>Please wait for the the guessing Player to choose the word...</Label>
                      </Form>
                    </FormContainer>
              </BaseContainer>
              );}     
        }
        else {
            return(
            <BaseContainer>
                <FormContainer>
                <Container>
                <h2>PLEASE WAIT A MOMENT...</h2>
                </Container>
                    <Form>
                    <Label>Please wait for the the guessing Player to choose the word...</Label>
                    </Form>
                  </FormContainer>
            </BaseContainer>
            );}  
        }  
    }
    
}

export default withRouter(SubmitClue);
