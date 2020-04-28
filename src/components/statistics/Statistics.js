import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';

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
class Statistics extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: password and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
        gameStatistics: null
    };
  }
  

  async startNewGame(){
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


  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  async componentDidMount() {
    try {
        const response = await api.get(`/gameRounds/${localStorage.GameRoundId}/gameRoundStatistics`);
      
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(response.data)

        this.setState({ gameStatistics: response.data });
       
    } catch (error) {
        alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
}

  render() {
        {if(this.state.gameStatistics){
                return (
                    <BaseContainer>
                      <FormContainer>
                      <Container>
                      <h2>Game statistics</h2>
                      </Container>
                          <Form>
                            <Label>You achieved a total of</Label>
                            <LabelTrue>{localStorage.totalPoints}</LabelTrue>
                            <Label>points</Label>

                            <Label>Other players:</Label>
                            <Label>100</Label>
                              <ButtonContainer>
                                  <CustomizedButton 
                                  width="60%" color1={"palegreen"} color2={"limegreen"} onClick={() => {
                                          this.startNewGame();
                                      }}>
                                          New game
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
                <h2>Please wait a moment...</h2>
                </Container>
                    <Form>
                    <Label>Please wait for statistics...</Label>
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
export default withRouter(Statistics);
