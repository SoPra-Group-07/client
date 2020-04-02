import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import {Button, EditButton, CustomizedButton} from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Edit from "../edit/Edit";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

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

class Overview extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }

    showUser(id) {
        this.props.history.push(`/users/${id}`);       //The corresponding user profile is accessed thanks to the id
    }

    async logout() {
        try {
            let token1 = localStorage.getItem("token");       //saving token from local storage in token1 variable
            console.log(token1)                                    //check token in console

            const requestBody = JSON.stringify({
                token: token1,
            });

            const response = await api.put('/logout', requestBody);  //Sends the local token as a PUT request to the backend in order to
            //find the corresponding player in the database and to set his status to OFFLINE and to set the token equal null
            // some data to see what is available
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);


            localStorage.removeItem('token');          //token removed from local storage
            this.props.history.push('/login');
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        try {
            const response = await api.get('/users');
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1002));

            // Get the returned users and update the state.
            this.setState({ users: response.data });

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <BaseContainer>
            <FormContainer>
                <h2 style={{color:"black", textTransform: "uppercase"}}>Overview</h2>
                <Form>
                    <div>
                          <ButtonContainer>
                        <CustomizedButton width="50%" color1={"palegreen"} color2={"limegreen"}>
                            Create new game
                        </CustomizedButton>
                           </ButtonContainer>

                           <ButtonContainer>
                        <CustomizedButton width="50%" color1={"palegreen"} color2={"limegreen"}>
                            Join existing game
                        </CustomizedButton>
                            </ButtonContainer>

                            <ButtonContainer>
                        <CustomizedButton width="50%" color1={"lightskyblue"} color2={"royalblue"}>
                            Leaderboard
                        </CustomizedButton>
                            </ButtonContainer>

                        <LogoutButton>
                        <EditButton
                            width="30%"
                            onClick={() => {
                                this.logout();
                            }}
                        >
                            Logout
                        </EditButton>
                        </LogoutButton>
                    </div>
                </Form>
            </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(Overview);
