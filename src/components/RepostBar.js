import { FaRetweet } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function RepostBar({ repostedByUser, repostedById }) {

  const { userData } = useContext(UserContext);

  return (
    <TopBar>
      <Retweet />
      <p>
        {`Re-posted by `}
        <Link to={`/user/${repostedById}`}>
          {repostedByUser === userData.user.username
          ?
          'you'
          :
          repostedByUser}
        </Link>
      </p>
    </TopBar>
  );
}

const TopBar = styled.div`
  background-color: #1e1e1e;
  font-family: Lato, sans-serif;
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;
  border-radius: 15px 15px 0 0;
  margin-bottom: -20px;
  width: 611px;
  padding: 11px 13px 31px;
  display: flex;
  align-items: center;

  p {
    margin: 0 0 0 6px;
  }
  
  a {
    font-weight: 700;
  }
`;

const Retweet = styled(FaRetweet)`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;