import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { API } from "../service/auth";
import { EnterContainer, LogoHolder, LoginForm, EnterButton, EnterInput } from "../SharedStyles/LogInSignUp";

function SignUp() {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [enabled, setEnabled] = useState(true);

  function signUpSuccess(response) {
    if (response.status === 200 || response.status === 201) {
      alert(
        "You account has been created! Now you only need to log in to start having fun! :D"
      );
      setEnabled(true);
      setEmail("");
      setPassword("");
      setUsername("");
      setImage("");
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
      email: email,
      password: password,
      username: username,
      pictureUrl: image
    }
    
    if (email === "" || password === "" || username === "" || image === "") {
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              clickable={enabled}
            />
            <EnterInput
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              clickable={enabled}
            />
            <EnterInput
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              clickable={enabled}
            />
            <EnterInput
              type="url"
              placeholder="picture url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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