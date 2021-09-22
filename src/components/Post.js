import styled from "styled-components";
import { useState, useContext, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import ReactHashtag from "react-hashtag";
import LikesComponent from "./LikesComponent";
import Modal from "react-modal";
import Preview from "./Preview";
import axios from "axios";
import UserContext from "../context/UserContext";
import service from "../service/post";
import { Link } from "react-router-dom";
import getYouTubeID from "get-youtube-id";
import RepostComponent from "./RepostComponent";
import RepostBar from "./RepostBar";

export default function Post({
  profilePic,
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
  newPosts,
  repostCount,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(text);
  const [lastValue, setLastValue] = useState(text);
  const [isDisabled, setIsDisabled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { userData } = useContext(UserContext);

  console.log(userData, "id", id);

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

  async function keyEvents(e) {
    if (e.code === "Escape") {
      setIsEditing(false);
      setCurrentValue(lastValue);
    } else if (e.code === "Enter") {
      setIsDisabled(true);
      const response = await service.editingPost(
        userData.token,
        id,
        currentValue
      );

      if (response) {
        setIsEditing(false);
        setLastValue(response.post.text);
        setIsDisabled(false);
      } else {
        setIsDisabled(false);
        inputRef.current.focus();
        alert("Something went wrong while editing your post");
      }
    }
  }

  function toDeletePost(id) {
    setIsClicked(true);
    axios
      .delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      .then(() => {
        setIsOpen(false);
        setNewPosts(newPosts - 1);
        setIsClicked(false);
      })
      .catch(() => {
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

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      {/* add a condition to show RepostBar or not */}
      <RepostBar />
      <PostContainer>
        <LeftSection>
          <a href={`/user/${userId}`}>
            <img src={profilePic} alt="" />
          </a>
          <LikesComponent likes={likes} id={id} userId={userId} />
          <RepostComponent repostCount={repostCount} id={id} userId={userId} />
        </LeftSection>

        <RightSection shouldhide={userId === userData.user?.id}>
          <header>
            <p className="username">
              <a href={`/user/${userId}`}>{username}</a>
            </p>
            <FiEdit2
              size={16}
              className="edit"
              onClick={() => {
                if (isEditing) {
                  setIsEditing(false);
                  setCurrentValue(lastValue);
                } else {
                  setIsEditing(true);
                }
              }}
            />
            <FaTrash size={16} className="delete" onClick={openModal} />
            {isEditing ? (
              <EditInput
                ref={inputRef}
                value={currentValue}
                disabled={isDisabled}
                onChange={(e) => setCurrentValue(e.target.value)}
                onKeyDown={(e) => keyEvents(e)}
              />
            ) : (
              <ReactHashtag
                onHashtagClick={(val) => alert(val)}
                renderHashtag={(hashtag) => (
                  <Link
                    className="hashtag"
                    key={hashtag}
                    to={`/hashtag/${hashtag.substr(1)}`}
                  >
                    {hashtag}
                  </Link>
                )}
              >
                {currentValue}
              </ReactHashtag>
            )}
          </header>
          {link.match("^https?://www.youtube.com/watch") ? (
            <>
              <iframe
                title={link}
                width="98%"
                height="290"
                className="youtube"
                src={`https://www.youtube.com/embed/${getYouTubeID(link)}`}
              ></iframe>
              <a href={link} className="youtubeLink">
                {link}
              </a>
            </>
          ) : (
            <Preview
              title={prevTitle}
              description={prevDescription}
              img={prevImage}
              link={link}
            />
          )}
        </RightSection>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
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
            {isClicked
              ? "Loading..."
              : "Are you sure you want to delete this post?"}
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
    </>
  );
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
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .youtube {
    margin-bottom: 15px;
  }

  .youtubeLink {
    margin-bottom: 5px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    border-radius: 0px;
  }
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
    font-size: 11px;
    line-height: 13px;
    margin-top: 5px;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .likedHeart {
    color: #ff0000;
    cursor: pointer;
  }

  .unLikedHeart {
    color: #fff;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    .likes {
      font-size: 9px;
      text-align: center;
    }

    svg {
      width: 18px;
      height: 18px;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin-bottom: 17px;
    }
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

  .delete {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 5px;
    color: "#FFFFFF";
    display: ${(props) => (!props.shouldhide ? "none" : "unset")};
  }

  .edit {
    cursor: pointer;
    position: absolute;
    right: 40px;
    top: 5px;
    color: "#FFFFFF";
    display: ${(props) => (!props.shouldhide ? "none" : "unset")};
    color: #ffffff;
  }

  header {
    margin-bottom: 10px;
    color: #cecece;
    line-height: 20px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    font-size: 17px;
    max-width: 95%;
    -webkit-user-select: text;
    -ms-user-select: text;
    user-select: text;
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

  @media (max-width: 600px) {
    header {
      font-size: 15px;
      width: calc(90% - 30px);
    }

    .delete {
      top: 3px;
      right: 7px;
    }

    .edit {
      top: 3px;
      right: 32px;
    }

    svg {
      width: 12px;
      height: 14px;
    }

    .username {
      font-size: 17px;
    }
  }
`;

const ModalButtons = styled.div`
  margin-top: 30px;
  button {
    width: 134px;
    height: 37px;
    border-radius: 5px;
    border: none;
    font-family: "Lato", sans-serif;
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

const EditInput = styled.textarea`
  width: 503px;
  min-height: 44px;
  background: #ffffff;
  border-radius: 7px;
  padding: 8px 10px;
  border: none;
  font-size: 14px;
  line-height: 17px;
  word-break: break-all;
  resize: none;
  color: #4c4c4c;
  font-family: "Lato", sans-serif;
  margin-top: 8px;
  :focus {
    outline: none;
  }
`;
