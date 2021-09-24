import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import service from "../service/post"
import UserContext from "../context/UserContext"

const TrendingBar = ({theme}) => {
    const { 
        userData
    } = useContext(UserContext)
    const history = useHistory()
    const [trendings, setTrendings] = useState([])

    useEffect(() => {
        function pickTrendings(token){
            service.getHashtags(token)
                .then(res => setTrendings(res.hashtags))
                .catch(() => alert("There was an error while getting the trending topics of the day"))
        }

        if(!localStorage.getItem("userLogin")) history.push("/")
        else if(userData.token) pickTrendings(userData.token)
    }, [userData, history])
    
    return(
        <TrendingsContainer theme = {theme}>
            <TrendingsBarTitle theme = {theme}>trending</TrendingsBarTitle>
            <HorizontalLine theme ={theme}/>
                {trendings.map(trending =>(
                    <HashtagsName theme = {theme} key = {trending.id}>
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
    background: ${props => props.theme === "light" ? "#FFFFFF" : "#171717"};
    border-radius: 16px;
    height: 456px;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
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
    color: ${props => props.theme === "light" ? "#171717" : "#FFFFFF"};
`

const HashtagsName = styled.p`
    font-family: 'Lato', sans-serif;
    color: #FAFAFA;
    overflow: hidden;
    text-overflow: ellipsis;    
    height: 25px;
    margin-left: 16px;
    font-weight: bold;
    font-size: 19px;
    color: ${props => props.theme === "light" ? "#171717" : "#FFFFFF"};
    margin-top: 10px;
`

export default TrendingBar