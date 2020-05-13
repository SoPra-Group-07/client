import React from 'react';
import  { BaseContainer, FormContainer, Container, Users, PlayerContainer} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import {CustomizedButton } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import LeaderboardEntity from "../../views/LeaderboardEntity";


class Leaderboard extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            count: 0
        };
    }

    back() {
        sessionStorage.setItem("isValid", "true");
        this.props.history.push(`/overview`);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    async updateLeaderboard(){
        const response = await api.get('/leaderboards');
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
    }

    async componentDidMount() {
        try {
            sessionStorage.setItem("isValid", "false");
            const pathName = this.props.location.pathname;
            sessionStorage.setItem("pathName", pathName);

            this.updateLeaderboard();
            this.interval = setInterval(async() => {
                this.updateLeaderboard();
            },30000);
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
