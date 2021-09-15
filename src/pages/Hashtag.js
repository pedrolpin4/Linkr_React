import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import { getHashtagsPosts } from "../service/auth";


function Hashtag() {
    const { hashtag } = useParams()
    const [hashtagPosts, setHashtagPosts] = useState([])
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
                setHashtagPosts([...res.data.posts])
            })
            .catch(alert(`Can't find any posts with the hashtag ${hashtag}`))
    }

   // useEffect(() => renderHashtagPosts(hashtag, config), [])

    return (
        <>
            {/*NavBar*/}
            <Ola>
                <PostsContainer>
                    <PageTitle># {hashtag}</PageTitle>
                    {hashtagPosts.map(post => (
                     //post
                     <h2>olá</h2>
                    ))}
                </PostsContainer>

                {/*sidebar*/}
            </Ola>
        </>
    )
}


const Ola = styled.div`
    width:100vw;
    height: 100vh;
    background-color: #333333;
`

const PageTitle = styled.h1`
    font-weight: bold;
    font-size: 43px;
    color: #FFFFFF;
`

const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export default Hashtag;