import { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import service from "../service/auth"; 
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import UserContext from "../context/UserContext";

export default function LikesComponent ( { likes, id}) {
    const{
        userData
    } = useContext(UserContext)

    const [ isLiked, setIsLiked ] = useState(likes.some(like => like.userId === userData.id));
    const [numberOfLikes, setNumberOfLikes] = useState(likes.length);

    const [ tooltipContent, setTooltipContent ] = useState("");

    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}` 
        }
    } 

    function likePost(config, id) {
        service.postingLikes(config, id)
            .then(() => {
                setIsLiked(true)
                setNumberOfLikes(numberOfLikes + 1)
            })
            .catch(() => alert("The server is not okay today, maybe he's got a flu"))
    }

    function unLikePost(config, id){
        service.deletingLikes(config, id)
            .then(() => {
                setIsLiked(false)
                setNumberOfLikes(numberOfLikes - 1)
            })
            .catch(() => alert("Err... You have to keep liking this post"))
    }

    function updateTooltipContent(){
            isLiked
            ?
            setTooltipContent(
                numberOfLikes === 1
                ?
                "You're the first to like it"
                :
                    numberOfLikes === 2 
                    ? 
                    likes[0].userId === userData.id ? `You and ${likes[1]["user.username"]} liked it` : `You and ${likes[0]["user.username"]} liked it`
                    :
                    likes[0].userId === userData.id ? `You, ${likes[1]["user.username"]} and ${numberOfLikes-2} other people` : `You, ${likes[0]["user.username"]} and ${numberOfLikes-2} other people`
                )
            :
            setTooltipContent(
                numberOfLikes
                ? 
                    numberOfLikes === 1 
                    ?
                    `${likes[0]["user.username"]} liked it` 
                    : 
                    numberOfLikes === 2 ? `${likes[0]["user.username"]} and ${likes[1]["user.username"]} liked it` : `${likes[0]["user.username"]}, ${likes[1]["user.username"]} and ${numberOfLikes-2} other people` 
                : 
                "Be the first to like it"
            )
    }

    useEffect(updateTooltipContent, [numberOfLikes])

    return (
        <>
                
            {isLiked 
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
 

