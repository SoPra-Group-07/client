import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px solid black;
  :hover {
  background: linear-gradient(white, silver);
  cursor: pointer;
  }
  background: linear-gradient(white, antiquewhite);
 
`;

const GameName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
  text-align: center;
`;

const LobbyEntity = ({ game }) => {
    return (
        <Container>
             <GameName>{game.gameName}</GameName>
             <GameName style={{color:"green", marginLeft:"70%"}}>{game.numberOfPlayers}/7</GameName>
        </Container>
    );
};

export default LobbyEntity;
