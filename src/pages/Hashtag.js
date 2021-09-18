import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserContext from "../context/UserContext"
import service from "../service/auth"
import BaseLayout from "../components/BaseLayout"
import Post from "../components/Post"
import styled from "styled-components"

function Hashtag() {
    const { hashtag } = useParams()
    const [hashtagsPosts, setHashtagsPosts] = useState([])
    const { userData } = useContext(UserContext)
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}` 
        }
    } 

    function renderHashtagPosts (config, hashtag){
        service.getHashtagsPosts(config, hashtag)
            .then(res => {
                setHashtagsPosts([...res.data.posts])
            })
            .catch(() => alert(`There was an error while finding the posts with the hashtag ${hashtag}`))
    }

   useEffect(() => renderHashtagPosts(config, hashtag), [hashtag]);

    return (
        <BaseLayout title = {`#${hashtag}`}>
            {hashtagsPosts.length
            ?
            <>
            {hashtagsPosts.map( (post,index) => (
                <Post
                    key={post.id}
                    id = {post.id}
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
            </>
            :
            <ErrorMessage>Looks like there are no posts with the #{hashtag}</ErrorMessage>
            }
        </BaseLayout>
    )
}

const ErrorMessage = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 23px;
    word-wrap: break-word;
    text-align: justify;
`

export default Hashtag