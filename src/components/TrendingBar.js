import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getHashtags } from "../service/auth"
import UserContext from "../context/UserContext"

const TrendingBar = () => {
    const { 
        userData
    } = useContext(UserContext)
    const [trendings, setTrendings] = useState([])
    
    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}` 
        }
    }

    function pickTrendings(config){
        getHashtags(config)
            .then(res => setTrendings([...res.data.hashtags]))
            .catch(res => alert("There was an error while getting the trending topics of the day"))
    }

    useEffect(() => pickTrendings(config), [])
    return(
        <TrendingsContainer>
            <TrendingsBarTitle>trending</TrendingsBarTitle>
            <HorizontalLine />
                {trendings.map(trending =>(
                    <HashtagsName key = {trending.id}>
                        <Link to = {`/hashtag/${trending.name}`}>
                            # {trending.name}                     
                        </Link>    
                    </HashtagsName>
                ))}
        </TrendingsContainer>
    )
}

const TrendingsContainer = styled.div`
    margin-top: 232px;
    padding: 9px 0px 30px 0px;
    width: 301px;
    background: #171717;
    border-radius: 16px;
    @media (max-width: 1000px){
        display: none;
    }
`

const HorizontalLine = styled.div`
    margin: 12px 0px 22px 0px;
    width: 301px;
    border: 1px solid #484848;
`

const TrendingsBarTitle = styled.h1`
    font-family: 'Oswald', sans-serif;
    margin-left: 16px ;
    font-weight: bold;
    font-size: 27px;
    color: #FFFFFF;
`

const HashtagsName = styled.p`
    font-family: 'Lato', sans-serif;
    color: #FAFAFA;
    margin-left: 16px;
    font-weight: bold;
    font-size: 19px;
    color: #FFFFFF;
    margin-top: 10px;
`

export default TrendingBar