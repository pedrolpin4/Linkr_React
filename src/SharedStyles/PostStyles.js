import styled from "styled-components";
import { motion } from "framer-motion";

const PostContainer = styled.div`
  margin-top: ${(props) => (props.hasRepostBar ? "40px" : "0px")};
  margin-bottom: 20px;
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
    word-break: break-all;
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

const Header = styled.header`
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

  @media (max-width: 600px) {
    font-size: 15px;
    width: ${props => props.myPost ? `calc(90% - 30px)` : '100%'};
  }
`;

const NameAndLoc = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 5px 0 10px;
  max-width: ${props => props.myPost ? '91.5%' : '100%'};
  width: fit-content;
  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const EditInput = styled.textarea`
  width: 503px;
  max-width: 99%;
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

const Modal = styled.div`
  position: fixed;
  top: calc((100vh - 262px) / 2);
  left: calc((100vw - 597px) / 2);
  height: 262px;
  width: 597px;
  background-color: ${(props) => (props.theme === "light" ? "#e2e2e2" : "#333333")};
  opacity: 1;
  z-index: 130;
  border-radius: 20px;
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
      font-size: 26px;
      line-height: 30px;
    }
  };
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

    @media (max-width: 400px) {
      width: 100px;
      font-size: 15px;
    }
  }

  .second {
    background-color: #1877f2;
    color: #fff;
    margin-left: 27px;

    @media (max-width: 400px) {
      margin-left: 10px;
    }
  }
`;

export {
    PostContainer,
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
    ModalButtons
}