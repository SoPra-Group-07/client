import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import {Button, ButtonSpecial, EditButton} from '../../views/design/Button';
import { Spinner } from '../../views/design/Spinner';



const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Container = styled(BaseContainer)`
  color: white;
  border-color: white;
  text-align: center;
  width: 60%;
  margin: auto;
`;
const Users = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 8px;
  margin-left: 200px;
  margin-right: 200px;
  background-color: slategray;
`;


class Profile extends React.Component {
    state = {
        user: null,
    };

    async componentDidMount() {
        try {
          const pathname = this.props.location.pathname;      //whole pathname e.g., /users/2
            console.log(pathname)

            //const number = this.props.location.pathname.slice(-1);     //takes last section of the pathname    !! DONT NEED IT ANYMORE !!
           // this.setState.number = number;
          //console.log(this.props.location.pathname)               //Displays the pathname in the console e.g., /users/4
          //const test = "users/1"
          const response = await api.get(pathname);
        
          console.log(response)
          await new Promise(resolve => setTimeout(resolve, 1001));           //Not necessary
    
          // Get the returned users and update the state.
          this.setState({ user: response.data });                      //puts user object in the state
    
          // This is just some data for you to see what is available.
          // Feel free to remove it.
          console.log('request to:', response.request.responseURL);
          console.log('status code:', response.status);
          console.log('status text:', response.statusText);
          console.log('requested data:', response.data);
    
        }  catch (error) {
          alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
       
      }

    back() {
        this.props.history.push(`/game`);               //  Alternative: /game/dashboard
    }
    editUser(id){
       this.props.history.push(`/edit/${id}`);
    }

    formatDate(dateTime) {
        const date = new Date(dateTime);
        const day = date.getDate();
        const monthIndex = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}. ${monthIndex}. ${year}`;
    }


    render() {
        return (
            <Container>
                <h2>User Profile</h2>
                <p></p>
                {!this.state.user ? (
                    <Spinner />
                ) : (
                    <div>
                        <Users>
                            {"Username:"}   {this.state.user.username}
                        </Users>
                        <br/>
                        <Users>
                            {"Birthday:"}   {this.state.user.birth}
                        </Users>
                        <br/>
                        <Users>
                            {"Creation Date:"}   {this.formatDate(this.state.user.date)}      {/* Puts date in this format ---> e.g.,   2. 3. 2020    */}
                        </Users>
                        <br/>
                        <Users>
                            {"Status:"}   {this.state.user.status}
                        </Users>
                        <ButtonContainer>
                            <ButtonSpecial
                                style = {{marginRight :"10px",
                                    marginLeft :"200px"}}
                                width="50%"
                                onClick={() => {
                                    this.back();
                                }}
                            >
                                Back
                            </ButtonSpecial>
                            <EditButton
                                disabled={localStorage.getItem("token") !== this.state.user.token}   /* You can only edit if the local token equals the one you fetched from the server */
                                style = {{marginRight :"200px",
                                    marginLeft :"10px"}}
                                width="50%"
                                onClick={() => {
                                    this.editUser(this.state.user.id);
                                }}
                            >
                                Edit User
                            </EditButton>
                        </ButtonContainer>
                    </div>
                )}
            </Container>
        );
    }






}

export default withRouter(Profile)










