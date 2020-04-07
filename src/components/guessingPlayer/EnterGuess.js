import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { Spinner } from '../../views/design/Spinner';
import {CustomizedButton } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import WordsEntity from "../../views/WordsEntity";

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
`;
//unordered list
const Users = styled.ul`                     
  list-style: none;
  padding-left: 0;
  overflow: auto;
  max-height: 330px;
`;
//list item
const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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


class EnterGuess extends React.Component {
    constructor() {
        super();
        this.state = {
            words: ["Wheel", "Window", "Roads"],  //Backend
            count: 0,
            guessedWord:null
        };
    }

    noGuess() {         //TODO: backend
        
    }

    enterGuess() {
        
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
        
      }

    /*async componentDidMount() {
        try {

            const response = await api.get('/leaderboard');  //TODO: auf backend warten

            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1002));

            // Get the returned users and update the state.
            this.setState({ users: response.data });

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    } */

    render() {
        return (

            <BaseContainer>
                <FormContainer>
                    <Container>
                        <h2>Guessing player</h2>
                        <p>Given words:</p>
                        {!this.state.words ? (
                            <Spinner />
                        ) : (
                            <div>
                                <Users>
                                    {this.state.words.map(words => {
                                        this.state.count ++;
                                        return (
                                            <PlayerContainer>
                                                <WordsEntity count={this.state.count} words={words}/>
                                            </PlayerContainer>
                                        );
                                    })}
                                </Users>
                                <p>Your guess:</p>
                                <InputField
                             placeholder="Enter your guess"
                            onChange={e => {
                                this.handleInputChange('guessedWord', e.target.value);
                                         }}
                                     />
                                <ButtonContainer>
                                <CustomizedButton width="60%" color1={"palegreen"} color2={"limegreen"} onClick={() => {
                                     this.enterGuess();
                                              }}>
                                     Enter guess
                                  </CustomizedButton>
                              </ButtonContainer>
                                <CustomizedButton
                                    color1={"red"} color2={"darkred"} width = {"60%"}
                                    onClick={() => {
                                        this.noGuess();
                                    }}
                                >
                                    No guess
                                </CustomizedButton>
                            </div>
                        )}
                    </Container>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(EnterGuess);
