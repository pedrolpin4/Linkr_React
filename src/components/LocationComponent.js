import styled from "styled-components";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";

export default function LocationComponent () {

  const [ isActive, setIsActive ] = useState(false);

  function ActivateLocation () {
    setIsActive(!isActive);
    // mandar pedido pro browser
  }

  return (
    <LocationButton onClick={ActivateLocation}>
      <LocationIcon isActive={isActive} />
      <LocationText isActive={isActive}>
        {isActive ? "Localização ativada" : "Localização desativada"}
      </LocationText>
    </LocationButton>
  );
}

const LocationButton = styled.button`
  background-color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  font-family: "Lato", sans-serif;
  cursor: pointer;
  padding: 0px;
  margin: 5px 0 0;
`;

const LocationIcon = styled(IoLocationOutline)`
  color: ${props => props.isActive ? "#238700" : "#949494"};
  margin: 0 2px 0 0;
  width: 17.85px;
  height: 17.85px;
`;
const LocationText = styled.p`
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  color: ${(props) => (props.isActive ? "#238700" : "#949494")}
`;
