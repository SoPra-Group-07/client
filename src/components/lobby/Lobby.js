import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import {CustomizedButton } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import LobbyEntity from '../../views/LobbyEntity';

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
`;
//unordered list
const Games = styled.ul`                     
  list-style: none;
  padding-left: 0;
  overflow: auto;
  max-height: 330px;
`;
//list item
const GameContainer = styled.li`
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



class Lobby extends React.Component {
    constructor() {
        super();
        this.state = {
            games: null
        };
    }


    back() {
        this.props.history.push(`/overview`);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    async joinGame(id){
        try{
            const requestBody = JSON.stringify({
                gameId: id,
                userId: localStorage.UserId
            });

            console.log(requestBody);
        
            const response = await api.put('/games', requestBody);
            
            // Get the returned users and update the state.
            //this.setState({ games: response.data });

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);

            this.props.history.push(`/lobby/${id}`); 
        }
        catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
          }
    }

    async updateLobby(){ 
        const response = await api.get('/games/?gameStatus=CREATED');
        
        // Get the returned users and update the state.
        this.setState({ games: response.data });

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        // See here to get more data.
        console.log(response);
    }

    async componentDidMount() {
        try {
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
