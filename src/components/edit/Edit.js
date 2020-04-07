import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { CustomizedButton } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";
import { api, handleError } from "../../helpers/api";

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
    this.props.history.push(`/users/${id}`);
  }

  async editUser() {
    try {
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
      ); // Accesses the "users/{userId}" port in the
      // UserController class in the backend and returns infos of the edited user
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the returned users and update the state.
      this.setState({ user: response.data });

      // This is just some data for you to see what is available.
      console.log("request to:", response.request.responseURL);
      console.log("status code:", response.status);
      console.log("status text:", response.statusText);
      console.log("requested data:", response.data);

      alert("User was successfully modified.");

      this.props.history.push(`../users/${numb}`);
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }

  async componentDidMount() {
    try {
      const pathname = this.props.location.pathname;
      var numb = pathname.match(/\d/g); // needed for isolating the last section of the pathname e.g. /users/1  -->  1
      numb = numb.join("");

      const response = await api.get(`users/${numb}`);

      await new Promise(resolve => setTimeout(resolve, 1));

      this.setState({ user: response.data });

      console.log("request to:", response.request.responseURL);
      console.log("status code:", response.status);
      console.log("status text:", response.statusText);
      console.log("requested data:", response.data);
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
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
                  localStorage.getItem("token") !== this.state.user.token
                }
                color1 ={"palegreen"} color2 = {"limegreen"} width = {"50%"}
                onClick={() => {
                  this.editUser(); // By clicking it the changes are sent to the backend as a PUT request
                }}
              >
                Save
              </CustomizedButton>
            </ButtonContainer>
            <ButtonContainer>
              <CustomizedButton
                  color1 ={"red"} color2 = {"darkred"} width = {"35%"}
                onClick={() => {
                  this.back(this.state.user.id); // By clicking it you get redirected to the previous page
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
