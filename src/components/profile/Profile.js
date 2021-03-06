import React from 'react';
import styled from 'styled-components';
import  { BaseContainer, FormContainer, ButtonContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton} from '../../views/design/Button';
import { Spinner } from '../../views/design/Spinner';

const Container = styled(BaseContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50%;
  color: black;
  border-color: white;
  text-align: center;
`;
const Users = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0px solid black;
  border-radius: 0px;
  background: linear-gradient(white, antiquewhite);
  overflow: auto;
  width: 300px;
`;

class Profile extends React.Component {
    state = {
        user: null,
    };

    setIsValidToTrue(){
        sessionStorage.setItem("isValid", "true");
    }

    async componentDidMount() {
        try {
            sessionStorage.setItem("isValid", "false");
            const pathName = this.props.location.pathname;
            sessionStorage.setItem("pathName", pathName);
            
          const pathname = this.props.location.pathname;              

          const response = await api.get(pathname);     
        
          await new Promise(resolve => setTimeout(resolve, 1000));
    
          this.setState({ user: response.data });
    
        }  catch (error) {
          alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    back() {
        this.setIsValidToTrue();
        this.props.history.push(`/profiles`);
    }
    editUser(id){
        this.setIsValidToTrue();
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
            <FormContainer>
                <Container>
                    <h2 style={{color:"black"}}>PROFILE</h2>
                </Container>
                <Container>
                <p></p>
                {!this.state.user ? (
                    <Spinner />
                ) : (
                    sessionStorage.getItem("token") === this.state.user.token?(
                        <div>
                            <Users>
                                {"Username:"} {this.state.user.username}
                            </Users>
                            <br/>
                            <Users>
                                {"Birthday:"} {this.state.user.birth}
                            </Users>
                            <br/>
                            <Users>
                                {"Creation Date:"} {this.formatDate(this.state.user.date)} {/* Puts date in this format ---> e.g.,   2. 3. 2020    */}
                            </Users>
                            <br/>
                            <Users>
                                {"Status:"} {this.state.user.status}
                            </Users>

                            <BaseContainer>
                                <br/>
                                <br/>
                                <br/>
                            </BaseContainer>

                            <ButtonContainer>
                                <CustomizedButton
                                    color1={"lightskyblue"} color2={"royalblue"} width={"50%"}
                                    onClick={() => {
                                        this.editUser(this.state.user.id);    // Routes me to the editing page
                                    }}
                                >
                                Edit my profile
                                </CustomizedButton>
                            </ButtonContainer>

                            <ButtonContainer>
                                <CustomizedButton
                                    color1={"red"} color2={"darkred"} width={"50%"}
                                    onClick={() => {
                                        this.back();     // Routes me back to "/game"
                                    }}
                                >
                                Back
                                </CustomizedButton>
                            </ButtonContainer>
                        </div>
                    ): (
                        <div>
                            <Users>
                                {"Username:"} {this.state.user.username}
                            </Users>
                            <br/>
                            <Users>
                                {"Birthday:"} {this.state.user.birth}
                            </Users>
                            <br/>
                            <Users>
                                {"Creation Date:"} {this.formatDate(this.state.user.date)} {/* Puts date in this format ---> e.g.,   2. 3. 2020    */}
                            </Users>
                            <br/>
                            <Users>
                                {"Status:"} {this.state.user.status}
                            </Users>

                            <BaseContainer>
                                <br/>
                                <br/>
                                <br/>
                            </BaseContainer>

                            <ButtonContainer>
                                <CustomizedButton
                                    color1={"red"} color2={"darkred"} width={"50%"}
                                    onClick={() => {
                                        this.back();     // Routes me back to "/game"
                                    }}
                                >
                                Back
                                </CustomizedButton>
                            </ButtonContainer>
                        </div>
                    )
                )}
            </Container>
                </FormContainer>
        );
    }
}

export default withRouter(Profile)