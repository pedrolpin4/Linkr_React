import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { API } from "../service/auth";
import { EnterContainer, LogoHolder, LoginForm, EnterButton, EnterInput } from "../SharedStyles/LogInSignUp";

function SignUp() {

  const history = useHistory();
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createUsername, setCreateUsername] = useState("");
  const [createImage, setCreateImage] = useState("");
  const [enabled, setEnabled] = useState(true);

  function signUpSuccess(response) {
    if (response.status === 200 || response.status === 201) {
      alert(
        "You account has been created! Now you only need to log in to start having fun! :D"
      );
      setEnabled(true);
      setCreateEmail("");
      setCreatePassword("");
      setCreateUsername("");
      setCreateImage("");
      history.push("/");
    }
  }

  function signUpFailure(response) {
    if (response.response.status === 403) {
      alert("This e-mail has already been used to create an account. Please, log in or try to use another e-mail address.");
    } else {
      alert("Something went wrong. Please, check the fields and try again.");
    }
    setEnabled(true);
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
      setEnabled(true);
    } else {
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
        <div>
          <form>
            <EnterInput
              type="email"
              placeholder="e-mail"
              value={createEmail}
              onChange={(e) => setCreateEmail(e.target.value)}
              clickable={enabled}
            />
            <EnterInput
              type="password"
              placeholder="password"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
              clickable={enabled}
            />
            <EnterInput
              type="text"
              placeholder="username"
              value={createUsername}
              onChange={(e) => setCreateUsername(e.target.value)}
              clickable={enabled}
            />
            <EnterInput
              type="url"
              placeholder="picture url"
              value={createImage}
              onChange={(e) => setCreateImage(e.target.value)}
              clickable={enabled}
            />
            <EnterButton clickable={enabled} type="submit">
              Sign Up
            </EnterButton>
          </form>
          <Link to="/">
            <p>Switch back to log in</p>
          </Link>
        </div>
      </LoginForm>
    </EnterContainer>
  );
}

export default SignUp;