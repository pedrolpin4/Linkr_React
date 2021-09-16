import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import service from "../service/auth"
import UserContext from "../context/UserContext"

const TrendingBar = () => {
    const { 
        userData
    } = useContext(UserContext)
    const [trendings, setTrendings] = useState([])
    const testToken = "5f8eb824-09fe-4ef6-a5ed-a26dbcb1bc10"


    function pickTrendings(config){
        service.getHashtags(config)
            .then(res => setTrendings([...res.data.hashtags]))
            .catch(res => alert("There was an error while getting the trending topics of the day"))
    }

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${testToken}` 
            }
        }

        pickTrendings(config)
    }, [userData])
    
    return(
        <TrendingsContainer>
            <TrendingsBarTitle>trending</TrendingsBarTitle>
            <HorizontalLine />
                {trendings.map(trending =>(
                    <HashtagsName key = {trending.id}>
                        <Link to = {`/hashtag/${trending.name}`}>
                            #{trending.name}                     
                        </Link>    
                    </HashtagsName>
                ))}
        </TrendingsContainer>
    )
}

const TrendingsContainer = styled.div`
    margin-top: 232px;
    padding: 15px 0px 30px 0px;
    width: 301px;
    background: #171717;
    border-radius: 16px;
    height: 406px;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
    word-wrap: nowrap;
    overflow-x: hidden;
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
    word-break: keep-all;
    height: 25px;
    margin-left: 16px;
    font-weight: bold;
    font-size: 19px;
    color: #FFFFFF;
    margin-top: 10px;
`

export default TrendingBar