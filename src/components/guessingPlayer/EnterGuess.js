import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';
import ClueEntity from "../../views/ClueEntity";

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
  margin-top:10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0px;
`;

const ButtonContainer2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
  text-transform: uppercase;
`;

const ClueContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ClueItems = styled.li`
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
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
class EnterGuess extends React.Component {
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
        guess: null,
        seconds: 60,
        count: 0
    };
  }
  

  async noGuess() {
    const requestBody = JSON.stringify({
      playerId: localStorage.PlayerId,
      gameRoundId: this.state.gameRound.gameRoundId,
      guess: "noGuess"
    });
    console.log(requestBody);

    const response =  await api.put('/gameRounds/guesses', requestBody);
    console.log(response.data)

    this.props.history.push(`/games/${this.state.gameRound.gameId}/gamesummary/${this.state.gameRound.gameRoundId}`); 
  }

  async submitGuess(){
    const requestBody = JSON.stringify({
      playerId: localStorage.PlayerId,
      gameRoundId: this.state.gameRound.gameRoundId,
      guess: this.state.guess
    });
    console.log(requestBody);

    const response =  await api.put('/gameRounds/guesses', requestBody);

    console.log(response.data);

    this.props.history.push(`/games/${this.state.gameRound.gameId}/gamesummary/${this.state.gameRound.gameRoundId}`); 
  }
 
  async updateGameRound() {
    try {
      const response = await api.get(`/gameRounds/${localStorage.GameRoundId}`);
      
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
      this.noGuess();
    };
    this.setState(({ seconds }) => ({
      seconds: seconds - 1
    }))
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  startTimer(){
    if(this.state.count==0){
      this.timerInterval = setInterval(() => {
          this.updateTimer();
      }, 1000);
      this.state.count=1;
    }
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

componentWillUnmount(){
  clearInterval(this.interval);
  clearInterval(this.timerInterval);
}

allCluesSubmitted(){
  var count=0;
  this.state.gameRound.submissions.map(sub => {                                   
    if(sub.word==null){
      count++;
      }
})
console.log(count);
  if(count<=0){
    return true;
  }
  return false;
}

isAllAlphabet(){
  var currentInput = this.state.guess;
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
            if(this.allCluesSubmitted()){ //CHECK HERE, IF ALL CLUES HAVE COME IN ALREADY....
              this.startTimer();
            return (
                <BaseContainer>
                  <FormContainer>
                  <Container>
                  <h2>Guessing Player</h2>
                  <h1>Time Remaining: { this.state.seconds }</h1>
                  </Container>
                      <Form>
                      <ClueItems>
                      {this.state.gameRound.submissions.map(sub => {
                                    if(sub.word != null){
                                        return (
                                            <ClueContainer>
                                                <ClueEntity sub={sub}/>                                                                                         
                                            </ClueContainer>                              
                                        );
                      }})}
                      </ClueItems>                    
                      <Label>Please enter your guess:</Label>
                        <InputField
                          placeholder="Enter here..."
                          onChange={e => {
                            this.handleInputChange('guess', e.target.value);
                          }}
                        />
                          <ButtonContainer>
                              <CustomizedButton 
                              disabled={this.isAllAlphabet()}
                              width="60%" color1={"palegreen"} color2={"limegreen"} onClick={() => {
                                      this.submitGuess();
                                  }}>
                                      Submit guess
                              </CustomizedButton>
                          </ButtonContainer>
                          <ButtonContainer2>
                              <CustomizedButton 
                              width="60%" color1={"lightskyblue"} color2={"royalblue"} onClick={() => {
                                      this.noGuess();
                                  }}>
                                      No guess
                              </CustomizedButton>
                          </ButtonContainer2>
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
              <h2>Please wait a moment...</h2>
              </Container>
                  <Form>
                  <Label>Please wait for the other players to give their clues...</Label>
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
                <h2>Please wait a moment...</h2>
                </Container>
                    <Form>
                    <Label>Please wait for the other players to give their clues...</Label>
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
export default withRouter(EnterGuess);
