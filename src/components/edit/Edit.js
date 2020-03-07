import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import {Button, ButtonSpecial, EditButton} from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";
import { api, handleError } from '../../helpers/api';


const FormContainer = styled.div`
color: white;
font-size: 25px;
text-align: center;
text-transform: uppercase;
  margin-top: 2em;
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
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(darkgrey, black);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: linear-gradient(dimgray, black);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Edit extends React.Component {

    constructor() {
        super();
        this.state = {
            user: new User(),
            username: null,
            birth: null
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    back() {
        this.props.history.push(`/game/dashboard`);
    }

   /* save(){
        this.editUser();
    }  */                      // <---- unnecessary




    async editUser() {
        try {
            const pathname = this.props.location.pathname;
            var numb = pathname.match(/\d/g);
            numb = numb.join("");

            const requestBody = JSON.stringify({
                id: this.state.user.id,
                username: this.state.username,
                birth: this.state.birth
            });

            const response = await api.put(`users/${this.state.user.id}`, requestBody);

            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ user: response.data });

            // This is just some data for you to see what is available.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            alert("User was successfully modified.")

            this.props.history.push(`../users/${numb}`)

        }  catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }




    async componentDidMount() {
        try{
            const pathname = this.props.location.pathname;
            var numb = pathname.match(/\d/g);                    //needed for isolating the last section of the pathname e.g. /users/1  -->  1
            numb = numb.join("");

            const response = await api.get(`users/${numb}`);

            await new Promise(resolve => setTimeout(resolve, 1000));

            this.setState({ user: response.data });

            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>Edit Information of User
                    <Form>
                        <Label>Username</Label>
                        <InputField
                            placeholder={this.state.username}
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
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
                <EditButton
                        width = "40%"
                        onClick={() => {
                            this.editUser()                // .save() <--- redundant
                        }}
                    >
                        Save
                    </EditButton>
                    </ButtonContainer>
                    <ButtonContainer>
                    <ButtonSpecial /* log in button */
                        width="30%"
                        onClick={() => {
                            this.back()
                        }}
                    >
                        Back
                    </ButtonSpecial>
                   
                </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>


        );
    }
}

 export default withRouter(Edit)