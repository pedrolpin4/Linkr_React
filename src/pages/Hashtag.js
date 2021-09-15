import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import {getHashtagsPosts} from "../service/auth"
import TrendingBar from "../components/TrendingBar"

function Hashtag() {
    const testToken = "09622c1e-d975-46a4-8b15-14063223e383"
    const { hashtag } = useParams()
    const [hashtagPosts, setHashtagPosts] = useState([])
    // const { userData } = useContext(UserContext)
    
    const config = {
        headers: {
            "Authorization": `Bearer ${testToken}` 
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

    return (
        <>
            <PageTitle># {hashtag}</PageTitle>
            {hashtagPosts.map(post => (
                <h2>olá</h2>
            ))}
            <TrendingBar />
        </>
    )
}

const PageTitle = styled.h1`

`

export default Hashtag;