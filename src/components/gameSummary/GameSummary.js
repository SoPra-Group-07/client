import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';
import { Spinner } from '../../views/design/Spinner';

const FormContainer = styled.div`
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const InputField = styled.input`
  &::placeholder {
    color: black;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: 35px;
  margin-right: 35px;
  border: none;
  border-radius: 0px;
  margin-bottom: 20px;
  background: linear-gradient(white, antiquewhite);
  color: black;
`;

const Label = styled.label`
  color: black;
  margin-bottom: 10px;
  text-align: center;
`;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
  text-transform: uppercase;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class GameSummary extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: password and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
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
      const requestBody = JSON.stringify({
        gameId: this.state.gameRound.gameId
      });
      const response = await api.post(`/games/${this.state.gameRound.gameId}/gameRounds`, requestBody);
      
      localStorage.setItem("GameRoundId",response.data.gameRoundId);

      this.props.history.push(`/games/${this.state.gameRound.gameId}`); 
    }
      catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
  }

  async updateLocalStorage() {
    try {
     const response = await api.get(`/games/lobby/${this.state.gameRound.gameId}`);
        if(response.data.gameRoundId != localStorage.GameRoundId) {
          localStorage.setItem("GameRoundId", response.data.gameRoundId);
          this.props.history.push(`/games/${this.state.gameRound.gameId}`); 
        }  
          
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }
 
  async updateGameRound() {
    try {
      const response = await api.get(`/gameRounds/${localStorage.GameRoundId}`);
      
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
      const response = await api.get(`/gameRounds/${localStorage.GameRoundId}/gameRoundStatistics`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(response.data)

      this.setState({ gameStats: response.data });  
     
      this.state.gameStats.map(stat => {   
        if(stat.playerId == localStorage.PlayerId && (this.state.gameRound.guess.didSubmit==true || this.state.gameRound.guess.word == "noGuess")){
          localStorage.setItem("points",stat.points);
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

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  async componentDidMount() {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateGameRound();
        
       
        this.interval = setInterval(async() => {
          if(this.state.gameOver==true){
            this.props.history.push(`/games/${this.state.gameRound.gameId}/statistics`); 
          }  
          this.checkIfGameOver();
          this.statistics();
          this.updateGameRound();
          this.updateLocalStorage();
        },5000);
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
            if(localStorage.PlayerId == this.state.gameRound.guessingPlayerId){
              if(this.state.gameRound.guess.correctGuess==true){
                return (
                    <BaseContainer>
                      <FormContainer>
                      <Container>
                      <h2>Round summary</h2>
                      </Container>
                          <Form>
                          <Label>You guessed the word:</Label>
                            <LabelTrue>Correct</LabelTrue>

                            <Label>Points earned:</Label>
                            <Label>{localStorage.points}</Label>
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
                    <h2>Round summary</h2>
                    </Container>
                        <Form>
                        <Label>You guessed the word:</Label>
                          <LabelFalse>Wrong</LabelFalse>

                          <Label>Points earned:</Label>
                          <Label>{localStorage.points}</Label>
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
                  <h2>Round summary</h2>
                  </Container>
                      <Form>
                      <Label>The guessing player guessed the word:</Label>
                        <LabelTrue>Correct</LabelTrue>

                        <Label>Points earned:</Label>
                        <Label>{localStorage.points}</Label>
                         
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
                  <h2>Round summary</h2>
                  </Container>
                      <Form>
                      <Label>The guessing player guessed the word:</Label>
                        <LabelFalse>Wrong</LabelFalse>

                        <Label>Points earned:</Label>
                        <Label>{localStorage.points}</Label>
                         
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
                  <h2>Please wait a moment...</h2>
                 
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
                <h2>Please wait a moment...</h2>
               
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

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameSummary);
