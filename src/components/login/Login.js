import React from 'react';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, InputField, Label } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter} from 'react-router-dom';
import {CustomizedButton} from '../../views/design/Button';
import {Link} from "react-router-dom";


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      pwvisible: false
    };
    this.passwordVisibility = this.passwordVisibility.bind(this);
  }

  async login() {
    try {
      sessionStorage.setItem("isValid", "true");
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });

      const response =  await api.put('/login', requestBody);

      const user = new User(response.data);         

      //localStorage.setItem("token", user.token);
      sessionStorage.setItem("UserId", user.id);
      sessionStorage.setItem("UserName", user.username);
      sessionStorage.setItem("token", user.token);  

      this.props.history.push(`/overview`);
    } catch (error) {
      alert(`Something went wrong: \n${handleError(error)}`);
    }  
  }
  
  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  passwordVisibility(){
    this.setState({ pwvisible: !this.state.pwvisible });
  }

  componentDidMount() {
    sessionStorage.setItem("isValid", "false");
    const pathName = this.props.location.pathname;
    sessionStorage.setItem("pathName", pathName);
  }

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Container>
            <h2>Login  </h2>
          </Container>
          <Form>
            <Label>Please enter username: </Label>
            <InputField
              placeholder="Enter here..."
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
            <Label>Please enter password: </Label>
            <InputField
              type={this.state.pwvisible ? "text" : "password"}
              placeholder="Enter here..."
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />
             <button className="visible" onClick={this.passwordVisibility}></button>
            <ButtonContainer>
              <CustomizedButton
                disabled={!this.state.username || !this.state.password}
                color1={"mediumslateblue"} color2={"darkslateblue"}
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </CustomizedButton>
            </ButtonContainer>

            <Link to="/register" style={{ textDecoration: 'none' }}>
            <ButtonContainer>
              <CustomizedButton color1={"lightsteelblue"} color2={"royalblue"} onClick={() => {sessionStorage.setItem("isValid", "true")}}>

                Click here to sign up!
              </CustomizedButton>
            </ButtonContainer>
            </Link>

          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(Login);