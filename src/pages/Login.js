import { Link, useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import auth from '../service/auth';
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

  async function logIntoAccount(e) {
    e.preventDefault();
    setEnabled(false);

    const body = {
      email: loginEmail,
      password: loginPassword,
    };

    const response = await auth.login(body);
    if(response.sucess) {
      setUserData(response.data);
      localStorage.setItem("userLogin", JSON.stringify(response.data));
      history.push("/timeline");
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
      <LoginForm>
        <div>
          <form onSubmit={logIntoAccount}>
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
