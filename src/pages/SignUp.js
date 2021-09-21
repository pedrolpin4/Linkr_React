import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import auth from '../service/auth';
import { EnterContainer, LogoHolder, LoginForm, EnterButton, EnterInput } from "../SharedStyles/LogInSignUp";

function SignUp() {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [enabled, setEnabled] = useState(true);

  async function createAccount (e) {
    e.preventDefault();
    setEnabled(false);

    const body = {
      email: email,
      password: password,
      username: username,
      pictureUrl: image
    }

    const response = await auth.register(body);
    if(response.sucess) {
      alert(response.message)
      setEnabled(true)
      history.push("/")
    } else {
      setEnabled(true)
      alert(response.message)
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