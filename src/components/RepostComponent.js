import styled from 'styled-components';
import { Retweet } from "../SharedStyles/StyledComponents"
import { useState, useContext, useEffect, useCallback } from "react";
import UserContext from '../context/UserContext';
import service from '../service/post';

export default function RepostComponent({ id,
                                         repostCount,
                                         newPosts, 
                                         setNewPosts, 
                                         theme, 
                                         modalRef}) {
 
  const { userData } = useContext(UserContext);
  const [numberOfReposts, setNumberOfReposts] = useState(repostCount);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function repost(token, id) {
    setIsClicked(true);
    async function repostingPost() {
      const response = await service.repostingPost(token, id);
      if (response) {
        setIsOpen(false);
        setNumberOfReposts(numberOfReposts + 1);
        setIsClicked(false);
        if (newPosts !== undefined) {
          setNewPosts(newPosts + 1);
        }
      } else {
        setIsOpen(false);
        setIsClicked(false);
        alert("It wasn't possible to re-post this post. Try it later.");
      }
    }
    repostingPost();
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

  return (
    <RepostContainer>
      <Retweet onClick={() => openModal()} />
      <AmountReposts>
        {numberOfReposts
          ? numberOfReposts === 1
            ? `${numberOfReposts} repost`
            : `${numberOfReposts} reposts`
          : `${numberOfReposts} reposts`}
      </AmountReposts>
        {modalIsOpen ?
        (
        <>
          <ModalBackground
            ref={modalRef}
            onClick={closeModal}
            theme={theme}
          ></ModalBackground>
          <Modal theme={theme}>
            <TopSection theme={theme}>
              <h2>{isClicked ? "Loading..." : "Are you sure you want to re-post this?"}</h2>
            </TopSection>
            <ModalButtons>
              <button disabled={isClicked} onClick={closeModal}>
                No, cancel
              </button>
              <button
                className="second"
                disabled={isClicked}
                onClick={() => repost(userData.token, id)}
              >
                Yes, share!
              </button>
            </ModalButtons>
          </Modal>
        </> ) :
        ""}

    </RepostContainer>
  );
}

const RepostContainer = styled.div`
  margin: 15px 0 0;
  text-align: center;
`

const AmountReposts = styled.p`
  font-size: 11px;
  line-height: 13px;
  margin-top: 0px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media (max-width: 600px) {
    font-size: 9px;
    line-height: 11px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: calc((100vh - 262px) / 2);
  left: calc((100vw - 597px) / 2);
  height: 262px;
  width: 597px;
  background-color: ${(props) => (props.theme === "light" ? "#e2e2e2" : "#333333")};
  opacity: 1;
  z-index: 130;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 597px) {
    width: 100vw;
    height: auto;
    left: 0px;
    padding: 0 15px 20px;
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 38px 36px 15px 40px;
  width: 100%;

  h2 {
    font-family: "Oswald", sans-serif;
    width: 350px;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    color: ${(props) => (props.theme === "light" ? "#2a2a2a" : "#ffffff")};
    overflow-wrap: break-word;
    margin: 0 5px 0 0;
    text-align: center;
  }

  p {
    font-size: 19.74px;
    color: ${(props) => (props.theme === "light" ? "#2a2a2a" : "#ffffff")};
    cursor: pointer;
  }

  @media (max-width: 611px) {
    h2 {
      font-size: 30px;
      line-height: 30px;
    }
  } ;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  right: 0px;
  background-color: ${props => props.theme === "light" ? "rgba(0,0,0, 0.6)" : "rgba(255,255,255, 0.6)"};
  z-index: 120;
`;

const ModalButtons = styled.div`
  margin-top: 30px;
  margin-bottom: 25px;
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
    cursor: pointer;
  }

  .second {
    background-color: #1877f2;
    color: #fff;
    margin-left: 27px;
  }
`;
