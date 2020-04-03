import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { ButtonSpecial, EditButton, CustomizedButton} from '../../views/design/Button';
import { Spinner } from '../../views/design/Spinner';



const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Container = styled(BaseContainer)`
  color: black;
  border-color: white;
  text-align: center;
  width: 57%;
  margin: auto;
`;
const Users = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0px solid black;
  border-radius: 0px;
  margin-left: 200px;
  margin-right: 200px;
  background: linear-gradient(white, antiquewhite);
`;

const FormContainer = styled.div`
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 0px;
  background: linear-gradient(wheat, sandybrown);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;


class Profile extends React.Component {
    state = {
        user: null,
    };

    async componentDidMount() {
        try {
          const pathname = this.props.location.pathname;      // whole pathname e.g., "/users/2"
           // console.log(pathname)

          //console.log(this.props.location.pathname)               // Displays the pathname in the console e.g., "/users/2"

          const response = await api.get(pathname);           // Accesses the "users/{userId}" port in the UserController class in the backend and returns infos of the corresponding user
        
         // console.log(response)
          await new Promise(resolve => setTimeout(resolve, 1000));
    
          // Get the returned infos of user and update the state.
          this.setState({ user: response.data });                      // puts user object in the state
    
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
        this.props.history.push(`/profiles`);              // Alternative: /game/dashboard
    }
    editUser(id){
       this.props.history.push(`/edit/${id}`);         // Routes me to the editing page of the logged in user
    }

    formatDate(dateTime) {                             // Function that formats the creation date
        const date = new Date(dateTime);
        const day = date.getDate();
        const monthIndex = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}. ${monthIndex}. ${year}`;
    }


    render() {
        return (
            <FormContainer>
                <Container>
                    <h2 style={{color:"black"}}>USER PROFILE</h2>
                </Container>
                <Container>
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

                        <BaseContainer>
                            <br/>
                            <br/>
                            <br/>
                            </BaseContainer>


                        <ButtonContainer>

                            <CustomizedButton
                                color1 ={"lightskyblue"} color2 = {"royalblue"} width = {"30%"}
                                disabled={localStorage.getItem("token") !== this.state.user.token}   /* You can only edit if the local token equals the one you fetched from the server */
                                onClick={() => {
                                    this.editUser(this.state.user.id);    // Routes me to the editing page
                                }}
                            >
                                Edit User
                            </CustomizedButton>
                            </ButtonContainer>

                        <ButtonContainer>
                            <CustomizedButton
                                color1 ={"red"} color2 = {"darkred"} width = {"25%"}
                                onClick={() => {
                                    this.back();     // Routes me back to "/game"
                                }}
                            >
                                Back
                            </CustomizedButton>
                        </ButtonContainer>
                    </div>
                )}
            </Container>

                </FormContainer>

        );
    }






}

export default withRouter(Profile)










