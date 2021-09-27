import styled from "styled-components";
import { FaRetweet } from "react-icons/fa";

const Retweet = styled(FaRetweet)`
  width: 20px;
  height: 20px;
  cursor: pointer;

  @media(max-width: 600px) {
    width: 18px;
    height: 18px;
  }
`;


export {
  Retweet,
}