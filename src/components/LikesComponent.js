import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import service from "../service/auth"; 
import Tippy from "@tippy.js/react"


export default function LikesComponent ( {liked, likes, id}) {
    const [ isLiked, setIsLiked ] = useState(liked);

    const testToken = "5f8eb824-09fe-4ef6-a5ed-a26dbcb1bc10"

    const config = {
        headers: {
            "Authorization": `Bearer ${testToken}` 
        }
    } 


    function likePost(config, id) {
        service.postingLikes(config, id)
            .then(() =>{
                setIsLiked(true)
            })
            .catch(() => alert("The server is not okay today, maybe he's got a flu"))
    }

    function unLikePost(){
        service.deletingLikes(config, id)
            .then(() => {
                setIsLiked(false)
            })
            .catch(() => alert("Err... You have to keep liking this post"))
    }

    return (
        <>
            {isLiked 
                ? 
                <AiFillHeart  onClick = {() => unLikePost(config, id)} color="#ff0000" size={25} /> 
                : 
                <AiOutlineHeart onClick = {() => likePost(config, id)} color="#fff" size={25} />
            }


            <p className="likes">
                {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
            </p>
        </>
    )
}
 

