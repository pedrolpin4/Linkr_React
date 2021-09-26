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
            postData={post}
            repostId={post.repostId ? post.repostId : false}
            setNewPosts={setNewPosts}
            newPosts={newPosts}
            repostCount={post.repostCount}
            repostedByUser={post.repostedBy?.username}
            repostedUserId={post.repostedBy?.id}
            lastPost={lastPost}
            geoLocation={post.geolocation}
          />
        ))
      )}
    </BaseLayout>
  );
}

export default MyLikes;

