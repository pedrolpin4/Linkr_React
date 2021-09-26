import styled from "styled-components"

function FeedbackMessage ({text}) {
    return <Message>{text ? text : "No posts found yet :("}</Message>
}

function LoadingMessage () {
  return <Message>Loading More posts...</Message>
}

const Message = styled.h1`
  color: #a8abb0;
  
  font-size: 35px;
  line-height: 45px;
  font-weight: bold;
  font-family: "Oswald", sans-serif;
  @media(max-width: 611px){
    margin: 0 0 0 17px;
  }
`;

const Message = styled.h1`
  color: #333333;
  font-size: 25px;
  line-height: 45px;
  font-weight: bold;
  font-family: "Oswald", sans-serif;
  align-self: center;
`;

export {
  FeedbackMessage,
  LoadingMessage
}