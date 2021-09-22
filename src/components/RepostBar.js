import { FaRetweet } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function RepostBar() {
  return (
    <TopBar>
      <Retweet />
      <p>
        Re-posted by
        <Link to="">
          {/* if user is the same, you else, nome da pessoa*/}
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
`;

const Retweet = styled(FaRetweet)`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;