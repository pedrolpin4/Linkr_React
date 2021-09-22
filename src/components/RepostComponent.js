import { FaRetweet } from 'react-icons/fa';
import styled from 'styled-components';
import { useState, useContext } from "react";
import Modal from "react-modal";
import UserContext from '../context/UserContext';
import service from '../service/post';

export default function RepostComponent({ id, repostCount }) {
  const { userData } = useContext(UserContext);
  const [numberOfReposts, setNumberOfReposts] = useState(repostCount);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function repost(token, id) {
    setIsClicked(true);
    console.log("repost");
    async function repostingPost() {
      const response = await service.repostingPost(token, id);
      if (response) {
        setModalIsOpen(false);
        setNumberOfReposts(numberOfReposts + 1);
        setIsClicked(false);
        console.log("resp2", response);
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
    console.log("open");
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
  margin: 22px 0 0;
  text-align: center;
`

const Retweet = styled(FaRetweet)`
  width: 25px;
  height: 25px;
  cursor: pointer;
`

const customStyles = {
  // combine with customStyles from delete
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

const ModalButtons = styled.div`
// combine with ModalButtons from delete
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
    cursor: pointer;
  }

  .second {
    background-color: #1877f2;
    color: #fff;
    margin-left: 27px;
  }
`;

const AmountReposts = styled.p`
  font-size: 11px;
  line-height: 13px;
  margin-top: 0px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;