import React from "react";
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, InputField, Label } from '../../helpers/layout';
import { CustomizedButton } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";
import { api, handleError } from "../../helpers/api";


class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      user: new User(),
      password: null,
      birth: null
    };
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  back(id) {
    sessionStorage.setItem("isValid", "true");
    this.props.history.push(`/users/${id}`);
  }

  async editUser() {
    try {
      sessionStorage.setItem("isValid", "true");
      const pathname = this.props.location.pathname;
      var numb = pathname.match(/\d/g); // needed for isolating the last section of the pathname e.g. /users/1  -->  1
      numb = numb.join("");

      const requestBody = JSON.stringify({
        id: this.state.user.id,
        password: this.state.password,
        birth: this.state.birth
      });

      const response = await api.put(
        `users/${this.state.user.id}`,
        requestBody
      ); 
      await new Promise(resolve => setTimeout(resolve, 1000));

  
      this.setState({ user: response.data });

      alert("User was successfully modified.");

      this.props.history.push(`../users/${numb}`);
    } catch (error) {
      alert(
        `Something went wrong: \n${handleError(error)}`
      );
    }
  }

  async componentDidMount() {
    try {
      sessionStorage.setItem("isValid", "false");
      const pathName = this.props.location.pathname;
      sessionStorage.setItem("pathName", pathName);

      const pathname = this.props.location.pathname;
      var numb = pathname.match(/\d/g); // needed for isolating the last section of the pathname e.g. /users/1  -->  1
      numb = numb.join("");

      const response = await api.get(`users/${numb}`);

      await new Promise(resolve => setTimeout(resolve, 1));

      this.setState({ user: response.data });
      //console.log("requested data:", response.data);
    } catch (error) {
      alert(
        `Something went wrong: \n${handleError(error)}`
      );
    }
  }

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Container>
            <h2>EDIT INFORMATION OF USER</h2>
          </Container>
          <Form>
            <Label>Password</Label>
            <InputField
              placeholder={"New password"}
              onChange={e => {
                this.handleInputChange("password", e.target.value);
              }}
            />
            <Label>Date of Birth</Label>
            <InputField
              type={`date`}
              placeholder={this.state.birth}
              onChange={e => {
                this.handleInputChange("birth", e.target.value);
              }}
            />
            <ButtonContainer>
              <CustomizedButton
                disabled={
                  sessionStorage.getItem("token") !== this.state.user.token
                }
                color1 ={"palegreen"} color2 = {"limegreen"} width = {"50%"}
                onClick={() => {
                  this.editUser(); 
                }}
              >
                Save
              </CustomizedButton>
            </ButtonContainer>
            <ButtonContainer>
              <CustomizedButton
                color1 ={"red"} color2 = {"darkred"} width = {"50%"}
                onClick={() => {
                  this.back(this.state.user.id); 
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

export default withRouter(Edit);