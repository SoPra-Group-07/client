import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import {CustomizedButton } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import LeaderboardEntity from "../../views/LeaderboardEntity";
import GameLobbyEntity from "../../views/GameLobbyEntity";

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
`;
//unordered list
const Users = styled.ul`                     
  list-style: none;
  padding-left: 0;
  overflow: auto;
  max-height: 330px;
`;
//list item
const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;



class GameLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            lobby: null,
        };
    }

    back() {
        this.props.history.push(`/lobby`);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    async updateGameLobby(){
            const pathname = this.props.location.pathname;
            var numb = pathname.match(/\d/g); // e.g. /users/1  -->  1
           // numb = numb;
            console.log(numb);

            const response = await api.get(`/games/${numb}/lobby`);

            this.setState({ lobby: response.data });

            console.log(response);
    }

    async componentDidMount() {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.updateGameLobby();
            this.interval = setInterval(async() => {
                this.updateGameLobby();
            },5000);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (

            <BaseContainer>
                <FormContainer>
                    <Container>
                        <h2>GAME LOBBY</h2>
                        <p>All players of this game:</p>
                        {!this.state.lobby ? (
                            <Spinner />
                        ) : (
                            <div>
                                <Users>
                                    {this.state.lobby.players.map(player => {
                                        let admin = this.state.lobby.adminplayer;
                                        return (
                                            <PlayerContainer>
                                                <GameLobbyEntity  player={player} admin = {admin}/>
                                            </PlayerContainer>
                                        );
                                    })}
                                </Users>
                                <CustomizedButton
                                    disabled={(localStorage.getItem("token") !== this.state.lobby.adminplayer.user.token)
                                    || (this.state.lobby.players.length < 3 || this.state.lobby.players.length > 7)}
                                    color1={"palegreen"} color2={"limegreen"} width = {"60%"}
                                    onClick={() => {
                                        this.back();
                                    }}
                                >
                                    Start Game
                                </CustomizedButton>
                            </div>
                        )}
                    </Container>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(GameLobby);
