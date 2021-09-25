import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

function PostBox({newPosts, setNewPosts, theme}) {
  const { userData } = useContext(UserContext);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [clicked, setClicked] = useState(false);

  function toPublishPost() {
    setClicked(true);
    const { token } = userData;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (url !== "") {
      const req = axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts",
        {
          text,
          link: url,
        },
        config
      );

      req.then((resp) => {
        setUrl("");
        setText("");
        setClicked(false);
        setNewPosts(newPosts + 1);
      });
      req.catch((error) => {
        alert("There was an error posting your link.");
        setUrl("");
        setText("");
        setClicked(false);
      });
    } else {
      alert("An URL must be defined.");
      setClicked(false);
    }
  }

  return (
    <CreatePostBox theme = {theme}>
      <ImageUser>
        <Link to={`/user/${userData.user?.id}`}>
          <img src={userData.user?.avatar} alt="" />
        </Link>
      </ImageUser>
      <PostContent theme = {theme}>
        <h1>What do you have to post today?</h1>
        <URL
          placeholder="http://..."
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          disabled={clicked}
          theme = {theme}
        ></URL>
        <Text
          placeholder="What's happening?"
          onChange={(e) => setText(e.target.value)}
          value={text}
          disabled={clicked}
          theme = {theme}
        ></Text>
        <ButtonDiv>
          <PublishButton onClick={toPublishPost} disabled={clicked} theme = {theme}>
            {clicked ? "Publishing..." : "Publish"}
          </PublishButton>
        </ButtonDiv>
      </PostContent>
    </CreatePostBox>
  );
}

export default PostBox;


const CreatePostBox = styled.div`
  width: 611px;
  height: 209px;
  border-radius: 16px;
  background-color: ${props => props.theme === "light" ? "#171717" : "#FFF"};
  display: flex;
  padding: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 600px) {
    width: 100%;
    border-radius: 0px;
    height: auto;
    padding: 10px 15px;
  }
`;

const ImageUser = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-right: 15px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 60px;
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const PostContent = styled.div`
  width: 100%;
  height: 100%;

  h1 {
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: ${props => props.theme === "light" ? "#f1f1f1" : "#707070"};
  }

  @media screen and (max-width: 600px) {
    h1 {
      text-align: center;
      font-size: 17px;
      height: auto;
  }
  }
`;

const URL = styled.input`
  width: 503px;
  height: 30px;
  background: ${props => props.theme === "light" ? "#2a2a2a" : "#efefef"};
  border-radius: 5px;
  border: none;
  margin: 5px auto;
  padding-left: 10px;
  color: ${props => props.theme === "light" ? "#fff" : "black"};
  font-family: "Lato", sans-serif;
  :focus {
    outline: none;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Text = styled.textarea`
  width: 503px;
  height: 66px;
  background: ${props => props.theme === "light" ? "#2a2a2a" : "#efefef"};
  color: ${props => props.theme === "light" ? "#fff" : "black"};
  border-radius: 5px;
  border: none;
  margin: 0 auto 15px auto;
  padding: 10px;
  word-break: break-word;
  word-break: break-all;
  resize: none;
  font-family: "Lato", sans-serif;
  :focus {
    outline: none;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    margin-bottom: 6px;
    height: 47px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PublishButton = styled.button`
  width: 112px;
  height: 31px;
  background: #1877f2;
  border-radius: 5px;
  color: #fff;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  @media (max-width: 600px) {
    height: 22px;
  }
`;