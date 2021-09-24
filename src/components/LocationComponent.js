import styled from "styled-components";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";

export default function LocationComponent ({ setGetGeolocation }) {

  const [ isActive, setIsActive ] = useState(false);

  function toggleLocation () {
    console.log("here");
    setIsActive(!isActive);

    function GeoSuccess(position) {
      setGetGeolocation(position);
      console.log("pos", position);
      /* Deactive button when browser prompt is asking user whether he/she wants to share their location */
      /* If person turns off location from the address bar, the location is still sent */
    }

    function GeoError() {
      alert("Something went wrong. Your location wasn't acquired.");
      setIsActive(false);
    }
    console.log("iA", isActive);
    if (!isActive) {
      if (navigator.geolocation) {
        console.log("ng", navigator.geolocation)
        navigator.geolocation.getCurrentPosition(GeoSuccess, GeoError);
        console.log("location");
      }
    } else {
      setGetGeolocation({});
    }
  }

  return (
    <LocationButton onClick={toggleLocation}>
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
