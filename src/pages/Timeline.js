import { useContext, useEffect, useState, useRef, useCallback } from "react";

import BaseLayout from "../components/BaseLayout";
import Loading from "../components/Loading";
import Post from '../components/Post';
import service from '../service/post';
import PostBox from "../components/PostBox";
import UserContext from "../context/UserContext";
import FeedbackMessage from '../components/FeedbackMessage';
import ThemeContext from "../context/ThemeContext";


function Timeline() {
    const { userData, following } = useContext(UserContext);
    const {theme} = useContext(ThemeContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);
    const [ newPosts, setNewPosts ] = useState(0);
    const [idObserver, setIdObserver] = useState(null);
    const [postsLoading, setPostsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(0)
    const observer = useRef()
    const { token } = userData;

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

        async function getPostsData() {
            
            const verifyNewPosts = (res) => {
                let acumulator = []
                for(let i = 0; i < 10; i++){
                    if(res.posts[i]?.repostId){
                        if(posts.every(post => post?.repostId !== res.posts[i]?.repostId)) acumulator.push(res.posts[i]) 
                        else {
                            setPosts([...acumulator, ...posts])
                            return
                        }
                    }
                    else if(!posts.some(post => post.id === res.posts[i].id)) acumulator.push(res.posts[i]) 
                    else{
                        setPosts([...acumulator, ...posts])
                        return
                    } 
                }
            }

            const response = await service.getMyFollowsPosts(token);

            if(response && !unmounted){
                if(posts.length){
                    verifyNewPosts(response)
                } else{
                    setPosts(response.posts) 
                    setIdObserver(response.posts[response.posts.length - 1]?.repostId ?
                        response.posts.find((post,index) =>(index + 1 === response.posts.length))?.repostId :
                        response.posts.find((post,index) =>(index + 1 === response.posts.length))?.id 
                    )    
                }
            } 
            else if(response === false) alert("Sorry, the server is out for lunch. Please, refresh the page to try again.")

            setIsLoading(false);
        }
        if(userData.token) getPostsData();

        return () => { unmounted = true }
    },[newPosts, userData])

    useEffect(() => {
      let interval = setInterval(() => {
        setNewPosts((prevState) => prevState + 1);
      }, 15000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    useEffect(() => {
        function getNewPostsData() {
            if(posts.length) setPostsLoading(true)
            service.getOlderPosts(token, idObserver, "/following/posts")
                .then(res => {
                    setPostsLoading(false)

                    if(res.data.posts.length === 10){
                       setHasMore(true)
                    } else setHasMore(false)

                    setPosts([...posts, ...res.data.posts])
                    setIdObserver(res.data.posts[res.data.posts.length - 1].repostId ?
                        res.data.posts[res.data.posts.length - 1]?.repostId :
                        res.data.posts[res.data.posts.length - 1]?.id 
                    )
                })
                .catch(() => {if(hasMore) alert("Something's wrong with the server, please wait a while")})
        }
        
        if(token) getNewPostsData();
    }, [pageNumber])

    return (
      <BaseLayout title="timeline">
        <PostBox setNewPosts={setNewPosts} newPosts={newPosts} theme={theme} />
        {isLoading ? (
          <Loading spinnerSize={30} />
        ) : following.length === 0 && posts.length === 0 ? (
          <FeedbackMessage text="We didn't find any posts :(" />
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

export default Timeline;