import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import UserContext from "../context/UserContext"
import { getHashtagsPosts } from "../service/auth"
import BaseLayout from "../components/BaseLayout"

function Hashtag() {
    const { hashtag } = useParams()
    const [hashtagPosts, setHashtagPosts] = useState([])
    const { userData } = useContext(UserContext)
    
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}` 
        }
    }

    function renderHashtagPosts (config, hashtag){
        getHashtagsPosts(config, hashtag)
            .then(res => {
                setHashtagPosts([...res.data.posts])
            })
            .catch(() => alert(`There was an error while finding the posts with the hashtag ${hashtag}`))
    }

   useEffect(() => renderHashtagPosts(config, hashtag), [])

    const children = () => {
        return (<h1>oi</h1>)
    }

    return (
       <BaseLayout children = {children} title = {`# ${hashtag}`} />
    )
}

export default Hashtag;