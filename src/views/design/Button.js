import styled from "styled-components";

export const Button = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: black;
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 0px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: linear-gradient(mediumslateblue, darkslateblue);
  transition: all 0.3s ease;
`;

export const EditButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: black;
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 0px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: linear-gradient(red, darkred);
  transition: all 0.3s ease;
`;

export const CustomizedButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  font-size: ${props => props.size || "13px"};
  text-align: center;
  color: black;
  width: ${props => props.width || "50%"};
  height: ${props => props.height|| "35px"};
  border: none;
  border-radius: 0px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: linear-gradient(${props => props.color1|| "blue"},${props => props.color2|| "blue"} );
  transition: all 0.3s ease;
`;


export const ButtonSpecial = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: black;
  ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 0px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: linear-gradient(lightsteelblue, royalblue);
  transition: all 0.3s ease;
`;