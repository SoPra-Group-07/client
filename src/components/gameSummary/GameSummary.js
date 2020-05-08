import React from 'react';
import styled from 'styled-components';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, Label } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';
import { Spinner } from '../../views/design/Spinner';


const LabelTrue = styled.label`
  color: green;
  margin-bottom: 10px;
  text-align: center;
`;

const LabelFalse = styled.label`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;


class GameSummary extends React.Component {

  constructor() {
    super();
    this.state = {
        gameRound: null,
        gameOver: false,
        gameStats: null,
        count:0,
        seconds: 8,
        timercount:0
    };
  }
  

  async startNextRound(){
    try{
        sessionStorage.setItem("isValid", "true");
      const requestBody = JSON.stringify({
        gameId: this.state.gameRound.gameId
      });
      const response = await api.post(`/games/${this.state.gameRound.gameId}/gameRounds`, requestBody);
      
      sessionStorage.setItem("GameRoundId",response.data.gameRoundId);

      this.props.history.push(`/games/${this.state.gameRound.gameId}`); 
    }
      catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
  }

  async updateLocalStorage() {
    if(this.state.gameRound){
      try {
      const response = await api.get(`/games/lobby/${this.state.gameRound.gameId}`);
          if(response.data.gameRoundId != sessionStorage.GameRoundId) {
              sessionStorage.setItem("isValid", "true");
            sessionStorage.setItem("GameRoundId", response.data.gameRoundId);
            this.props.history.push(`/games/${this.state.gameRound.gameId}`); 
          }  
            
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
  }
  }
 
  async updateGameRound() {
    try {
      const response = await api.get(`/gameRounds/${sessionStorage.GameRoundId}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(response.data)

     this.setState({ gameRound: response.data });     
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  async checkIfGameOver(){
    if(this.state.gameRound){
      try {
        const response = await api.get(`/games/${this.state.gameRound.gameId}`);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(response.data)

      this.setState({ gameOver: response.data });   
       
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
  }
  }

  async statistics(){
    if(this.state.count==0){
    try {
      const response = await api.get(`/gameRounds/${sessionStorage.GameRoundId}/gameRoundStatistics`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(response.data)

      this.setState({ gameStats: response.data });  
     
      this.state.gameStats.map(stat => {   
        if(stat.playerId == sessionStorage.PlayerId && (this.state.gameRound.guess.didSubmit==true || this.state.gameRound.guess.word == "noGuess")){
          sessionStorage.setItem("points",stat.points);
          this.state.count++;
        }
      })
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }
  }


  componentWillUnmount(){
    clearInterval(this.interval);
  }

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  async componentDidMount() {
    try {
        sessionStorage.setItem("isValid", "false");
        const pathName = this.props.location.pathname;
        sessionStorage.setItem("pathName", pathName);

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateGameRound();
        
       
        this.interval = setInterval(async() => {
          if(this.state.gameOver==true){
              sessionStorage.setItem("isValid", "true");
            this.props.history.push(`/games/${this.state.gameRound.gameId}/statistics`); 
          }  
          this.checkIfGameOver();
          this.statistics();
          this.updateGameRound();
          this.updateLocalStorage();
        },1000);
    } catch (error) {
        alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
}

updateTimer(){
  if(this.state.seconds==1){
    clearInterval(this.timerInterval);
    this.setState({timercount: 1});
  };
  this.setState(({ seconds }) => ({
    seconds: seconds - 1
  }))
}

startTimer(){
  this.timerInterval = setInterval(() => {
      this.updateTimer();
  }, 1000);
}

  render() {
        {if(this.state.gameRound && this.state.count!=0){
          this.startTimer();
            if(sessionStorage.PlayerId == this.state.gameRound.guessingPlayerId){
              if(this.state.gameRound.guess.correctGuess==true){
                return (
                    <BaseContainer>
                      <FormContainer>
                      <Container>
                      <h2>ROUND SUMMARY</h2>
                      </Container>
                          <Form>
                          <Label>You guessed the word:</Label>
                            <LabelTrue>Correct</LabelTrue>

                            <Label>Points earned:</Label>
                            <Label>{sessionStorage.points}</Label>
                              <ButtonContainer>
                                  <CustomizedButton 
                                  disabled={(this.state.timercount==0)}
                                  width="60%" color1={"palegreen"} color2={"limegreen"} onClick={() => {
                                          this.startNextRound();
                                      }}>
                                          Next round
                                  </CustomizedButton>
                              </ButtonContainer>
                            </Form>
                        </FormContainer>
                    </BaseContainer>
                  );
              }
              else{
                return (
                  <BaseContainer>
                    <FormContainer>
                    <Container>
                    <h2>ROUND SUMMARY</h2>
                    </Container>
                        <Form>
                        <Label>You guessed the word:</Label>
                          <LabelFalse>Wrong</LabelFalse>

                          <Label>Points earned:</Label>
                          <Label>{sessionStorage.points}</Label>
                            <ButtonContainer>
                                <CustomizedButton 
                                 disabled={(this.state.timercount==0)}
                                width="60%" color1={"palegreen"} color2={"limegreen"} onClick={() => {
                                        this.startNextRound();
                                    }}>
                                        Next round
                                </CustomizedButton>
                            </ButtonContainer>
                          </Form>
                      </FormContainer>
                  </BaseContainer>
                );
              }
            }
        else {
          if(this.state.gameRound.guess.word!=null){
            if(this.state.gameRound.guess.correctGuess==true){
            return(
                <BaseContainer>
                  <FormContainer>
                  <Container>
                  <h2>ROUND SUMMARY</h2>
                  </Container>
                      <Form>
                      <Label>The guessing player guessed the word:</Label>
                        <LabelTrue>Correct</LabelTrue>

                        <Label>Points earned:</Label>
                        <Label>{sessionStorage.points}</Label>
                         
                        <Label>Waiting for guessing player to start new round...</Label>
                        </Form>
                    </FormContainer>
                </BaseContainer>
            );
            }
            else{
              return(
                <BaseContainer>
                  <FormContainer>
                  <Container>
                  <h2>ROUND SUMMARY</h2>
                  </Container>
                      <Form>
                      <Label>The guessing player guessed the word:</Label>
                        <LabelFalse>Wrong</LabelFalse>

                        <Label>Points earned:</Label>
                        <Label>{sessionStorage.points}</Label>
                         
                        <Label>Waiting for guessing player to start new round...</Label>
                        </Form>
                    </FormContainer>
                </BaseContainer>
            );
            }
          }
          else{
            return(
              <BaseContainer>
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
        else {
            return(
            <BaseContainer>
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
            );}  
        }  
    }
    
}


export default withRouter(GameSummary);
