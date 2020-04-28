import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import {CustomizedButton } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

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



class Profiles extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
        };
    }

    showUser(id) {
        this.props.history.push(`/users/${id}`);       //The corresponding user profile is accessed thanks to the id
    }

    back() {
        this.props.history.push(`/overview`);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }
    
    async updateProfiles(){
        const response = await api.get('/users');

        // Get the returned users and update the state.
        this.setState({ users: response.data });

        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        console.log(response);
    }

    async componentDidMount() {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.updateProfiles();
            this.interval = setInterval(async() => {
                this.updateProfiles();
            },7000);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (

            <BaseContainer>
                <FormContainer>
            <Container>
                <h2>USERS OVERVIEW</h2>
                <p>All registered users:</p>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Users>
                            {this.state.users.map(user => {
                                return (
                                    <PlayerContainer
                                        onClick={() => { this.showUser(user.id)}}>
                                        <Player user={user}/>
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

export default withRouter(Profiles);
