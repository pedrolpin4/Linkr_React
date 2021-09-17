import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import UserContext from "../context/UserContext"
import BaseLayout from "../components/BaseLayout";
import Post from "../components/Post";
import axios from "axios";

function UsersPosts() {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  //const { userData } = useContext(UserContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const req = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/${id}`,
      {
        headers: {
          Authorization: `Bearer 5f8eb824-09fe-4ef6-a5ed-a26dbcb1bc10`, //substituir por ${user.token}
        },
      }
    );
    req.then((resp) => {
      setUsername(resp.data.user.username);
      const req2 = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/${resp.data.user.id}/posts`,
        {
          headers: {
            Authorization: `Bearer 5f8eb824-09fe-4ef6-a5ed-a26dbcb1bc10`, //substituir por ${user.token}
          },
        }
      );
      req2.then(resp => setUserPosts(resp.data.posts));
    });
    req.catch(() => alert("An error ocurred"));
  }, []);

  return (
    <BaseLayout title={`${username}'s posts`}>
      {userPosts.map((post, index) => (
        <Post
          key={index}
          username={post.user.username}
          text={post.text}
          link={post.link}
          profilePic={post.user.avatar}
          prevTitle={post.linkTitle}
          prevImage={post.linkImage}
          prevDescription={post.linkDescription}
          likes={post.likes}
          userId={post.user.id}
        />
      ))}
    </BaseLayout>
  );
}

export default UsersPosts;
