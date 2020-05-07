import React from 'react';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, InputField, Label } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton} from '../../views/design/Button';
import {Link} from "react-router-dom";


/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Register extends React.Component {
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

  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
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

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}




  render() {
    return (
      <BaseContainer>
      
        <FormContainer>
        <Container>
        <h2>Register </h2>
      </Container>
            <Form>
            <Label>Please enter new username: </Label>
            <InputField
              placeholder="Enter here..."
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
            <Label>Please enter new password: </Label>
            <InputField
              placeholder="Enter here..."
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />

            <ButtonContainer>
              <CustomizedButton disabled={!this.state.username || !this.state.password}
                                color1={"mediumslateblue"} color2={"darkslateblue"}
                                onClick={() => {
                                    this.register();
                                }}>
                  Register
              </CustomizedButton>
                </ButtonContainer>

                <Link to = "/login" style={{ textDecoration: 'none' }}>
                <ButtonContainer>
              <CustomizedButton color1={"lightsteelblue"} color2={"royalblue"}>
                Click here to sign in!
              </CustomizedButton>
            </ButtonContainer>
            </Link>

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
export default withRouter(Register);
