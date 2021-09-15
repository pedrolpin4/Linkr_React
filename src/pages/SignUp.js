import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <EnterContainer>
      <LogoHolder>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </LogoHolder>
      <LoginForm>
        <form>
          <input type="email" placeholder="e-mail" />
          <input type="password" placeholder="password" />
          <input type="text" placeholder="username" />
          <input type="url" placeholder="picture url" />
          <button>Sign Up</button>
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

  button {
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
`;

export default SignUp;