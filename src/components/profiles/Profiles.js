import React from 'react';
import  { BaseContainer, FormContainer, Container, Users, PlayerContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import {CustomizedButton } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';


class Profiles extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
        };
    }

    showUser(id) {
        sessionStorage.setItem("isValid", "true");
        this.props.history.push(`/users/${id}`);    
    }

    back() {
        sessionStorage.setItem("isValid", "true");
        this.props.history.push(`/overview`);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }
    
    async updateProfiles(){
        const response = await api.get('/users');
        this.setState({ users: response.data });
        //console.log(response);
    }

    async componentDidMount() {
        try {
            sessionStorage.setItem("isValid", "false");
            const pathName = this.props.location.pathname;
            sessionStorage.setItem("pathName", pathName);

            await new Promise(resolve => setTimeout(resolve, 1000));
            this.updateProfiles();
            this.interval = setInterval(async() => {
                this.updateProfiles();
            },7000);
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
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