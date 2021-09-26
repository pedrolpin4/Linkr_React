import styled from "styled-components";
import { useState, useContext, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineComment } from "react-icons/ai";
import ReactHashtag from "react-hashtag";
import axios from "axios";
import { Link } from "react-router-dom";
import getYouTubeID from "get-youtube-id";
import { motion } from "framer-motion";
import LikesComponent from "./LikesComponent";
import Modal from "react-modal";
import Preview from "./Preview";
import UserContext from "../context/UserContext";
import service from "../service/post";
import CommentBox from "./CommentsBox/CommentBox";
import RepostComponent from "./RepostComponent";
import RepostBar from "./RepostBar";
import { customStyles, ModalButtons } from "../SharedStyles/StyledComponents";
import ThemeContext from "../context/ThemeContext";
import LocationPin from "./LocationPin";
import {useMediaQuery} from '../utils/useMediaQuery';

export default function Post({ postData, lastPost, geoLocation }) {
  const {
    repostId,
    link,
    user,
    text,
    linkTitle,
    linkDescription,
    linkImage,
    likes,
    id,
    setNewPosts,
    newPosts,
    repostCount,
    repostedBy
  } = postData;

  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(text);
  const [lastValue, setLastValue] = useState(text);
  const [isDisabled, setIsDisabled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { userData } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const [isCommentBoxActive, setIsCommentBoxActive] = useState(false);
  const [commentsAmmount, setCommentsAmmount] = useState("");
  
  const isMobile = useMediaQuery('(min-width: 600px)');

  const variants = 
    isMobile
    ? {
        noRadius: {
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
        },
        radius: {
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          transition: {
            delay: 0.1,
          },
        },
      }
    : {
      noRadius: {
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
      },
      radius: {
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
        transition: {
          delay: 0.1,
        },
      },
    }

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

  function toggleCommentsView(e) {
    e.stopPropagation();
    setIsCommentBoxActive(!isCommentBoxActive);
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <PostContainer hasRepostBar={repostId}>
      {repostId ? (
        <RepostBar
          repostedBy={repostedBy}
          theme={theme}
        />
      ) : null}
      <UpperContainer
        animate={isCommentBoxActive ? "noRadius" : "radius"}
        variants={variants}
        ref={lastPost}
        theme={theme}
      >
        <LeftSection theme={theme}>
          <Link to={`/user/${user.id}`}>
            <img src={user.avatar} alt="" />
          </Link>
          <LikesComponent likes={likes} id={id} userId={user.id} />

          <RepostComponent
            repostCount={repostCount}
            id={id}
            userId={user.id}
            setNewPosts={setNewPosts}
            newPosts={newPosts}
          />

          <ShowComments theme ={theme}>
            <AiOutlineComment
              className="comments-ico"
              size={20}
              color= {theme === "light" ? "#171717" : "#FFFFFF"}
              onClick={(e) => {
                toggleCommentsView(e);
              }}
            />
            <p className="comments-ammount">{`${commentsAmmount} comments`}</p>
          </ShowComments>
        </LeftSection>

        <RightSection
          shouldhide={user.id === userData.user?.id && !repostId}
          theme={theme}
        >
          <header>
            <div>
              <p className="username">
                <Link to={`/user/${user.id}`}>{user.username}</Link>
              </p>
              {geoLocation ? (
                <LocationPin
                  theme={theme}
                  geoLocation={geoLocation}
                  username={user.username}
                />
              ) : (
                ""
              )}
            </div>
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
                theme={theme}
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
                allowFullScreen="true"
              ></iframe>
              <Link to={link} className="youtubeLink">
                {link}
              </Link>
            </>
          ) : (
            <Preview
              title={linkTitle}
              description={linkDescription}
              img={linkImage}
              link={link}
              theme={theme}
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
      </UpperContainer>
      <CommentBox
        postId={id}
        postOwner={user}
        isActive={isCommentBoxActive}
        setCommentsAmmount={setCommentsAmmount}
        theme = {theme}
      />
    </PostContainer>
  );
}

const PostContainer = styled.div`
  margin-top: ${props => props.hasRepostBar ? "60px" : "20px"};
  position: relative;
`;

const UpperContainer = styled(motion.div)`
  background-color: ${(props) =>
    props.theme === "light" ? "#FFFFFF" : "#171717"};
  border-radius: 15px;
  width: 611px;
  display: flex;
  justify-content: space-between;
  padding: 13px;
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
    font-size: 17px;
    line-height: 20px;
    -webkit-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    border-radius: 0px;

    .youtubeLink {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;

const LeftSection = styled.div`
  width: 12%;
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
    color: ${(props) => (props.theme === "light" ? "#171717" : "#FFFFFF")};
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    .likes {
      font-size: 9px;
      line-height: 11px;
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

const ShowComments = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  p {
    text-align: center;
    font-size: 11px;
    font-family: "Lato", sans-serif;
    color: ${props => props.theme === "light" ? "#171717" : "#FFFFFF"};

    @media screen and (max-width: 600px) {
      font-size: 9px;
    }
  }

  .comments-ico {
    cursor: pointer;
  }
`;

const RightSection = styled.div`
  width: 88%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding-left: 15px;

  .delete {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 5px;
    color: ${(props) => (props.theme === "light" ? "#171717" : "#FFFFFF")};
    display: ${(props) => (!props.shouldhide ? "none" : "unset")};
  }

  .edit {
    cursor: pointer;
    position: absolute;
    right: 40px;
    top: 5px;
    color: ${(props) => (props.theme === "light" ? "#171717" : "#FFFFFF")};
    display: ${(props) => (!props.shouldhide ? "none" : "unset")};
  }

  header {
    margin-bottom: 10px;
    color: ${(props) => (props.theme === "light" ? "#333333" : "#cecece")};
    line-height: 20px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    font-size: 17px;
    max-width: 95%;
    -webkit-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }

  header > div {
    display: flex;
    align-items: center;
    margin: 5px 0 10px;
  }

  .username {
    line-height: unset;
    color: ${(props) => (props.theme === "light" ? "#171717" : "#FFFFFF")};
    font-size: 19px;
    word-break: break-all;
  }

  .hashtag {
    font-weight: bolder;
    color: ${(props) => (props.theme === "light" ? "#171717" : "#FFFFFF")};
  }

  @media (max-width: 600px) {
    header {
      font-size: 15px;
      width: calc(90% - 30px);
    }

    .delete {
      right: 7px;
    }

    .edit {
      right: 32px;
    }

    .delete,
    .edit {
      width: 12px;
      height: 14px;
    }

    .username {
      font-size: 17px;
    }
  }
`;

const EditInput = styled.textarea`
  width: 503px;
  min-height: 44px;
  background: ${(props) => (props.theme === "light" ? "#DCDCDC" : "#FFFFFF")};
  border-radius: 7px;
  padding: 8px 10px;
  border: none;
  font-size: 14px;
  line-height: 17px;
  word-break: break-all;
  resize: none;
  color: ${(props) => (props.theme === "light" ? "black" : "#171717")};
  font-family: "Lato", sans-serif;
  margin-top: 8px;
  :focus {
    outline: none;
  }
`;
