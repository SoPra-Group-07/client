import React from 'react';
import styled from 'styled-components';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, Label, PlayerContainer, Users} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';
import StatisticsList from '../../views/StatisticsList';

const LabelTrue = styled.label`
  color: green;
  margin-bottom: 10px;
  text-align: center;
`;

class Statistics extends React.Component {
  constructor() {
    super();
    this.state = {
        gameStatistics: null,
        gameRound: null,
        otherPlayers: [],
    };
  }
  
  async backToOverview(){
    sessionStorage.setItem("isValid", "true");
    this.props.history.push(`/overview`);
  }

  async componentDidMount() {
    try {
      sessionStorage.setItem("isValid", "false");
      const pathName = this.props.location.pathname;
      sessionStorage.setItem("pathName", pathName);

      const response = await api.get(`/gameRounds/${sessionStorage.GameRoundId}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      //console.log(response.data)

      this.setState({ gameRound: response.data }); 
     
      const response2 = await api.get(`/games/${this.state.gameRound.gameId}/gameStatistics`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      //console.log(response2.data)

      this.setState({ gameStatistics: response2.data });
    } catch (error) {
        alert(`Something went wrong: \n${handleError(error)}`);
    }
  }

  render() {
        {if(this.state.gameStatistics && this.state.gameRound){
                return (
                    <BaseContainer>
                      <FormContainer>
                      <Container>
                      <h2>GAME STATISTICS</h2>
                      </Container>
                          <Form>
                            <Label>You achieved a total of</Label>
                            {this.state.gameStatistics.map(user => {
                                    if(user.playerId == sessionStorage.PlayerId){
                                      return (
                                          <LabelTrue>{Math.floor(user.totalPoints * 100) / 100} points</LabelTrue>
                                      );
                                    }
                                })} 

                            <Label>Other players:</Label>
                              <Users>
                                {this.state.gameStatistics.map(user => {
                                  if(user.playerId != sessionStorage.PlayerId){
                                    return (
                                        <PlayerContainer>
                                            <StatisticsList user={user}/>
                                        </PlayerContainer>
                                    );
                                  }
                                })}
                               </Users>
                              <ButtonContainer>
                                  <CustomizedButton 
                                    color1={"red"} color2={"darkred"} width = {"60%"} onClick={() => {
                                          this.backToOverview();
                                      }}>
                                          Back to overview
                                  </CustomizedButton>
                              </ButtonContainer>
                            </Form>
                          </FormContainer>
                        </BaseContainer>
                )
              }        
        else {
            return(
            <BaseContainer>
                <FormContainer>
                <Container>
                <h2>PLEASE WAIT A MOMENT...</h2>
                </Container>
                    <Form>
                    <Label>Please wait for statistics...</Label>
                      </Form>
                  </FormContainer>
            </BaseContainer>
            );}  
        }  
    }
}

export default withRouter(Statistics);