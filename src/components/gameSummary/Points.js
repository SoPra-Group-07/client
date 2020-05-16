import React from 'react';
import styled from 'styled-components';
import  { BaseContainer, SummaryForm, FormContainer, ButtonContainer, Container, Form, Label, PlayerContainer, Users } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';
import { Spinner } from '../../views/design/Spinner';
import LeaderboardEntity from "../../views/design/Board";


const LabelTrue = styled.label`
  color: green;
  margin-bottom: 10px;
  text-align: center;
`;

const CustomizedButton2 = styled.div`
&:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  font-size: ${props => props.size || "13px"};
  text-align: center;
  color: black;
  width: ${props => props.width || "20%"};
  height: ${props => props.height|| "35px"};
  border: none;
  border-radius: 0px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: linear-gradient(${props => props.color1|| "blue"},${props => props.color2|| "blue"} );
  transition: all 0.3s ease;
  overflow: auto;
`;



const LabelFalse = styled.label`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;


class Points extends React.Component {

  constructor() {
    super();
    this.state = {
        id:0
    };
  }

 
  back(id) {
    sessionStorage.setItem("isValid", "true");
    this.props.history.push(`/games/${id}/gamesummary/${id}`);
    
  }
  async componentDidMount() {
    try {
 
      const response = await api.get(`/gameRounds/${sessionStorage.GameRoundId}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(response.data)

     this.setState({ id: response.data.guess.playerId });     
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  

  render() {
        
            return(
                <BaseContainer>
                
                  <FormContainer>
                  <Container>
                  <h2>Points</h2>
                  </Container> 
                      <Form>
                      <Label style={{fontWeight: "bold", fontSize: "18px"}}>Guessing player:</Label>
                        <LabelTrue>Correct guess: +1.5</LabelTrue>
                        <LabelTrue>Guessed within 15sec.: +0.3</LabelTrue>
                        <LabelTrue>Guessed within 30sec.: +0.2</LabelTrue>
                        <LabelTrue>Guessed within 45sec.: +0.1</LabelTrue>
                        <Label style={{fontWeight: "bold", fontSize: "18px"}}>Clueing player:</Label>
                        <LabelTrue>Correct guess: +1</LabelTrue>
                        <LabelTrue>Clue within 15sec.: +0.3</LabelTrue>
                        <LabelTrue>Clue within 30sec.: +0.2</LabelTrue>
                        <LabelTrue>Clue within 45sec.: +0.1</LabelTrue>
                        <LabelFalse>No submit: -0.6</LabelFalse>
                        <LabelFalse>Dublicate Submit: -0.5</LabelFalse>        
                        </Form>
                       
                    </FormContainer>
                    <ButtonContainer>
              <CustomizedButton2
                  color1 ={"red"} color2 = {"darkred"} width = {"50%"}
                onClick={() => {
                  this.back(this.state.id); 
                }}
              >
                Back
              </CustomizedButton2>
            </ButtonContainer>
                </BaseContainer>
            );
            }
        }

        
    
        



export default withRouter(Points);