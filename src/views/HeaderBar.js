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
   position: absolute;
   top: 0px;
`;

const NavItems = styled.div`
   height: 20px;
   width: 200px;
   background: tan;
   display: flex;
   justify-content: left;
   margin-left:10px;
   align-items: center;
   font-size: 10px;
`;


class HeaderBar extends React.Component{
    constructor() {
        super();

    }

    render() {
        return (
            <FooterContainer>
                <NavItems>
                    Just One Implementation
                </NavItems>
            </FooterContainer>
        );
    };

};

/**
 * Don't forget to export your component!
 */
export default HeaderBar;
