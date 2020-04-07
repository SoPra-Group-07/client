import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import {Button, CustomizedButton } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import LeaderboardEntity from "../../views/LeaderboardEntity";

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



class Leaderboard extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            count: 0
        };
    }

    back() {
        this.props.history.push(`/overview`);
    }

    async componentDidMount() {
        try {
            const response = await api.get('/leaderboard');
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
                    <Container>
                        <h2>LEADERBOARD</h2>
                        <p>All users from server:</p>
                        {!this.state.users ? (
                            <Spinner />
                        ) : (
                            <div>
                                <Users>
                                    {this.state.users.map(user => {
                                        this.state.count ++;
                                        return (
                                            <PlayerContainer>
                                                <LeaderboardEntity count={this.state.count} user={user}/>
                                            </PlayerContainer>
                                        );
                                    })}
                                </Users>
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

export default withRouter(Leaderboard);