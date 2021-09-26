import { useState, useEffect, useContext, useRef, useCallback } from 'react';
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
  const [idObserver, setIdObserver] = useState(null);
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
    const { token, user } = userData;

    async function getPosts() {
        const response = await service.getMyPosts(token, user.id);

        if(response && !unmounted){
          setPosts(response.posts);
          setIdObserver(response.posts[response.posts.length - 1]?.repostId ?
            response.posts.find((post,index) =>(index + 1 === response.posts.length))?.repostId :
            response.posts.find((post,index) =>(index + 1 === response.posts.length))?.id 
          )
        } 
        else alert("Sorry, the servers are jammed at the moment. Please, refresh the page and try again.")
        setIsLoading(false);
    }
    if(userData.token) getPosts();
    return () => { unmounted = true };
  }, [userData, newPosts])

  useEffect(() => {
    function getNewPostsData() {
      if(posts.length) setPostsLoading(true)
      service.getOlderPosts(userData.token, idObserver, `/users/${userData.user.id}/posts`)
        .then(res => {
          setPostsLoading(false)

          if(res.data.posts.length === 10){
            setHasMore(true)
          } else setHasMore(false)

          setPosts([...posts, ...res.data.posts])
          setIdObserver(res.data.posts[res.data.posts.length - 1]?.repostId ?
            res.data.posts[res.data.posts.length - 1]?.repostId :
            res.data.posts[res.data.posts.length - 1]?.id 
          )
        })
        .catch(() => {if(hasMore) alert("Something's wrong with the server, please wait a while")})
    }
    
    if(userData.token) getNewPostsData();
  }, [pageNumber])

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
            idObserver={idObserver}
            lastPost={lastPost}
            geoLocation={post.geolocation}
          />
        ))
      )}
      {postsLoading ? <Loading spinnerSize={50} /> : <></>}
    </BaseLayout>
  );
}

export default MyPosts;