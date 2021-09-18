import { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import service from "../service/auth"; 
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import UserContext from "../context/UserContext";

export default function LikesComponent ( {likes, id}) {
    const{userData} = useContext(UserContext)
    const [likesArray, setLikesArray] = useState([...likes])
    const [ isLiked, setIsLiked ] = useState(likesArray.some(like => like.userId === userData.user.id))
    const [numberOfLikes, setNumberOfLikes] = useState(likes.length);
    const [ tooltipContent, setTooltipContent ] = useState("");

    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}` 
        }
    } 

    function likePost(config, id) {
        service.postingLikes(config, id)
            .then(res => {
                setIsLiked(true)
                setNumberOfLikes(numberOfLikes + 1)
                setLikesArray([...res.data.post.likes])
                updateTooltipContent("userId", "username", true, res.data.post.likes, numberOfLikes + 1)
            })
    }

    function unLikePost(config, id){
        service.deletingLikes(config, id)
            .then(res => {
                setIsLiked(false)
                setNumberOfLikes(numberOfLikes - 1)
                setLikesArray([...res.data.post.likes])
                updateTooltipContent("userId", "username", false, res.data.post.likes, numberOfLikes - 1)
            })
    }

    function updateTooltipContent(id, name, liked = isLiked, likesList = likesArray, nLikes = numberOfLikes){
        liked
        ?
        setTooltipContent(
            nLikes === 1
            ?
            "You're the first to like it"
            :
                nLikes === 2
                ? 
                    likesList.findIndex(like => like[id] === userData.user.id)
                    ? 
                    `You and ${likesList[0][name]} liked it` 
                    : 
                    `You and ${likesList[1][name]} liked it`
                :
                    likesList.findIndex(like => like[id] === userData.user.id) 
                    ? 
                    `You, ${likesList[0][name]} and ${nLikes-2} other people` 
                    : 
                    `You, ${likesList[1][name]} and ${nLikes-2} other people`
            )
        :
        setTooltipContent(
            nLikes
            ? 
                nLikes === 1 
                ?
                `${likesList[0][name]} liked it` 
                : 
                    nLikes === 2 
                    ? 
                    `${likesList[0][name]} and ${likesList[1][name]} liked it` 
                    : 
                    `${likesList[0][name]}, ${likesList[1][name]} and ${nLikes-2} other people` 
            : 
            "Be the first to like it"
        )
    }

    useEffect(() => updateTooltipContent("user.id", "user.username"), [])

    return (
        <>
            {
                isLiked 
                ? 
                <AiFillHeart  onClick = {() => unLikePost(config, id)} color="#ff0000" size={25} /> 
                : 
                <AiOutlineHeart onClick = {() => likePost(config, id)} color="#fff" size={25} />
            }
        
            <Tippy content = {tooltipContent} placement = "bottom">
                <p className="likes">
                    {`${numberOfLikes} ${numberOfLikes === 1 ? "like" : "likes"}`}
                </p>
            </Tippy>
        </>
    )
}
 
