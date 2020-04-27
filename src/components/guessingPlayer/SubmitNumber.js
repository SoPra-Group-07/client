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
  align-items: center;
  padding-right: 37px;
  border-radius: 0px;
  background: linear-gradient(wheat, sandybrown);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: black;
  }
  height: 55px;
  width: 20%;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 90%;
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
class SubmitNumber extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: password and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
        wordNumber: null,
        gameRoundId: null,
        alreadyClicked: false
    };
  }

  async submitNumber(){
      this.setState({alreadyClicked: true})

    const pathname = this.props.location.pathname;
            
    var temp = pathname.split('/');
    var lastsegment = temp[temp.length-1];
    //console.log(lastsegment);

    const requestBody = JSON.stringify({
      wordNumber: this.state.wordNumber,
      gameRoundId: lastsegment
    });
    console.log(requestBody);

    const response =  await api.put('/gameRounds', requestBody);

    console.log(response.data);

    this.props.history.push(`/games/${response.data.gameId}/enterguess/${response.data.gameRoundId}`);
  }
 
  async updateGameRound() {
    try {
      const response = await api.get(`/gameRounds/${localStorage.GameRoundId}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.setState({ gameRoundId: response.data.gameRoundId });

      console.log(response.data); 
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  async componentDidMount() {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateGameRound();
    } catch (error) {
        alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
}

  render() {
            return (
                <BaseContainer>
                  <FormContainer>
                  <Container>
                  <h2>Guessing Player</h2>
                  </Container>
                      <Form>
                      <Label>Please enter a number between 1 and 5:</Label>
                        <InputField
                          placeholder="#..."
                          onChange={e => {
                            this.handleInputChange('wordNumber', e.target.value);
                          }}
                        />
                          <ButtonContainer>
                              <CustomizedButton
                                  disabled={!(this.state.wordNumber == 1 || this.state.wordNumber == 2 || this.state.wordNumber == 3 ||
                                      this.state.wordNumber == 4 || this.state.wordNumber == 5) || this.state.alreadyClicked}
                              width="60%" color1={"palegreen"} color2={"limegreen"} onClick={() => {
                                      this.submitNumber();
                                  }}>
                                      Submit number
                              </CustomizedButton>
                          </ButtonContainer>
                        </Form>
                    </FormContainer>
                </BaseContainer>
              );
            }    
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(SubmitNumber);
