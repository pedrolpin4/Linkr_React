import { FaRetweet } from "react-icons/fa";
import styled from "styled-components";

export default function RepostBar() {
  return (
    <TopBar>
      <Retweet />
      <p>
        Re-posted by
        <span>
          {/* if user is the same, you else, nome da pessoa*/}
        </span>
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
  border-radius: 15px;
  width: 611px;
  display: flex;
`;

const Retweet = styled(FaRetweet)`
  
`