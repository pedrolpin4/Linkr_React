import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import BaseLayout from "../components/BaseLayout";
import Post from "../components/Post";
import service from "../service/post";
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
  const [followButton, setFollowButton] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [idObserver, setIdObserver] = useState(Infinity);
  const [postsLoading, setPostsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(0)
  const observer = useRef() 
  
  const lastPost = useCallback(node => {
    if(postsLoading) return
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting && hasMore){
            setPageNumber(prev => prev + 1)
        } 
    })
    if(node) observer.current.observe(node)
  }, [postsLoading, hasMore])


  useEffect(() => {
    let unmounted = false;
    async function getThisUserPosts() {
      const response = await service.getUserPosts(id, userData.token);
      if (response && !unmounted) {
        setUserPosts(response.posts);
        setUsername(response.posts[0].repostedBy ? response.posts[0].repostedBy.username : response.posts[0].user.username);
        setIdObserver(response.posts[response.posts.length - 1].repostId ?
          response.posts.find((post,index) =>(index + 1 === response.posts.length))?.repostId :
          response.posts.find((post,index) =>(index + 1 === response.posts.length))?.id 
        )
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
        setFollowButton(resp.data.users.some(i => i.id === `${id}`));
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
      setFollowButton(true);
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
      setFollowButton(false);
      setClicked(false);
    });
    req.catch((error) => {
      alert("Error when trying to unfollow the user");
      setClicked(false);
    });
  }

  useEffect(() => {
    function getNewPostsData() {
      if(userPosts.length) setPostsLoading(true)
      service.getOlderPosts(userData.token, idObserver, `/users/${id}/posts`)
        .then(res => {
            console.log(res.data.posts)
            setPostsLoading(false)

            if(res.data.posts.length === 10){
                setHasMore(true)
            } else setHasMore(false)

            setUserPosts([...userPosts, ...res.data.posts])
            setIdObserver(res.data.posts[res.data.posts.length - 1].repostId ?
                res.data.posts[res.data.posts.length - 1]?.repostId :
                res.data.posts[res.data.posts.length - 1]?.id 
            )
        })
        .catch(() => {if(hasMore) alert("something's wrong with the server, please wait a while")})
    }
    
    if(userData.token) getNewPostsData();
  }, [pageNumber])

  return (
    <>
      {userData.user?.username === username ? (
        ""
      ) : (
        <FollowButton
          follow={followButton}
          onClick={() => (followButton ? toUnfollowUser() : toFollowUser())}
          disabled={clicked}
        >
          {followButton ? "Unfollow" : "Follow"}
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
              key={post.repostId ? post.repostId : post.id}
              username={post.user.username}
              text={post.text}
              link={post.link}
              profilePic={post.user.avatar}
              prevTitle={post.linkTitle}
              prevImage={post.linkImage}
              prevDescription={post.linkDescription}
              id={post.id}
              repostId={post.repostId ? post.repostId : false}
              likes={post.likes}
              userId={post.user.id}
              repostCount={post.repostCount}
              repostedByUser={post.repostedBy?.username}
              repostedUserId={post.repostedBy?.id}
              idObserver = {idObserver}
              lastPost = {lastPost}
            />
          ))
        )}
        {postsLoading ? <Loading spinnerSize={50} /> : <></> }
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
