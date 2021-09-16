import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
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

  function logInSuccess(response) {
    // if (response.status === 200 || response.status === 201) {
    //   alert(
    //     "You account has been logind! Now you only need to log in to start having fun! :D"
    //   );
    //   setEnabled(true);
    //   setloginEmail("");
    //   setloginPassword("");
    //   // history.push("/");
    // }
  }

  function logInFailure(response) {
    // if (response.response.status === 403) {
    //   alert(
    //     "This e-mail has already been used to create an account. Please, log in or try to use another e-mail address."
    //   );
    // } else {
    //   alert("Something went wrong. Please, check the fields and try again.");
    // }
    // setEnabled(true);
  }

  function logIntoAccount(e) {
    // e.preventDefault();
    // setEnabled(false);

    // const body = {
    //   email: loginEmail,
    //   password: loginPassword
    // };

    // if (loginEmail === "" || loginPassword === "") {
    //   alert("Please, fill out the fields below.");
    // } else {
    //   API.post("/sign-in", body).then(signUpSuccess).catch(signUpFailure);
    // }
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
