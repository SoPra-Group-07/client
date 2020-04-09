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
  background: linear-gradient(white, antiquewhite);
`;

const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;


const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const GameLobbyEntity = ({ player }) => {
    return (
        <Container>
            <UserName> {player.playerName}</UserName>
        </Container>
    );
};

export default GameLobbyEntity;
