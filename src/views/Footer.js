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
   background: Sienna;
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   bottom: 0px;
`;

const Footer = () => {
    return (
            <FooterContainer>
                <Title>
                <h1>©2020</h1>
                </Title>
            </FooterContainer>
    );
};

/**
 * Don't forget to export your component!
 */
export default Footer;
