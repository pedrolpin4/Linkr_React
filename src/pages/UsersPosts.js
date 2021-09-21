import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import BaseLayout from "../components/BaseLayout";
import Post from "../components/Post";
import service from "../service/auth";
import Loading from "../components/Loading";
import FeedbackMessage from "../components/FeedbackMessage";
import styled from "styled-components";
import axios from "axios";
//import { AiFillSketchCircle } from "react-icons/ai";

function UsersPosts() {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [btn, setBtn] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let unmounted = false;
    async function getThisUserPosts() {
      const response = await service.getUserPosts(id, userData.token);
      if (response && !unmounted) {
        setUserPosts(response.posts);
        setUsername(response.posts[0].user.username);
      } else if (response === false)
        alert("The birds are eating our comunications lines, sorry.");
      setIsLoading(false);
    }
    if (userData.token) {
      getThisUserPosts();
      const req = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/follows",
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      req.then((resp) => {
        setBtn(resp.data.users.some(i => i.id == id));
      });
      req.catch((error) => alert("The birds are eating our comunications lines, sorry."));
    }

    return () => {
      unmounted = true;
    };
  }, [userData, id]);

  function toFollowUser() {
    setClicked(true);
    const { token } = userData;
    const req = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/${id}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    req.then((resp) => {
      setBtn(true);
      setClicked(false);
    });
    req.catch((error) => {
      alert("Error when trying to follow the user");
      setClicked(false);
    });
  }

  function toUnfollowUser() {
    setClicked(true);
    const { token } = userData;
    const req = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/${id}/unfollow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    req.then((resp) => {
      setBtn(false);
      setClicked(false);
    });
    req.catch((error) => {
      alert("Error when trying to unfollow the user");
      setClicked(false);
    });
  }

  return (
    <>
      {userData.user?.username === username ? (
        ""
      ) : (
        <FollowButton
          follow={btn}
          onClick={() => (btn ? toUnfollowUser() : toFollowUser())}
          disabled={clicked}
        >
          {btn ? "Unfollow" : "Follow"}
        </FollowButton>
      )}
      <BaseLayout title={`${username}'s posts`}>
        {isLoading ? (
          <Loading spinnerSize={30} />
        ) : userPosts.length === 0 ? (
          <FeedbackMessage text="Bip Bop, this user has no posts" />
        ) : (
          userPosts.map((post) => (
            <Post
              key={post.id}
              username={post.user.username}
              text={post.text}
              link={post.link}
              profilePic={post.user.avatar}
              prevTitle={post.linkTitle}
              prevImage={post.linkImage}
              prevDescription={post.linkDescription}
              id={post.id}
              likes={post.likes}
              userId={post.user.id}
            />
          ))
        )}
      </BaseLayout>
    </>
  );
}

export default UsersPosts;

const FollowButton = styled.button`
  width: 112px;
  height: 31px;
  background-color: ${(props) => (props.follow ? "#FFF" : "#1877f2")};
  border-radius: 5px;
  border: none;
  color: ${(props) => (props.follow ? "#1877f2" : "#fff")};
  position: relative;
  top: 180px;
  left: 72%;
  font-family: Lato;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
`;
