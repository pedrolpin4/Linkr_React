import styled from "styled-components";
import { useState, useContext } from "react";
import { FaTrash } from 'react-icons/fa';
import ReactHashtag from "react-hashtag";
import LikesComponent from "./LikesComponent";
import Modal from "react-modal";
import Preview from "./Preview";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function Post({ profilePic,
                               link,
                               username,
                               text,
                               prevTitle,
                               prevDescription,
                               prevImage,
                               likes,
                               userId,
                               id,
                               setNewPosts,
                               newPosts})
{
  
  const [isClicked, setIsClicked] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const user = useContext(UserContext);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#333333",
      width: "597px",
      height: "262px",
      borderRadius: "50px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      zIndex: 1000,
    },
  };

  function toDeletePost(id) {
    setIsClicked(true);
    axios
      .delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((resp) => {
        setIsOpen(false);
        setNewPosts(newPosts - 1);
        setIsClicked(false);
      })
      .catch((error) => {
        setIsOpen(false);
        setIsClicked(false);
        alert("It wasn't possible to delete this post. Try it later.");
      });
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
    return (
        <PostContainer>
            <LeftSection>
                <a href={`/user/${userId}`}><img src={profilePic} alt="" /></a>
                <LikesComponent likes ={likes} id ={id} userId = {userId}/>
            </LeftSection>

            <RightSection>
                <header>
                    <p className="username"><a href={`/user/${userId}`}>{username}</a></p>
                    <FaTrash size={12} />
                    <ReactHashtag onHashtagClick={val => alert(val)}
                                  renderHashtag={hashtag => (
                                    <a className="hashtag" key={hashtag}  href={`/hashtag/${hashtag.substr(1)}`}>
                                        {hashtag}
                                    </a>
                                  )}>
                        {text}
                    </ReactHashtag>
                </header>
                <Preview title={prevTitle}
                         description={prevDescription}
                         img={prevImage}
                         link={link} />
            </RightSection>
             <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                 >
                   <h2
                       style={{
                       color: "white",
                       fontSize: "34px",
                       fontWeight: "bold",
                       width: "358px",
                       fontFamily: "Lato",
                       textAlign: "center",
                       }}
                     >
                     
                    {
                    isClicked
                    ? 
                    "Loading..."
                    : 
                    "Are you sure you want to delete this post?"
                    }
                   </h2>
                   <ModalButtons>
                        <button disabled={isClicked} onClick={closeModal}>
                            No, return
                        </button>
                        <button
                            className="second"
                            disabled={isClicked}
                            onClick={() => toDeletePost(id)}
                        >
                            Yes, delete it
                        </button>
                   </ModalButtons>
              </Modal>
        </PostContainer>
    )
}

const PostContainer = styled.div`
  background-color: #171717;
  border-radius: 15px;
  width: 611px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px;
  min-height: 220px;
  position: relative;
`;

const LeftSection = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;

  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-bottom: 20px;
  }

  .likes {
    font-size: 12px;
    margin-top: 5px;
  }
`;

const RightSection = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding-left: 20px;

  svg {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  header {
    margin-bottom: 10px;
    color: #cecece;
    line-height: 20px;
    font-size: 17px;
  }

  .username {
    margin-bottom: 10px;
    line-height: unset;
    color: #fff;
    font-size: 19px;
  }

  .hashtag {
    font-weight: bolder;
    color: #fff;
  }
`;

const ModalButtons = styled.div`
  margin-top: 30px;
  button {
    width: 134px;
    height: 37px;
    border-radius: 5px;
    border: none;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #1877f2;
  }

  .second {
    background-color: #1877f2;
    color: #fff;
    margin-left: 27px;
  }
`;
