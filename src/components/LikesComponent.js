import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import service from "../service/auth"; 
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

export default function LikesComponent ( { likes, id, userId}) {
    const [ isLiked, setIsLiked ] = useState(likes.some(like => like.userId === userId));
    console.log(likes);

    const [ tooltipContent, setTooltipContent ] = useState("");

    const testToken = "5f8eb824-09fe-4ef6-a5ed-a26dbcb1bc10"

    const config = {
        headers: {
            "Authorization": `Bearer ${testToken}` 
        }
    } 

    function likePost(config, id) {
        service.postingLikes(config, id)
            .then(() => setIsLiked(true))
            .catch(() => alert("The server is not okay today, maybe he's got a flu"))
    }

    function unLikePost(config, id){
        service.deletingLikes(config, id)
            .then(() => {
                setIsLiked(false)
            })
            .catch(() => alert("Err... You have to keep liking this post"))
    }

    useEffect(() => {
        isLiked
        ?
        setTooltipContent(
            likes.length === 1
            ?
            "You're the first to like it"
            :
                likes.length === 2 
                ? 
                `You and ${likes[0].username} liked it`
                :
                `You, ${likes[0].username} and ${likes.length-2} other people`
            )
        :
        setTooltipContent(
            likes.length 
            ? 
            `${likes[0].username}, ${likes[1].username} and ${likes.length-2} other people` 
            : 
            "Be the first to like it"
        )
    })

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
                    {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
                </p>
            </Tippy>
        </>
    )
}
 

