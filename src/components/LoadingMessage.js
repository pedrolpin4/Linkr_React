import styled from "styled-components"

export default function LoadingMessage ({text}) {
    return <Message>Loading more posts...</Message>
}

const Message = styled.h1`
  color: ${localStorage.getItem("currentTheme") === "light" ? "#333333" : "#707070"};
  font-size: 15px;
  line-height: 45px;
  font-weight: bold;
  font-family: "Oswald", sans-serif;
  align-self: center;
`;