import styled from "styled-components"

export default function FeedbackMessage ({text}) {
    return <Message>{text ? text : "No posts found yet :("}</Message>
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