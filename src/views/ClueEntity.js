import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 6px 0;
  width: 150px;
  padding: 0px;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px solid black;
  background: linear-gradient(white, antiquewhite);
  flex-wrap: wrap;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-left: 5px;
  font-size: 20px;
  color:${props => props.color || "black"};
  overflow: auto;
`;

/*const Name = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;*/

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const ClueEntity = ({ sub }) => {
    var color = getRandomColor();
    return (
        <Container>
             <UserName color={color}>{sub}</UserName>
        </Container>
    );
};

export default ClueEntity;
