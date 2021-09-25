import styled from "styled-components";
import { FaHashtag } from "react-icons/fa";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function HashtagSearch () {

  const history = useHistory();
  let { hashtag } = useParams();
  const [ inputContent, setInputContent ] = useState("");

  function goToHashtag (e) {
    e.preventDefault();
    hashtag = inputContent;
    history.push(`/hashtag/${hashtag}`)
    setInputContent("");
  }

  return (
    <FormHolder onSubmit={goToHashtag}>
      <label for="hashtag-input">
        <HashtagIcon />
      </label>
      <HashtagInput 
        id="hashtag-input" 
        placeholder="type a hashtag" 
        type="text" 
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
        required />
    </FormHolder>
  );
}

const FormHolder = styled.form`
  position: relative;

  label {
    position: absolute;
    top: 19px;
    left: 25px;
  }
`;


const HashtagInput = styled.input`
  width: 269px;
  height: 35px;
  background: #252525;
  border-radius: 8px;
  color: #ffffff;
  font-family: Lato, sans-serif;
  font-style: italic;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.05em;
  border: none;
  margin: 12px 16px 0;
  padding: 7px 11px 9px 28px;

  ::placeholder {
    color: #575757;
  }
  
  :focus {
    outline: none;
  }
`;

const HashtagIcon = styled(FaHashtag)`
  width: 12px;
  height: 23px;
  color: #ffffff;
`;