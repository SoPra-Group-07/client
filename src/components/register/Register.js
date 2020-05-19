import React from 'react';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, InputField, Label } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton} from '../../views/design/Button';
import {Link} from "react-router-dom";


class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      pwvisible: false
    };
    this.passwordVisibility = this.passwordVisibility.bind(this);
  }

  async register() {
    try {
        sessionStorage.setItem("isValid", "true");
      const requestBody = JSON.stringify({
          username: this.state.username,
          password: this.state.password
    });

      console.log(requestBody)
      await api.post('/users', requestBody);

      alert("Successfully created a new account. Please login.")
     
      this.props.history.push(`/login`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  componentDidMount() {
      sessionStorage.setItem("isValid", "false");
      const pathName = this.props.location.pathname;
      sessionStorage.setItem("pathName", pathName);
  }

  passwordVisibility(){
    this.setState({ pwvisible: !this.state.pwvisible });
  }



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
              type={this.state.pwvisible ? "text" : "password"}
              placeholder="Enter here..."
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />
            <button className="visible" onClick={this.passwordVisibility}></button>

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
              <CustomizedButton color1={"lightsteelblue"} color2={"royalblue"} onClick={() => {sessionStorage.setItem("isValid", "true")}}>
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

export default withRouter(Register);
