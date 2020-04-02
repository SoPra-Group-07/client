import React from "react";
import styled from "styled-components";


const Title = styled.h1`
  font-weight: bold;
  color: black;
  text-align: center;
  font-size: 6px;
`;

const FooterContainer = styled.div`
   height: 20px;
   width: 100%;
   background: tan;
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   top: 0px;
`;

const HeaderBar = () => {
    return (
        <FooterContainer>
        </FooterContainer>
    );
};

/**
 * Don't forget to export your component!
 */
export default HeaderBar;
