import React from "react";
import styled from "styled-components";
import gamerules from "./gamerules.png";
import {withRouter} from "react-router-dom";
import {Button, EditButton, CustomizedButton} from '../../views/design/Button';

/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */
const Container = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
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
        this.props.history.push(`/overview`);
    }


    render() {
        return (
            <div>
                <Container height={this.props.height}>
                    <GameRulesContainer>
                        <img src={gamerules} alt="JustOneLogo" width="60%"/>
                        <CustomizedButton width="20%" color1={"red"} color2={"darkred"} style={{
                            position: "absolute",
                            marginTop: "265px"
                        }} onClick={() => {
                            this.back();}}>
                            Back
                        </CustomizedButton>
                    </GameRulesContainer>
                </Container>
            </div>
        );
    };
};

/**
 * Don't forget to export your component!
 */
export default withRouter(GameRules);

