import styled from "styled-components";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";

export default function LocationComponent ({ setGetGeolocation, theme }) {

  const [ isActive, setIsActive ] = useState(false);

  function toggleLocation () {
    setIsActive(!isActive);

    function GeoSuccess(position) {
      setGetGeolocation(position);
    }

    function GeoError() {
      alert("Something went wrong and your location wasn't acquired. Please, try again.");
      setIsActive(false);
    }
    if (!isActive) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(GeoSuccess, GeoError);
      }
    } else {
      setGetGeolocation({});
    }
  }

  return (
    <LocationButton onClick={toggleLocation} theme={theme}>
      <LocationIcon isActive={isActive} />
      <LocationText isActive={isActive}>
        {isActive ? "Localização ativada" : "Localização desativada"}
      </LocationText>
    </LocationButton>
  );
}

const LocationButton = styled.button`
  background-color: ${props => props.theme === "light" ? "#171717" : "#fff"};
  border: none;
  display: flex;
  align-items: center;
  font-family: "Lato", sans-serif;
  cursor: pointer;
  padding: 0px;
  margin: 5px 0 0;

  @media(max-width: 600px) {
    margin: 2px 0 0;
  }
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
  color: ${(props) => (props.isActive ? "#238700" : "#949494")};
  @media(max-width: 611px){
    font-size: 11px;
  }
`;
