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

function Login() {
  const history = useHistory();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [enabled, setEnabled] = useState(true);

  const { setUserData, userData } = useContext(UserContext);

  useEffect(() => {
    if(userData.token) {
      history.push("/timeline")
    }
  }, [userData, history]);

  function logInSuccess(response) {
    if (response.status === 200 || response.status === 201) {
      setUserData(response.data);
      localStorage.setItem("userLogin", JSON.stringify(response.data));
      history.push("/timeline");
    }
  }

  function logInFailure(response) {
    if (response.response.status === 403) {
      alert(
        "Invalid e-mail and/or password. Please, check the fields and try again."
      );
    } else {
      alert("Something went wrong. Please, check the fields and try again.");
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
