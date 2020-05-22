import React from 'react';
import styled from 'styled-components';
import  { BaseContainer, FormContainer, Label, Container} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';


const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  align-items: center;
  padding-right: 37px;
  border-radius: 0px;
  background: linear-gradient(wheat, sandybrown);
  transition: opacity 0.5s ease, transform 0.5s ease;
  overflow: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 90%;
`;

class SubmitNumber extends React.Component {
  constructor() {
    super();
    this.state = {
        gameRoundId: null,
        alreadyClicked: false
    };
  }

  async submitNumber(num){
    sessionStorage.setItem("isValid", "true");
    this.setState({alreadyClicked: true})

    const pathname = this.props.location.pathname;       
    var temp = pathname.split('/');
    var lastsegment = temp[temp.length-1];
    //console.log(lastsegment);

    const requestBody = JSON.stringify({
      wordNumber: num,
      gameRoundId: lastsegment
    });

    const response =  await api.put('/gameRounds', requestBody);

    //console.log(response.data);

    this.props.history.push(`/games/${response.data.gameId}/enterguess/${response.data.gameRoundId}`);
  }
 
  async updateGameRound() {
    try {
      const response = await api.get(`/gameRounds/${sessionStorage.GameRoundId}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.setState({ gameRoundId: response.data.gameRoundId });
      //console.log(response.data); 
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  async componentDidMount() {
    try {
        sessionStorage.setItem("isValid", "false");
        const pathName = this.props.location.pathname;
        sessionStorage.setItem("pathName", pathName);

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.updateGameRound();
    } catch (error) {
        alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }

  render() {
            return (
                <BaseContainer>
                <p style ={{position:"absolute",marginTop:"-150px",marginLeft:"5px", fontSize:"20px"}}>
                    {sessionStorage.getItem("CurrentGameRound")}/{sessionStorage.getItem("TotalGameRounds")}</p>
                  <FormContainer>
                  <Container>
                  <h2>GUESSING PLAYER</h2>
                  </Container>
                      <Form>
                      <Label>Please select one of the numbers in order to choose the guessing word:</Label>

                          <ButtonContainer>
                              <CustomizedButton width="50%" color1={"lightskyblue"} color2={"royalblue"} disabled={this.state.alreadyClicked} onClick={() => {
                                  this.submitNumber(1);
                              }}>
                                  1
                              </CustomizedButton>
                          </ButtonContainer>

                          <ButtonContainer>
                              <CustomizedButton width="50%" color1={"lightskyblue"} color2={"royalblue"} disabled={this.state.alreadyClicked} onClick={() => {
                                  this.submitNumber(2);
                              }}>
                                  2
                              </CustomizedButton>
                          </ButtonContainer>

                          <ButtonContainer>
                              <CustomizedButton width="50%" color1={"lightskyblue"} color2={"royalblue"} disabled={this.state.alreadyClicked} onClick={() => {
                                  this.submitNumber(3);
                              }}>
                                  3
                              </CustomizedButton>
                          </ButtonContainer>

                          <ButtonContainer>
                              <CustomizedButton width="50%" color1={"lightskyblue"} color2={"royalblue"} disabled={this.state.alreadyClicked} onClick={() => {
                                  this.submitNumber(4);
                              }}>
                                  4
                              </CustomizedButton>
                          </ButtonContainer>

                          <ButtonContainer>
                              <CustomizedButton width="50%" color1={"lightskyblue"} color2={"royalblue"} disabled={this.state.alreadyClicked} onClick={() => {
                                  this.submitNumber(5);
                              }}>
                                  5
                              </CustomizedButton>
                          </ButtonContainer>
                        </Form>
                    </FormContainer>
                </BaseContainer>
              );
            }    
}

export default withRouter(SubmitNumber);