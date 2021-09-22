import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext"
import BaseLayout from "../components/BaseLayout";
import Post from "../components/Post";
import service from "../service/post";
import Loading from "../components/Loading";
import FeedbackMessage from "../components/FeedbackMessage"

function UsersPosts() {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const { userData } = useContext(UserContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    let unmounted = false

    async function getThisUserPosts() {
      const response = await service.getUserPosts(id, userData.token);
      if(response && !unmounted) {
        setUserPosts(response.posts);
        setUsername(response.posts[0].user.username)
      }

      else if(response === false) alert("The birds are eating our comunications lines, sorry.")
      setIsLoading(false);
    }
    if(userData.token) getThisUserPosts();

    return () => { unmounted = true }
  }, [userData, id])

  return (
    <BaseLayout title={`${username}'s posts`}>{
      isLoading
        ? <Loading spinnerSize={30}/>
        : userPosts.length === 0
          ? <FeedbackMessage text="Bip Bop, this user has no posts" />
          : userPosts.map(post => <Post key={post.id}
                                        username={post.user.username}
                                        text={post.text}
                                        link={post.link}
                                        profilePic={post.user.avatar}
                                        prevTitle={post.linkTitle}
                                        prevImage={post.linkImage}
                                        prevDescription={post.linkDescription}
                                        id = {post.id}
                                        likes={post.likes}
                                        userId={post.user.id}
                                        repostCount={post.repostCount} />)}
    </BaseLayout>
  );
}

export default UsersPosts;
