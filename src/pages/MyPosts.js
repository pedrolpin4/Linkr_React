import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import BaseLayout from "../components/BaseLayout";
import Loading from "../components/Loading";
import Post from '../components/Post';
import service from '../service/post';
import FeedbackMessage from '../components/FeedbackMessage';



function MyPosts() {
    const [ posts, setPosts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const { userData } = useContext(UserContext);
    const [ newPosts, setNewPosts ] = useState(0);

    useEffect(() => {
        let unmounted = false;
        const { token, user } = userData;

        async function getPosts() {
            const response = await service.getMyPosts(token, user.id);

            if(response && !unmounted) setPosts(response.posts);
            else alert("Desculpe, nossas rotas estão engarrafadas no momento :(")
            setIsLoading(false);
        }
        if(userData.token) getPosts();
        return () => { unmounted = true };
    }, [userData, newPosts])
    
    return (
      <BaseLayout title="my posts">
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
              geoLocation={post.geolocation}
            />
          ))
        )}
      </BaseLayout>
    );
}

export default MyPosts;