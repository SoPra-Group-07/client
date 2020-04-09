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

const GameName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
  text-align: center;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const LobbyEntity = ({ game }) => {
    return (
        <Container>
             <GameName>{game.gameName}</GameName>
        </Container>
    );
};

export default LobbyEntity;
