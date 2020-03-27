import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import {Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;
                                 //unordered list
const Users = styled.ul`                     
  list-style: none;
  padding-left: 0;
`;
                                         //list item
const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  showUser(id) {
    this.props.history.push(`/users/${id}`);       //The corresponding user profile is accessed thanks to the id
  }

  async logout() {
    try {
      let token1 = localStorage.getItem("token");       //saving token from local storage in token1 variable
      console.log(token1)                                    //check token in console

      const requestBody = JSON.stringify({
        token: token1,
      });

      const response = await api.put('/logout', requestBody);  //Sends the local token as a PUT request to the backend in order to
                                                                   //find the corresponding player in the database and to set his status to OFFLINE and to set the token equal null
      // some data to see what is available
      console.log('request to:', response.request.responseURL);
      console.log('status code:', response.status);
      console.log('status text:', response.statusText);
      console.log('requested data:', response.data);


      localStorage.removeItem('token');          //token removed from local storage
      this.props.history.push('/login');
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  async componentDidMount() {
    try {
      const response = await api.get('/users');
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
      <Container>
        <h2>Users Overview</h2>
        <p>All users from server:</p>                                            {/* Here is an example of a ternary operator */}
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {                                    //iterates through all users (Players) so that as a result we can see the list of players on the screen
                return (
                  <PlayerContainer onClick={() => { this.showUser(user.id)}}>    {/* By clicking on one of the fields with the usernames the corresponding profile page is accessed */}
                    <Player user={user}/>                                        {/* Player component receives user-infos */}
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
