import { useState, useEffect, useContext, useRef, useCallback } from 'react';

import UserContext from '../context/UserContext';
import BaseLayout from '../components/BaseLayout';
import Loading from '../components/Loading';
import Post from '../components/Post';
import service from '../service/post';
import FeedbackMessage from '../components/FeedbackMessage';

function MyLikes() {
    const { userData } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);
    const [ newPosts, setNewPosts ] = useState(0);
    const [idObserver, setIdObserver] = useState(null);
    const [postsLoading, setPostsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(0)
    const observer = useRef()

    const lastPost = null


  useEffect(() => {
      let unmounted = false;

      async function getLikedPosts() {
          const response = await service.getLikedPosts(userData.token);

          if(response && !unmounted) {
              setPosts(response.posts)
              setIsLoading(false)
          }
          else if(response === false) alert("Hoje é feriado ná terra dos servidores, te respondemos amanhã!");
      }

      if(userData.token) getLikedPosts();
      return () => { unmounted = true }
  }, [userData, newPosts])

  return (
    <BaseLayout title="my likes">
      {isLoading ? (
        <Loading spinnerSize={30} />
      ) : posts.length === 0 ? (
        <FeedbackMessage />
      ) : (
        posts.map((post) => (
          <Post
            key={post.repostId ? post.repostId : post.id}
            username={post.user.username}
            text={post.text}
            link={post.link}
            profilePic={post.user.avatar}
            prevTitle={post.linkTitle}
            prevImage={post.linkImage}
            prevDescription={post.linkDescription}
            likes={post.likes}
            userId={post.user.id}
            id={post.id}
            repostId={post.repostId ? post.repostId : false}
            setNewPosts={setNewPosts}
            newPosts={newPosts}
            repostCount={post.repostCount}
            repostedByUser={post.repostedBy?.username}
            repostedUserId={post.repostedBy?.id}
            idObserver = {idObserver}
            lastPost = {lastPost}
          />
        ))
      )}
    </BaseLayout>
  );
}

export default MyLikes;

