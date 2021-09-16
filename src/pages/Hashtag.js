import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserContext from "../context/UserContext"
import { getHashtagsPosts } from "../service/auth"
import BaseLayout from "../components/BaseLayout"

function Hashtag() {
    const testToken = "09622c1e-d975-46a4-8b15-14063223e383"
    const { hashtag } = useParams()
    const [hashtagsPosts, setHashtagsPosts] = useState([])
    const { userData } = useContext(UserContext)
    
    const config = {
        headers: {
            "Authorization": `Bearer ${testToken}` 
        }
    }

    function renderHashtagPosts (config, hashtag){
        getHashtagsPosts(config, hashtag)
            .then(res => {
                setHashtagsPosts([...res.data.posts])
            })
            .catch(() => alert(`There was an error while finding the posts with the hashtag ${hashtag}`))
    }

   useEffect(() => renderHashtagPosts(config, hashtag), [])

    function HashtagsChildren() {
       return (
        <>
            {hashtagsPosts.map( post => <h1 key = {post.id}>{post.text}</h1>)}
            {/* substituir pelos psts passando o parãmetro post*/}
        </>
        )
    }

    return (
        <BaseLayout children = {<HashtagsChildren/>} title = {`# ${hashtag}`} />
    )
}

export default Hashtag;