import { BrowserRouter as Router,
         Switch,
         Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./context/UserContext";
import Hashtag from './pages/Hashtag';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyLikes from "./pages/MyLikes";
import MyPosts from "./pages/MyPosts";
import Timeline from "./pages/Timeline";
import UsersPosts from "./pages/UsersPosts";

function App() {
  const [ userData, setUserData ] = useState({});

  return (
    <UserContext.Provider value={{
      userData,
      setUserData
    }}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/timeline" component={Timeline}/>
          <Route exact path="/myposts" component={MyPosts}/>
          <Route exact path="/usersposts" component={UsersPosts}/>
          <Route exact path="/hashtag" component={Hashtag}/>
          <Route exact path="/mylikes" component={MyLikes}/>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
