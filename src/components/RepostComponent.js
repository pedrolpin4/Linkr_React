import styled from 'styled-components';
import { Modal,
         TopSection,
         ModalBackground,
         ModalButtons} from "../SharedStyles/PostStyles"
import { Retweet } from "../SharedStyles/StyledComponents"
import { useState, useContext, useEffect, useCallback } from "react";
import UserContext from '../context/UserContext';
import service from '../service/post';

export default function RepostComponent({ id,
                                          repostCount,
                                          newPosts, 
                                          setNewPosts, 
                                          theme, 
                                          modalRef }) {
 
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

  function closeModalFromButton() {
    setIsOpen(false);
    setIsClicked(false)
  }

  function closeModal (e) {
    if (modalRef.current === e.target) {
      setIsOpen(false);
      setIsClicked(false);
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
              <button disabled={isClicked} onClick={closeModalFromButton}>
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