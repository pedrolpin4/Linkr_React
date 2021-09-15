import styled from "styled-components";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { API } from "../service/auth";

function SignUp() {

  const history = useHistory();
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createUsername, setCreateUsername] = useState("");
  const [createImage, setCreateImage] = useState("");
  const [enabled, setEnabled] = useState(true);

  function signUpSuccess(response) {

  }

  function signUpFailure(response) {

  }

  function createAccount (e) {
    e.preventDefault();
    setEnabled(false);

    const body = {
      "email": createEmail,
      "password": createPassword,
      "username": createUsername,
      "pictureUrl": createImage
    }
    
    if (createEmail === "" || createPassword === "" || createUsername === "" || createImage === "") {
      alert("Please, fill out the fields below.");
    } else {

      console.log(body);
      API.post("/sign-up", body)
        .then(signUpSuccess)
        .catch(signUpFailure);
    }
  }


  return (
    <EnterContainer>
      <LogoHolder>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </LogoHolder>
      <LoginForm onSubmit={createAccount}>
        <form>
          <input
            type="email"
            placeholder="e-mail"
            value={createEmail}
            onChange={(e) => setCreateEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={createPassword}
            onChange={(e) => setCreatePassword(e.target.value)}
            // required
          />
          <input
            type="text"
            placeholder="username"
            value={createUsername}
            onChange={(e) => setCreateUsername(e.target.value)}
            // required
          />
          <input
            type="url"
            placeholder="picture url"
            value={createImage}
            onChange={(e) => setCreateImage(e.target.value)}
            // required
          />
          <EnterButton
            clickable={enabled}
            type="submit"
          >
            Sign Up
          </EnterButton>
        </form>
        <Link to="/">
          <p>Switch back to log in</p>
        </Link>
      </LoginForm>
    </EnterContainer>
  );
}

const EnterContainer = styled.div`
  display: flex;
  position: fixed;
  inset: 0 0 0 0;
  background-color: #333333;
  color: #ffffff;
  font-family: "Oswald", sans-serif;

  @media(max-width: 600px) {
    flex-direction: column;
  }
`;

const LogoHolder = styled.div`
  background: #151515;
  width: 62.85%;
  height: 100%;

  div {
    margin: 301px 0 0 144px;
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

  @media (max-width: 600px) {
    width: 100%;
    height: 175px;

    div {
      margin: 10px auto 27px;
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
  width: 37.15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    margin: 317px auto 0;
    display: flex;
    flex-direction: column;
  }

  input {
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    width: 429px;
    height: 65px;
    color: #9f9f9f;
    padding: 12px 17px 13px;
    margin-bottom: 13px;
    border: none;
    border-radius: 6px;
  }

  input::placeholder {
    color: #9f9f9f;
  }

  p {
    font-family: "Lato", sans-serif;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    margin-top: 22px;
  }

  a {
    color: inherit;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: unset;

    form {
      margin: 40px auto 0;
    }

    input {
      font-size: 22px;
      line-height: 33px;
      width: 330px;
      height: 55px;
      padding: 10px 17px 12px;
      margin-bottom: 11px;
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
  width: 429px;
  height: 65px;
  background: #1877f2;
  border-radius: 6px;
  border: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  color: #ffffff;
  pointer-events: ${(props) => props.clickable ? 'auto' : 'none'};
  opacity: ${(props) => props.clickable ? 1 : 0.7};

  @media (max-width: 600px) {
    width: 330px;
    height: 55px;
    font-size: 22px;
    line-height: 33px;
  }
`;

export default SignUp;