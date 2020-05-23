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
  overflow: auto;
`;


const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
  margin-right: 15px;
  overflow: auto;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const LobbyEntity = ({ game }) => {
    return (
        <Container>
            <UserName>{game.gameName}</UserName>
            <Id style={{color:"green"}}> {game.numberOfPlayers}/7</Id>
        </Container>
    );
};

export default LobbyEntity;
