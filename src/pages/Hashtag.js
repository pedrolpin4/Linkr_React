import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserContext from "../context/UserContext"
import Service from "../service/auth"
import BaseLayout from "../components/BaseLayout"

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
        Service.getHashtagsPosts(config, hashtag)
            .then(res => {
                setHashtagsPosts([...res.data.posts])
            })
            .catch(() => alert(`There was an error while finding the posts with the hashtag ${hashtag}`))
    }

   useEffect(() => renderHashtagPosts(config, hashtag), [])

    return (
        <BaseLayout title = {`# ${hashtag}`}>
            {hashtagsPosts.map( post => <h1 key = {post.id}>{post.text}</h1>)}
            {/* substituir pelos posts passando como parâmetro "post"*/}
        </BaseLayout>
    )
}

export default Hashtag;