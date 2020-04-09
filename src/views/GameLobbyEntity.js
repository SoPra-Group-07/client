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

const UserName2 = styled.div`
  font-weight: lighter;
  margin-left: 5px;
  color: green;
`;


const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const GameLobbyEntity = ({ player, admin }) => {
    if(admin.playerName==player.playerName) {
    return (
        <Container>
            <UserName2> {player.playerName} ♕</UserName2>
        </Container>

    );}
    else{
        return(
        <Container>
            <UserName> {player.playerName}</UserName>
        </Container>
    );}

};

export default GameLobbyEntity;
