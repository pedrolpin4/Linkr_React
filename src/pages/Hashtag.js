import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import UserContext from "../context/UserContext"
import { getHashtagsPosts } from "../service/auth"
import TrendingBar from "../components/TrendingBar"

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

    return (
        <>
            {/*navbar*/}
            <PageTitle># {hashtag}</PageTitle>
            {hashtagPosts.map(post => (
                //post
                <h1>Me apague</h1>
            ))}
            <TrendingBar />
        </>
    )
}

const PageTitle = styled.h1`

`

// está faltando só encaixar no basic layout que o Yohan está fazendo

export default Hashtag;