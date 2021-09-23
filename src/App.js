import { BrowserRouter as Router,
         Switch,
         Route } from "react-router-dom";
import { useState, useEffect } from "react";

import UserContext from "./context/UserContext";
import Hashtag from './pages/Hashtag';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyLikes from "./pages/MyLikes";
import MyPosts from "./pages/MyPosts";
import Timeline from "./pages/Timeline";
import UsersPosts from "./pages/UsersPosts";
import BaseLayout from "./components/BaseLayout";
import SearchBox from "./components/SearchBox"; //tirar depois

function App() {
  const [ userData, setUserData ] = useState({});

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    if(userLogin) setUserData(userLogin);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/timeline" component={Timeline} />
          <Route exact path="/my-posts" component={MyPosts} />
          <Route exact path="/user/:id" component={UsersPosts} />
          <Route exact path="/hashtag/:hashtag" component={Hashtag} />
          <Route exact path="/my-likes" component={MyLikes} />
          <Route exact path="/baselayout" component={() => <BaseLayout title="teste" trends={[{name: "yoyooo"}]}><p>oiee</p></BaseLayout>} />
          <Route exact path="/searchbox" component={SearchBox} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
