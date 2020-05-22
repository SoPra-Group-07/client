import React from 'react';
import styled from 'styled-components';
import  { BaseContainer, FormContainer, ButtonContainer, Form} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import {EditButton, CustomizedButton} from '../../views/design/Button';
import { withRouter } from 'react-router-dom';


const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

class Overview extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }

    setIsValidToTrue(){
        sessionStorage.setItem("isValid", "true");
    }

    goToGameRules() {
        this.setIsValidToTrue();
        this.props.history.push(`/gamerules`);
    }

    goToProfiles() {
        this.setIsValidToTrue();
        this.props.history.push(`/profiles`);
    }

    goToLeaderboard() {
        this.setIsValidToTrue();
        this.props.history.push(`/leaderboard`);
    }

    goToLobby() {
        this.setIsValidToTrue();
        this.props.history.push(`/lobby`);
    }

    goToCreateGame() {
        this.setIsValidToTrue();
        this.props.history.push(`/creategame`);
    }

    async logout() {
        try {
            this.setIsValidToTrue();
            let token1 = sessionStorage.getItem("token");

            const requestBody = JSON.stringify({
                token: token1,
            });

            await api.put('/logout', requestBody);

           // localStorage.removeItem('token');
            sessionStorage.removeItem('UserId');
            sessionStorage.removeItem("token");
            //sessionStorage.clear();

            this.props.history.push('/login');
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        try {
            sessionStorage.setItem("isValid", "false");
            const pathName = this.props.location.pathname;
            sessionStorage.setItem("pathName", pathName);

            const response = await api.get('/users');

            await new Promise(resolve => setTimeout(resolve, 1002));

            this.setState({ users: response.data });

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <div>
                <CustomizedButton width="5%" color1={"sandybrown"} color2={"peru"} height = {"40px"}
                style ={{position:"absolute",marginTop:"-197px",marginLeft:"95%", fontSize:"10px"}}
                                  onClick={() => {
                                      this.goToGameRules();
                                  }}>
                    Game rules
                </CustomizedButton>
                <CustomizedButton width="5%" color1={"sandybrown"} color2={"peru"} height = {"40px"}
                                  style ={{position:"absolute",marginTop:"-197px",marginLeft:"89.98%", fontSize:"10px"}}onClick={() => {
                    this.goToProfiles();
                }}>
                    Profiles
                </CustomizedButton>
                <p style ={{position:"absolute",marginTop:"-150px",marginLeft:"45px", fontSize:"20px"}}>{sessionStorage.getItem("UserName")}</p>
                <img style ={{position:"absolute", width:"30px", height:"auto", marginTop:"-150px",marginLeft:"7px"}}
                src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
                alt="user_avatar"
                />
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
                            width="50%"
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