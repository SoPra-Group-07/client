import React from "react";
import styled from "styled-components";


const FooterContainer = styled.div`
   height: 40px;
   width: 100%;
   background: tan;
   display: flex;
   position: absolute;
   top: 0px;
`;

const NavItems = styled.div`
   height: 40px;
   width: 300px;
   background: tan;
   display: flex;
   justify-content: left;
   margin-left:10px;
   align-items: center;
   font-size: 13px;
`;


class HeaderBar extends React.Component{
    constructor() {
        super();

    }

    render() {
        return (
            <FooterContainer>
                <NavItems>
                    Just One Implementation - Group 07
                </NavItems>
                
            </FooterContainer>
        );
    }

}

/**
 * Don't forget to export your component!
 */
export default HeaderBar;
