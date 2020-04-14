import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';
import ToggleApp from "../../views/design/ToggleApp";

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
class DrawCard extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: password and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
        gameName: null,
        hasBot: false,
        adminPlayerId: null
    };
  }
  

  back() {
    
  }

  drawCard(){
      console.log("draw");
  }
 
  async updateGameRound() {
    try {
      const requestBody = JSON.stringify({
          gameName: this.state.gameName,
          hasBot: this.state.hasBot,
          adminPlayerId: localStorage.UserId
    });

      const response = await api.get('/gameRounds/1');
      
      await new Promise(resolve => setTimeout(resolve, 1000));

     // this.setState({ game: response.data });

      console.log(response);     
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
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
    console.log(this.state.hasBot);
    console.log(this.state.gameName);
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

  render() {
    return (
      <BaseContainer>
        <FormContainer>
        <Container>
        <h2>Guessing Player</h2>
        </Container>
            <Form>
            <Label>Please draw a card:</Label>
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

}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(DrawCard);
