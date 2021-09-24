import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import UserContext from "../context/UserContext"
import service from "../service/post"
import BaseLayout from "../components/BaseLayout"
import Post from "../components/Post"
import styled from "styled-components"
import Loading from "../components/Loading";

function Hashtag() {
    const { hashtag } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    const [hashtagsPosts, setHashtagsPosts] = useState([]);
    const { userData } = useContext(UserContext);
    const [idObserver, setIdObserver] = useState(null);
    const [postsLoading, setPostsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
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
        let unmounted = false

        function renderHashtagPosts (hashtag){
            service.getHashtagsPosts(userData.token, hashtag)
                .then(res => {
                    if(!unmounted && res) {
                        setHashtagsPosts(res.posts)
                        setIsLoading(false)
                        setIdObserver(res.data.posts[res.data.posts.length - 1].repostId ?
                          res.data.posts.find((post,index) =>(index + 1 === res.data.posts.length))?.repostId :
                          res.data.posts.find((post,index) =>(index + 1 === res.data.posts.length))?.id 
                        )          
                    }
                })
                .catch(() => alert(`There was an error while finding the posts with the hashtag ${hashtag}`))
        }
        if(userData.token) {
            renderHashtagPosts(hashtag);
        }
        return () => { unmounted = true }
   }, [hashtag, userData]);

   useEffect(() => {
    function getNewPostsData() {
        setPostsLoading(true)
        service.getOlderPosts(userData.token, idObserver, `/hashtags/${hashtag}/posts`)
            .then(res => {
                setPostsLoading(false)

                if(res.data.posts.length){
                   setHasMore(true)
                } else setHasMore(false)

                setHashtagsPosts([...hashtagsPosts, ...res.data.posts])
                setIdObserver(res.data.posts[res.data.posts.length - 1].repostId ?
                    res.data.posts[res.data.posts.length - 1]?.repostId :
                    res.data.posts[res.data.posts.length - 1]?.id 
                )
            })
            .catch(() => alert("something's wrong with the server, please wait a while"))
    }
    
    if(userData.token) getNewPostsData();
  }, [pageNumber])

  return (
    <BaseLayout title={`#${hashtag}`}>
      {isLoading ? (
        <Loading spinnerSize={30} />
      ) : hashtagsPosts.length === 0 ? (
        <ErrorMessage>#{hashtag} has no posts</ErrorMessage>
      ) : (
        hashtagsPosts.map((post) => (
          <Post
            key={post.repostId ? post.repostId : post.id}
            id={post.id}
            repostId={post.repostId ? post.repostId : false}
            username={post.user.username}
            text={post.text}
            link={post.link}
            profilePic={post.user.avatar}
            prevTitle={post.linkTitle}
            prevImage={post.linkImage}
            prevDescription={post.linkDescription}
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
  );
}

const ErrorMessage = styled.h1`
  word-wrap: break-word;
  text-align: justify;
  color: #a8abb0;
  font-size: 35px;
  line-height: 45px;
  font-weight: bold;
  font-family: "Oswald", sans-serif;
  @media (max-width: 611px) {
    margin: 0 0 0 17px;
  }
`;

export default Hashtag