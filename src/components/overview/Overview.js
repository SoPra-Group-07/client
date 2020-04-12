import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import {EditButton, CustomizedButton} from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

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

    goToGameRules() {
        this.props.history.push(`/gamerules`);
    }

    goToProfiles() {
        this.props.history.push(`/profiles`);
    }

    goToLeaderboard() {
        this.props.history.push(`/leaderboard`);
    }

    goToLobby() {
        this.props.history.push(`/lobby`);
    }

    goToCreateGame() {
        this.props.history.push(`/creategame`);
    }

    async logout() {
        try {
            let token1 = localStorage.getItem("token");
            console.log(token1)

            const requestBody = JSON.stringify({
                token: token1,
            });

            await api.put('/logout', requestBody);

            localStorage.removeItem('token');
            localStorage.removeItem('UserId');
            localStorage.removeItem('adminId');

            sessionStorage.removeItem("token");

            this.props.history.push('/login');
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        try {
            const response = await api.get('/users');

            await new Promise(resolve => setTimeout(resolve, 1002));

            this.setState({ users: response.data });

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <div>
                <CustomizedButton width="5%" color1={"sandybrown"} color2={"peru"} height = {"20px"}
                style ={{position:"absolute",marginTop:"-197px",marginLeft:"95%", fontSize:"8px"}}
                                  onClick={() => {
                                      this.goToGameRules();
                                  }}>
                    Game rules
                </CustomizedButton>
                <CustomizedButton width="5%" color1={"sandybrown"} color2={"peru"} height = {"20px"}
                                  style ={{position:"absolute",marginTop:"-197px",marginLeft:"89.98%", fontSize:"8px"}}onClick={() => {
                    this.goToProfiles();
                }}>
                    Profiles
                </CustomizedButton>
            <BaseContainer>
            <FormContainer>
                <h2 style={{color:"black", textTransform: "uppercase"}}>Overview</h2>
                <Form>
                    <div>
                          <ButtonContainer>
                        <CustomizedButton width="50%" color1={"palegreen"} color2={"limegreen"}onClick={() => {
                            this.goToCreateGame();
                        }}>
                            Create new game
                        </CustomizedButton>
                           </ButtonContainer>

                           <ButtonContainer>
                        <CustomizedButton width="50%" color1={"palegreen"} color2={"limegreen"}onClick={() => {
                            this.goToLobby();
                        }}>
                            Join existing game
                        </CustomizedButton>
                            </ButtonContainer>

                            <ButtonContainer>
                        <CustomizedButton width="50%" color1={"lightskyblue"} color2={"royalblue"} onClick={() => {
                            this.goToLeaderboard();
                        }}>
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
            </div>
        );
    }
}

export default withRouter(Overview);
