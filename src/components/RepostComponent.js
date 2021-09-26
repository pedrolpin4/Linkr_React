import styled from 'styled-components';
import { Retweet, customStyles, ModalButtons } from "../SharedStyles/StyledComponents"
import { useState, useContext } from "react";
import Modal from "react-modal";
import UserContext from '../context/UserContext';
import service from '../service/post';

export default function RepostComponent({ id, repostCount, newPosts, setNewPosts }) {
  const { userData } = useContext(UserContext);
  const [numberOfReposts, setNumberOfReposts] = useState(repostCount);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function repost(token, id) {
    setIsClicked(true);
    async function repostingPost() {
      const response = await service.repostingPost(token, id);
      if (response) {
        setModalIsOpen(false);
        setNumberOfReposts(numberOfReposts + 1);
        setIsClicked(false);
        if (newPosts !== undefined) {
          setNewPosts(newPosts + 1);
        }
      } else {
        setModalIsOpen(false);
        setIsClicked(false);
        alert("It wasn't possible to re-post this post. Try it later.");
      }
    }
    repostingPost();
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setIsClicked(false);
  }

  return (
    <RepostContainer>
      <Retweet onClick={() => openModal()} />
      <AmountReposts>
        {numberOfReposts
          ? numberOfReposts === 1
            ? `${numberOfReposts} re-post`
            : `${numberOfReposts} re-posts`
          : `${numberOfReposts} re-posts`}
      </AmountReposts>
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
          {isClicked ? "Loading..." : "Do you want to re-post this link?"}
        </h2>
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