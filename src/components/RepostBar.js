import { Retweet } from "../SharedStyles/StyledComponents";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function RepostBar({ repostedBy, theme }) {

  const { userData } = useContext(UserContext);

  console.log("uDuu", userData.user.username);

  return (
    <TopBar theme = {theme}>
      <Retweet />
      <p>
        {`Re-posted by `}
        <Link to={`/user/${repostedBy.id}`}>
          {repostedBy.username === userData.user.username
          ?
          'you'
          :
          repostedBy.username}
        </Link>
      </p>
    </TopBar>
  );
}

const TopBar = styled.div`
  background-color:  ${props => props.theme === "light" ? "#F1F1F1" : "#1e1e1e"};
  font-family: Lato, sans-serif;
  font-size: 11px;
  line-height: 13px;
  color:  ${props => props.theme === "light" ? "#171717" : "#FFFFFF"};
  border-radius: 15px 15px 0 0;
  position: absolute;
  top: -40px;
  left: 0;
  width: 611px;
  padding: 11px 13px 31px;
  display: flex;
  align-items: center;

  p {
    margin: 0 0 0 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  a {
    font-weight: 700;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    width: 100vw;
    border-radius: 0;
    margin-bottom: -15px;
  }
`;