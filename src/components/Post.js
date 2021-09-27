import {PostContainer,
        UpperContainer, 
        LeftSection,
        ShowComments,
        RightSection,
        Header,
        NameAndLoc,
        EditInput,
        Modal,
        TopSection,
        ModalBackground,
        ModalButtons} from "../SharedStyles/PostStyles"
import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineComment } from "react-icons/ai";
import ReactHashtag from "react-hashtag";
import axios from "axios";
import { Link } from "react-router-dom";
import getYouTubeID from "get-youtube-id";
import LikesComponent from "./LikesComponent";
import Preview from "./Preview";
import UserContext from "../context/UserContext";
import service from "../service/post";
import CommentBox from "./CommentsBox/CommentBox";
import RepostComponent from "./RepostComponent";
import RepostBar from "./RepostBar";
import ThemeContext from "../context/ThemeContext";
import LocationPin from "./LocationPin";
import { useMediaQuery } from '../utils/useMediaQuery';

export default function Post({ postData, 
                               lastPost, 
                               geoLocation, 
                               setNewPosts, 
                               newPosts, 
                               index, 
                               setPosts, 
                               setHasMore }) {
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
    const modalRef = useRef()

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
        setIsClicked(false);
        setPosts(prev => prev.filter((e, i) => i !== index))
        setHasMore(true)
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

  function closeModal (e) {
    if (modalRef.current === e.target) {
      setIsOpen(false);
      setIsClicked(false)
    }
  }

  const modalKeyEvents = useCallback(
    (e) => {
      if (e.key === "Escape" && modalIsOpen === true) {
        setIsOpen(false);
      }
    },
    [setIsOpen, modalIsOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", modalKeyEvents);
    return () => {document.removeEventListener("keydown", modalKeyEvents)}
  }, [modalKeyEvents]);

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
    <PostContainer hasRepostBar={repostId} ref={lastPost}>
      {repostId ? <RepostBar repostedBy={repostedBy} theme={theme} /> : null}
      <UpperContainer
        animate={isCommentBoxActive ? "noRadius" : "radius"}
        variants={variants}
        theme={theme}
      >
        <LeftSection theme={theme}>
          <a href={`/user/${user.id}`}>
            <img src={user.avatar} alt="" />
          </a>
          <LikesComponent likes={likes} id={id} userId={user.id} />

          <RepostComponent
            repostCount={repostCount}
            id={id}
            userId={user.id}
            setNewPosts={setNewPosts}
            newPosts={newPosts}
            theme = {theme}
            modalRef = {modalRef}
            closeModal = {closeModal}
            modalKeyEvents = {modalKeyEvents}
          />

          <ShowComments theme={theme}>
            <AiOutlineComment
              className="comments-ico"
              size={20}
              color={theme === "light" ? "#171717" : "#FFFFFF"}
              onClick={(e) => {
                toggleCommentsView(e);
              }}
            />
            {commentsAmmount === 1 ? (
              <p className="comments-ammount">{`${commentsAmmount} comment`}</p>
            ) : (
              <p className="comments-ammount">{`${commentsAmmount} comments`}</p>
            )}
          </ShowComments>
        </LeftSection>

        <RightSection
          shouldhide={user.id === userData.user?.id && !repostId}
          theme={theme}
        >
          <Header
            myPost={user.username === userData.user ? true : false}
            theme={theme}
          >
            <NameAndLoc myPost={user.username === userData.user ? true : false}>
              <div>
                <p className="username">
                  <a href={`/user/${user.id}`}>{user.username}</a>
                </p>
              </div>
              {geoLocation ? (
                <LocationPin
                  theme={theme}
                  geoLocation={geoLocation}
                  username={user.username}
                />
              ) : (
                ""
              )}
            </NameAndLoc>
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
          </Header>
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
              <a href={link} className="youtubeLink">
                {link}
              </a>
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
        {modalIsOpen ? (
        <>
          <ModalBackground
            ref={modalRef}
            onClick={closeModal}
            theme={theme}
          ></ModalBackground>
          <Modal theme={theme}>
            <TopSection theme={theme}>
              <h2>{isClicked ? "Loading..." : "Are you sure you want to delete this post?"}</h2>
            </TopSection>
            <ModalButtons>
              <button disabled={isClicked} onClick={closeModal}>
                No, cancel
              </button>
              <button
                className="second"
                disabled={isClicked}
                onClick={() => toDeletePost(id)}
              >
                Yes, delete!
              </button>
            </ModalButtons>
          </Modal>
        </>
      ) : (
        ""
      )}
      </UpperContainer>
      <CommentBox
        postId={id}
        postOwner={user}
        isActive={isCommentBoxActive}
        setCommentsAmmount={setCommentsAmmount}
        theme={theme}
      />
    </PostContainer>
  );
}
