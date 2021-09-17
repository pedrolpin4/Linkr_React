import { AnimatePresence } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { API } from "../service/auth";
import {
  EnterContainer,
  LogoHolder,
  LoginForm,
  EnterButton,
  EnterInput,
} from "../SharedStyles/LogInSignUp";
import Modal from "../components/Modal";

function Login({ userLogin }) {
  const history = useHistory();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [enabled, setEnabled] = useState(true);

  const [ modal, setModal ] = useState({
    shouldRender: false,
    text: ""
  });

  const { setUserData } = useContext(UserContext);

  const checkRedirection = (userLogin) => {
    if (userLogin) {
      history.push("/timeline");
    }
  };

  useEffect(() => checkRedirection(userLogin), []);

  function closeModal() {
    setModal({shouldRender: false, text: ""})
  }

  function openModal(text) {
    setModal({shouldRender: true, text: text})
  }

  function logInSuccess(response) {
    if (response.status === 200 || response.status === 201) {
      setUserData(response.data);
      localStorage.setItem("userLogin", JSON.stringify(response.data));
      history.push("/timeline");
      setEnabled(true);
      setloginEmail("");
      setloginPassword("");
    }
  }

  function logInFailure(response) {
    if (response.response.status === 403) {
      setModal({
        shouldRender: true,
        text: "Invalid e-mail and/or password. Please, check the fields and try again."
      })
/*       alert(
        "Invalid e-mail and/or password. Please, check the fields and try again."
      ); */
    } else {
      setModal({
        shouldRender: true,
        text: "Something went wrong. Please, check the fields and try again."
      })
      /* alert("Something went wrong. Please, check the fields and try again."); */
    }
    setEnabled(true);
  }

  function logIntoAccount(e) {
    e.preventDefault();
    setEnabled(false);

    const body = {
      email: loginEmail,
      password: loginPassword,
    };

    if (loginEmail === "" || loginPassword === "") {
      alert("Please, fill out the fields below.");
      setEnabled(true);
    } else {
      API.post("/sign-in", body).then(logInSuccess).catch(logInFailure);
    }
  }

  return (
    <EnterContainer>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
      >
        {modal.shouldRender && <Modal handleClose={closeModal}><p>{modal.text}</p></Modal>}
      </AnimatePresence>

      <LogoHolder>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </LogoHolder>
      <LoginForm onSubmit={logIntoAccount}>
        <div>
          <form>
            <EnterInput
              type="email"
              placeholder="e-mail"
              value={loginEmail}
              onChange={(e) => setloginEmail(e.target.value)}
              clickable={enabled}
            />
            <EnterInput
              type="password"
              placeholder="password"
              value={loginPassword}
              onChange={(e) => setloginPassword(e.target.value)}
              clickable={enabled}
            />
            <EnterButton clickable={enabled} type="submit">
              Log In
            </EnterButton>
          </form>
          <Link to="/sign-up">
            <p>First time? Create an account!</p>
          </Link>
        </div>
      </LoginForm>
    </EnterContainer>
  );
}

export default Login;
