import styled from "styled-components";
import { FaHashtag } from "react-icons/fa";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function HashtagSearch ({theme}) {

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
    <FormHolder onSubmit={goToHashtag} theme = {theme}>
      <label for="hashtag-input">
        <HashtagIcon theme ={theme}/>
      </label>
      <HashtagInput 
        id="hashtag-input" 
        placeholder="type a hashtag" 
        type="text" 
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
        required 
        theme = {theme}/>
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
  background: ${(props) => props.theme === "light" ? "#e2e2e2" : "#252525"};
  border-radius: 8px;
  color: ${(props) => props.theme === "light" ? "#171717" : "#FFFFFF"};
  font-weight: bold;
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
  color: ${(props) => props.theme === "light" ? "#171717" : "#FFFFFF"};
`;