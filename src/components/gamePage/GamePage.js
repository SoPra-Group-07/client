import React from 'react';
import  { BaseContainer, FormContainer, ButtonContainer, Container, Form, Label } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { CustomizedButton } from '../../views/design/Button';


class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
        gameRound: null
    };
  }
 
  async updateGameRound() {
    try {
        const response = await api.get(`/gameRounds/${sessionStorage.GameRoundId}`);
      
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.setState({ gameRound: response.data });
        if(sessionStorage.getItem("TotalGameRounds")=="X"){
            sessionStorage.setItem("TotalGameRounds", this.state.gameRound.totalGameRounds);
        }
        
        if(sessionStorage.PlayerId == this.state.gameRound.guessingPlayerId){
            sessionStorage.setItem("isValid", "true");
            sessionStorage.setItem("seconds", "60");
            this.props.history.push(`/games/${this.state.gameRound.gameId}/submitnumber/${this.state.gameRound.gameRoundId}`); 
        }
        else{
            sessionStorage.setItem("isValid", "true");
            sessionStorage.setItem("seconds", "60");
            this.props.history.push(`/games/${this.state.gameRound.gameId}/submitclue/${this.state.gameRound.gameRoundId}`); 
        }
    } catch (error) {
      alert(`Something went wrong: \n${handleError(error)}`);
    }
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

    async componentDidMount() {
        try {
            sessionStorage.setItem("isValid", "false");
            const pathName = this.props.location.pathname;
            sessionStorage.setItem("pathName", pathName);
        
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.updateGameRound();
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    render() {
        return(
            <BaseContainer>
                <p style ={{position:"absolute",marginTop:"-150px",marginLeft:"5px", fontSize:"20px"}}>
                {sessionStorage.getItem("CurrentGameRound")}/{sessionStorage.getItem("TotalGameRounds")}</p>
                <FormContainer>
                <Container>
                <h2>PLEASE WAIT A MOMENT...</h2>
                </Container>
                    <Form>
                        <Label>Please wait for game round to be created...</Label>
                    </Form>
                  </FormContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(GamePage);