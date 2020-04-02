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
   width: 60px;
   background: tan;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 10px;
`;


class HeaderBar extends React.Component{
    constructor() {
        super();
        this.state={pathname: null}
    }


    goToGameRules(){
        const pathName = this.props.location.pathname;
        this.setState({pathname: pathName});
        localStorage.setItem("pathname",pathName);
        this.props.history.push("/gamerules");
    }


    render() {
        return (
            <FooterContainer>
                <NavItems onClick={() => {
                    this.goToGameRules();
                }}>
                    Game rules
                </NavItems>
                <NavItems>
                    Edit profile
                </NavItems>

            </FooterContainer>
        );
    };

};

/**
 * Don't forget to export your component!
 */
export default HeaderBar;
