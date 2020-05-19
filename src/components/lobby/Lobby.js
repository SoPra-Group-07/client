import React from 'react';
import styled from 'styled-components';
import  { BaseContainer, FormContainer, Container} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import {CustomizedButton } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import LobbyEntity from '../../views/LobbyEntity';

const Games = styled.ul`                     
  list-style: none;
  padding-left: 0;
  overflow: auto;
  max-height: 330px;
`;

const GameContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


class Lobby extends React.Component {
    constructor() {
        super();
        this.state = {
            games: null
        };
    }


    back() {
        sessionStorage.setItem("isValid", "true");
        this.props.history.push(`/overview`);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    async joinGame(id){
        try{
            sessionStorage.setItem("isValid", "true");
            const requestBody = JSON.stringify({
                gameId: id,
                userId: sessionStorage.UserId
            });

            //console.log(requestBody);
        
            const response = await api.put('/games', requestBody);
            
            //console.log(response);

            sessionStorage.setItem("PlayerId", response.data.players[response.data.players.length - 1].playerId);
            sessionStorage.setItem("CurrentGameRound", 1);
            sessionStorage.setItem("TotalGameRounds", 13);

        


            this.props.history.push(`/lobby/${id}`); 
        }
        catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
          }
    }

    async updateLobby(){ 
        const response = await api.get('/games/?gameStatus=CREATED');
        
        this.setState({ games: response.data });

        //console.log(response);
    }

    async componentDidMount() {
        try {
            sessionStorage.setItem("isValid", "false");
            const pathName = this.props.location.pathname;
            sessionStorage.setItem("pathName", pathName);

            await new Promise(resolve => setTimeout(resolve, 1000));
            this.updateLobby();
            this.interval = setInterval(async() => {
                this.updateLobby();
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
                <h2>Lobby</h2>
                <p>List of all open games:</p>
                {!this.state.games ? (
                    <Spinner />
                ) : (
                    <div>
                        <Games>
                            {this.state.games.map(game => {
                                if(game.numberOfPlayers < 7){
                                return (
                                    <GameContainer onClick={() => { this.joinGame(game.gameId)}}>
                                        <LobbyEntity game={game}/>
                                    </GameContainer>
                                );}
                            })}
                        </Games>
                        <CustomizedButton
                            color1={"red"} color2={"darkred"} width = {"60%"}
                            onClick={() => {
                                this.back();
                            }}
                        >
                            Back
                        </CustomizedButton>
                    </div>
                )}
            </Container>
                </FormContainer>
                </BaseContainer>
        );
    }
}

export default withRouter(Lobby);
