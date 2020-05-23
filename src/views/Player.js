import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 0px;
  display: flex;
  align-items: center;
  border: 0px solid black;
  :hover {
  background: linear-gradient(white, silver);
  cursor: pointer;
  }
  background: linear-gradient(white, antiquewhite);
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

const Player = ({ user }) => {
  return (
    <Container>
      Username: <UserName>{user.username}</UserName>
      <Id>Id: {user.id}</Id>
    </Container>
  );
};

export default Player;
