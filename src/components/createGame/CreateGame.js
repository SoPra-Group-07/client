import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button, CustomizedButton } from '../../views/design/Button';
import {Link} from "react-router-dom";
import ToggleSwitch from "../../views/design/ToggleSwitch";
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
class CreateGame extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: password and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
    };
  }

  back() {
    this.props.history.push(`/overview`);
  }

 
  async register() {
    try {
      const requestBody = JSON.stringify({
          username: this.state.username,
          password: this.state.password
    });

    console.log(requestBody)
      await api.post('/users', requestBody);

      alert("Successfully created a new account. Please login.")


      // Registering successfully worked --> navigate to the route '/login' in the GameRouter
      this.props.history.push(`/login`);
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
  }

  componentDidMount() {}




  render() {
    return (
      <BaseContainer>
      
        <FormContainer>
        <Container>
        <h2>Create new game </h2>
      </Container>
            <Form>
            <Label>Please enter a game name: </Label>
            <InputField
              placeholder="Enter here..."
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
          
            <Label>Do you want to include a bot? </Label>
            <ToggleApp></ToggleApp>

            <ButtonContainer>
                <CustomizedButton width="60%" color1={"palegreen"} color2={"limegreen"}onClick={() => {
                        this.createNewGame();
                    }}>
                        Create game
                </CustomizedButton>
            </ButtonContainer>

            <ButtonContainer>
                <CustomizedButton
                    color1={"red"} color2={"darkred"} width = {"50%"}
                        onClick={() => {
                            this.back();
                        }}
                >
                    Back
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
export default withRouter(CreateGame);
