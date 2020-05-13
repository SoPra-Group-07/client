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

const Users = styled.ul`                     
  list-style: none;
  padding-left: 0;
`;

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
    sessionStorage.setItem("isValid", "true");
    this.props.history.push(`/users/${id}`);      
  }

  async logout() {
    try {
      sessionStorage.setItem("isValid", "true");
      let token1 = sessionStorage.getItem("token");      
      console.log(token1)                                    

      const requestBody = JSON.stringify({
        token: token1,
      });

      const response = await api.put('/logout', requestBody);  
     
      //console.log('requested data:', response.data);

      sessionStorage.removeItem('token');          
      this.props.history.push('/login');
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
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
              {this.state.users.map(user => {                                 
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