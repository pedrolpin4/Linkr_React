import styled from "styled-components";

const EnterContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background-color: #333333;
  color: #ffffff;
  font-family: "Oswald", sans-serif;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const LogoHolder = styled.div`
  background: #151515;
  width: 65vw;
  height: 100%;
  padding: 20vh 10% 43.3vh;

  div {
    width: 442px;
  }

  h1 {
    font-family: "Passion One", cursive;
    font-size: 106px;
    font-weight: 700;
    line-height: 117px;
    letter-spacing: 0.05em;
  }

  h2 {
    font-size: 43px;
    line-height: 64px;
    font-weight: 700;
  }

  @media (max-width: 1000px) {
    width: 100%;
    padding: 2vh 1%;
    height: unset;
    div {
      margin: 0 auto;
      width: 237px;
      text-align: center;
    }
    h1 {
      font-size: 76px;
      line-height: 84px;
    }
    h2 {
      font-size: 23px;
      line-height: 34px;
    }
  }
`;

const LoginForm = styled.div`
  width: 35vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;

  div {
    width: 80%;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p {
    font-family: "Lato", sans-serif;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    margin-top: 22px;
  }

  @media (max-width: 1000px) {
    width: 100%;
    height: unset;

    div {
      margin: 40px auto 0;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    p {
      font-size: 17px;
      line-height: 20px;
      margin-top: 18px;
    }
  }
`;

const EnterButton = styled.button`
  font-family: "Oswald", sans-serif;
  width: 100%;
  height: 65px;
  background: #1877f2;
  border-radius: 6px;
  border: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  color: #ffffff;
  pointer-events: ${(props) => (props.clickable ? "auto" : "none")};
  opacity: ${(props) => (props.clickable ? 1 : 0.7)};

  @media (max-width: 1000px) {
    width: 100%;
    height: 55px;
    font-size: 22px;
    line-height: 33px;
  }
`;

const EnterInput = styled.input`
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  width: 100%;
  height: 65px;
  color: #9f9f9f;
  padding: 12px 17px 13px;
  margin-bottom: 13px;
  border: none;
  border-radius: 6px;
  background-color: ${(props) => (props.clickable ? "#FFFFFF" : "#d4d2d2")};
  pointer-events: ${(props) => (props.clickable ? "auto" : "none")};

  &::placeholder {
    color: #9f9f9f;
  }

  @media (max-width: 1000px) {
    font-size: 22px;
    line-height: 33px;
    width: 100%;
    height: 55px;
    padding: 10px 17px 12px;
    margin-bottom: 11px;
  }
`;

export { EnterContainer, LogoHolder, LoginForm, EnterButton, EnterInput };