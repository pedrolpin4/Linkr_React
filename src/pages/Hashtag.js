import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import { getHashtagsPosts } from "../service/auth";


function Hashtag() {
    const { hashtag } = useParams()
    const [hashtagsPosts, setHashtagsPosts] = useState([])
    const { userData } = useContext(UserContext)
    
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}` 
        }
    }

    function renderHashtagPosts (hashtag, config){
        getHashtagsPosts(hashtag, config)
            .then(res => {
                console.log(res.data);
                setHashtagsPosts([...res.data.posts])
            })
            .catch(alert(`Can't find any posts with the hashtag ${hashtag}`))
    }

    useEffect(() => renderHashtagPosts(hashtag, config), [])

    return (
        <>
            {/*NavBar*/}

            <PageTitle># {hashtag}</PageTitle>

            <PostsContainer>
                {/* hashtagsPosts.map(post => (
                   // post
                )) */}
            </PostsContainer>

            {/*sidebar*/}
        </>
    )
}

const PageTitle = styled.h1`
    font-weight: bold;
    font-size: 43px;
    color: #FFFFFF;
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export default Hashtag;