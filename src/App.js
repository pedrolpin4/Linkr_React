import { Switch,
         Route,
         useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';

import UserContext from "./context/UserContext";
import Hashtag from './pages/Hashtag';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyLikes from "./pages/MyLikes";
import MyPosts from "./pages/MyPosts";
import Timeline from "./pages/Timeline";
import UsersPosts from "./pages/UsersPosts";
import service from "./service/post";

function App() {
  const [ userData, setUserData ] = useState({});
  const [ following, setFollowing ] = useState([]);


  const location = useLocation();
  console.log(location)

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    if(userLogin) setUserData(userLogin);
  }, []);

  useEffect(() => {
    if(userData.token) {
      updateFollowsList(userData.token)
    }
  }, [userData])

  /**
   * @author Yohan L. 
   * This function requires a updated list of user's following profiles and stores it in a local state
   * @param {string} token the user.token provided by userData
   * @return {Promise} resolves to the updated data or false in case of failure
   */
  async function updateFollowsList(token) {
    const response = await service.getMyFollows(token);
    if(response) {
      setFollowing(response.users);
      return response;
    }
    return false;
  }

  /**
   * @author Yohan L. 
   * This function search for a correspondent user in following list
   * @param {Number} userId the user.id that should be searched
   * @return  if userId match any following user, returns the respective user data, returns false otherwise
   */
  function searchUserInFollowing(userId) {
    return following.find(element => element.id === userId);
  }


  const variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 1.5
      }
    },
    exit: {
      x:"-100vw",
      transition: {
        ease: "easeInOut"
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        updateFollowsList,
        following,
        searchUserInFollowing
      }}
    >
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location}>
          <Route exact path="/" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />


          <Route exact path="/timeline" /* component={Timeline} */ >
              <Timeline />
          </Route>
          <Route exact path="/my-posts" /* component={MyPosts} */>
                <MyPosts />

          </Route>
          <Route exact path="/user/:id" /* component={UsersPosts} */ >
                <UsersPosts />

          </Route>
          <Route exact path="/hashtag/:hashtag"/*  component={Hashtag} */ >
                <Hashtag />

          </Route>
          <Route exact path="/my-likes" /* component={MyLikes} */ >
                <MyLikes />

          </Route>
        </Switch>
      </AnimatePresence>
    </UserContext.Provider>
  );
}



export default App;
