import styled from "styled-components"

export default function FeedbackMessage () {
    return (<Message>No posts found yet :(</Message>)
}

const Message = styled.h1`
    color: #A8ABB0;
    font-size: 35px;
    font-weight: bold;
    font-family: 'Oswald', sans-serif;
`