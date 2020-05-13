import React from 'react';
import styled from 'styled-components';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, InputField, Label } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';
import ClueEntity from "../../views/ClueEntity";

const ButtonContainer2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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

class EnterGuess extends React.Component {

  constructor() {
    super();
    this.state = {
        gameRound: null,
        guess: null,
        //seconds: 60,
        count: 0
    };
  }
  

  async noGuess() {
      sessionStorage.setItem("isValid", "true");
    const requestBody = JSON.stringify({
      playerId: sessionStorage.PlayerId,
      gameRoundId: this.state.gameRound.gameRoundId,
      guess: "noGuess"
    });
    console.log(requestBody);

    const response =  await api.put('/gameRounds/guesses', requestBody);
    console.log(response.data)

    this.props.history.push(`/games/${this.state.gameRound.gameId}/gamesummary/${this.state.gameRound.gameRoundId}`); 
  }

  async submitGuess(){
      sessionStorage.setItem("isValid", "true");
    const requestBody = JSON.stringify({
      playerId: sessionStorage.PlayerId,
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
      const response = await api.get(`/gameRounds/${sessionStorage.GameRoundId}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

     this.setState({ gameRound: response.data });

      console.log(response.data);     
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  playAudio() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  }

  playAudio2() {
    const audioEl = document.getElementsByClassName("audio-element2")[0]
    audioEl.play()
  }

  updateTimer(){
    if(sessionStorage.getItem("seconds")==1){
      clearInterval(this.timerInterval);
      this.noGuess();
    }
    if(sessionStorage.getItem("seconds")<19){
      this.playAudio2();
      let secondsNow = sessionStorage.getItem("seconds") - 1;
      sessionStorage.setItem("seconds", secondsNow.toString())
    }else{
    this.playAudio();
    let secondsNow = sessionStorage.getItem("seconds") - 1;
    sessionStorage.setItem("seconds", secondsNow.toString())
  }
}


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
        sessionStorage.setItem("isValid", "false");
        const pathName = this.props.location.pathname;
        sessionStorage.setItem("pathName", pathName);

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateGameRound();
        this.interval = setInterval(async() => {
            this.updateGameRound();
        },1000);

       
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
    if(count<1){
      return false;
    }
  }
  return true;
}

clues(){
  var clues =[];
  var duplicates = [];
  var mysteryWord = this.state.gameRound.mysteryWord.toUpperCase();
  this.state.gameRound.submissions.map(sub => {    
    if(mysteryWord == sub.word.toUpperCase()
    || sub.stemmedClue.toUpperCase() == mysteryWord
    || sub.word == "noClue"){
      duplicates.push(sub.word);
    }
    if(sub.word != null){
      if(sub.isDuplicate===true){
       if(!(duplicates.includes(sub.word))){
          duplicates.push(sub.word);
        }
      }
      else{
        if(!(duplicates.includes(sub.word))){
        clues.push(sub.word);
        }
      }
    }
  })
  return clues;
}

  render() {
        {if(this.state.gameRound){
            if(this.allCluesSubmitted()){ //CHECK HERE, IF ALL CLUES HAVE COME IN ALREADY....
              this.startTimer();
              var clues = this.clues();
            return (
                <BaseContainer>
                 <audio className="audio-element">
                <source src="https://actions.google.com/sounds/v1/household/clock_ticking.ogg"></source> 
                </audio>
                <audio className="audio-element2">
                <source src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"></source> 
                </audio>
                  <FormContainer>
                  <Container>
                  <h2>GUESSING PLAYER</h2>
                  <h3>Time Remaining: { sessionStorage.getItem("seconds") }</h3>
                  </Container>
                      <Form>
                      <ClueItems>
                      {clues.map(sub => {    
                                    if(sub != null){
                                        return (
                                            <ClueContainer>
                                                <ClueEntity sub={sub}/>                                                                                         
                                            </ClueContainer>                              
                                        )                                        ;
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
              <h2>PLEASE WAIT A MOMENT...</h2>
              </Container>
                  <Form>
                  <Label>
                     {this.state.gameRound.submissions.map(sub => {    
                        if(sub.word === null){
                          return (
                            <ClueContainer >
                              {sub.playerId} is typing...                                                                                        
                            </ClueContainer>                              
                          );
                      }
                        else{
                          return(
                            <ClueContainer style={{color:"green", fontWeight:"bold"}}>
                              {sub.playerId} has submitted                                                                                    
                            </ClueContainer>    
                          );
                        }
                      })}
                      </Label>
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
                    <Label>Please wait for the other players to give their clues...</Label>
                    </Form>
                  </FormContainer>
            </BaseContainer>
            );}  
        }  
    }
    
}

export default withRouter(EnterGuess);
