import styled from "styled-components";
import { useState } from "react"; // importar useContext
import axios from "axios";
//import UserContext from "../context/UserContext";

function PostBox({newPosts, setNewPosts}) {  
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  //const user = useContext(UserContext);
  const [clicked, setClicked] = useState(false);

  function toPublishPost() {
    setClicked(true);
    const config = {
      headers: {
        Authorization: `Bearer 5f8eb824-09fe-4ef6-a5ed-a26dbcb1bc10`, //substituir por ${user.token}
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
        console.log(resp);
        setUrl("");
        setText("");
        setClicked(false);
        setNewPosts(newPosts + 1);
      });
      req.catch((error) => {
        console.log(error);
        alert("There was an error posting your link.");
        setUrl("");
        setText("");
      });
    } else {
      alert("An URL must be defined.");
      setClicked(false);
    }
  }

  return (
      <CreatePostBox>
        <ImageUser>
          <img
            src="https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?size=626&ext=jpg"
            alt=""
          />
        </ImageUser>
        <PostContent>
          <h1>What do you have to post today?</h1>
          <URL
            placeholder="http://..."
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            disabled={clicked}
          ></URL>
          <Text
            placeholder="What's happening?"
            onChange={(e) => setText(e.target.value)}
            value={text}
            disabled={clicked}
          ></Text>
          <ButtonDiv>
            <PublishButton onClick={toPublishPost} disabled={clicked}>
              {clicked ? "Publishing..." : "Publish"}
            </PublishButton>
          </ButtonDiv>
        </PostContent>
      </CreatePostBox>
  );
}

export default PostBox;

//-------styled-components

const CreatePostBox = styled.div`
  width: 611px;
  height: 209px;
  border-radius: 16px;
  background-color: #fff;
  //position: fixed;
  //top: 232px;
  //left: 241px;
  display: flex;
  padding: 20px;
  margin-bottom: 20px;
  font-family: Lato;
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
`;

const PostContent = styled.div`
  width: 100%;
  height: 100%;

  h1 {
    font-family: Lato;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
  }
`;

const URL = styled.input`
  width: 503px;
  height: 30px;
  background: #efefef;
  border-radius: 5px;
  border: none;
  margin: 5px auto;
  padding-left: 10px;
  font-family: Lato;
`;

const Text = styled.textarea`
  width: 503px;
  height: 66px;
  background: #efefef;
  border-radius: 5px;
  border: none;
  margin: 0 auto 5px auto;
  padding: 10px;
  word-break: break-word;
  word-break: break-all;
  resize: none;
  font-family: Lato;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const PublishButton = styled.button`
  width: 112px;
  height: 31px;
  background: #1877F2;
  border-radius: 5px;
  color: #fff;
  font-family: Lato;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;