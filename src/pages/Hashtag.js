import { useContext, useEffect, useState } from "react"
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
    
    
    useEffect(() => {
        let unmounted = false

        function renderHashtagPosts (hashtag){
            service.getHashtagsPosts(userData.token, hashtag)
                .then(res => {
                    if(!unmounted && res) {
                        setHashtagsPosts(res.posts)
                        setIsLoading(false)
                    }
                })
                .catch(() => alert(`There was an error while finding the posts with the hashtag ${hashtag}`))
        }
        if(userData.token) {
            renderHashtagPosts(hashtag);
        }
        return () => { unmounted = true }
   }, [hashtag, userData]);

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
              postData={post}
              repostId={post.repostId ? post.repostId : false}
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