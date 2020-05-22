import React from 'react';
import styled from 'styled-components';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Users} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import {CustomizedButton } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import GameLobbyEntity from "../../views/GameLobbyEntity";


const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class GameLobby extends React.Component {
    constructor() {
        super();
        this.state = {
            lobby: null,
            alreadyClicked: false
        };
    }

    async startGame(id) {
        try{
            sessionStorage.setItem("isValid", "true");
            this.setState({alreadyClicked: true});
            const requestBody = JSON.stringify({
                gameId: id
            });

            const response = await api.put(`/games/lobby`, requestBody)
            //console.log(response.data);

            sessionStorage.setItem("GameRoundId",response.data.gameRoundId);
            sessionStorage.setItem("points",0.0);
            sessionStorage.setItem("TotalGameRounds", "X");
            this.props.history.push(`/games/${id}`); 
        }
        catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    async leaveGame(){
        try{
            sessionStorage.setItem("isValid", "true");
            const requestBody = JSON.stringify({
                gameId: this.state.lobby.gameId,
                userId: sessionStorage.UserId
            });
        
            const response = await api.put('/games/out', requestBody);
            //console.log(response.data);

            sessionStorage.removeItem("PlayerId");

            this.props.history.push(`/lobby`); 
        }
        catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
          }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    async updateGameLobby(){
        const pathname = this.props.location.pathname;   
        var temp = pathname.split('/');
        var lastsegment = temp[temp.length-1];

        const response = await api.get(`/games/${lastsegment}/lobby`);
        //console.log(response.data);

        this.setState({ lobby: response.data }); 
        if(this.state.lobby.gameStatus == "RUNNING") {
            sessionStorage.setItem("isValid", "true");
            const response = await api.get(`/games/lobby/${this.state.lobby.gameId}`)
            sessionStorage.setItem("GameRoundId",response.data.gameRoundId);
            sessionStorage.setItem("points",0.0);
            sessionStorage.setItem("TotalGameRounds", "X");
            this.props.history.push(`/games/${this.state.lobby.gameId}`); 
        }         
    }

    async componentDidMount() {
        try {
            sessionStorage.setItem("isValid", "false");
            const pathName = this.props.location.pathname;
            sessionStorage.setItem("pathName", pathName);

            await new Promise(resolve => setTimeout(resolve, 1000));
            this.updateGameLobby();
            this.interval = setInterval(async() => {
                this.updateGameLobby();
            },1000);
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
                        <h3>Waiting for the game to start...</h3>
                        <p>All players of this game:</p>
                        {!this.state.lobby ? (
                            <Spinner />
                        ) : (sessionStorage.getItem("UserId") == this.state.lobby.adminPlayerId?(
                            <div>
                                <Users>
                                    {this.state.lobby.players.map(player => {
                                        let admin = this.state.lobby.adminPlayerId;
                                        return (
                                            <PlayerContainer>
                                                <GameLobbyEntity  player={player} admin = {admin}/>
                                            </PlayerContainer>
                                        );
                                    })}
                                </Users>
                                <ButtonContainer>
                                <CustomizedButton
                                    disabled={(this.state.lobby.numberOfPlayers < 3 || this.state.lobby.numberOfPlayers > 7 || this.state.alreadyClicked)}
                                    color1={"palegreen"} color2={"limegreen"} width = {"60%"}
                                    onClick={() => {
                                        this.startGame(this.state.lobby.gameId);
                                    }}
                                >
                                    Start Game
                                </CustomizedButton>
                                </ButtonContainer>
                               
                            </div>
                            ):(
                                <div>
                                    <Users>
                                        {this.state.lobby.players.map(player => {
                                            let admin = this.state.lobby.adminPlayerId;
                                            return (
                                                <PlayerContainer>
                                                    <GameLobbyEntity  player={player} admin = {admin}/>
                                                </PlayerContainer>
                                            );
                                        })}
                                    </Users>
                                    <ButtonContainer>
                                        <CustomizedButton
                                            color1={"red"} color2={"darkred"} width = {"60%"}
                                            onClick={() => {
                                                this.leaveGame();
                                            }}
                                        >
                                            Leave Game
                                        </CustomizedButton>
                                    </ButtonContainer>
                                </div>
                            )
                        )}
                    </Container>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(GameLobby);