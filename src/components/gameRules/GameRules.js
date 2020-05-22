import React from "react";
import styled from "styled-components";
import gamerules from "./gamerules.png";
import {withRouter} from "react-router-dom";
import {CustomizedButton} from '../../views/design/Button';

const Container = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameRulesContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: 4em;
`;

class GameRules extends React.Component{
    constructor() {
        super();
    }

    back() {
        sessionStorage.setItem("isValid", "true");
        this.props.history.push(`/overview`);
    }

    componentDidMount() {
        sessionStorage.setItem("isValid", "false");
        const pathName = this.props.location.pathname;
        sessionStorage.setItem("pathName", pathName);
    }

    render() {
        return (
            <div>
                <Container height={this.props.height}>
                    <GameRulesContainer>
                        <img src={gamerules} alt="JustOneLogo" width="60%"/>
                    </GameRulesContainer>
                    <CustomizedButton width="20%" color1={"red"} color2={"darkred"} onClick={() => {
                        this.back();}}>
                        Back
                    </CustomizedButton>
                </Container>
            </div>
        );
    }
}

export default withRouter(GameRules);