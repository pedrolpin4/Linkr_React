import { useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import styled from 'styled-components';

import UserContext from '../../context/UserContext';
import Loading from '../Loading';
import service from '../../service/post'; 

export default function CommentWritter({ postId, updateCommentsData, isActive, theme }) {
    const { userData } = useContext(UserContext);
    const [ comment, setComment ] = useState("");


    async function submitComment(e) {
        e.stopPropagation();

        if(comment.trim() === "") {
            alert("You have to type something to comment");
            return;
        }

        const body = {
            text: comment,
            user: userData.user.id
        }

        const response = await service.sendPostComment(postId, body, userData.token)
        if(response) updateCommentsData();
        setComment("");
    }

    function keyPressHandler(e) {
        if(e.key === 'Enter') submitComment(e)
    }

    return (
        <CommentWriterContainer isActive={isActive} theme = {theme}>
            {
                userData.user
                    ? <img src={userData.user.avatar} alt=""/>
                    : <Loading spinnerSize={25}/>
            }
            <textarea
                placeholder="write a comment..."
                onChange={(e) => {
                    e.stopPropagation();
                    setComment(e.target.value)
                }}
                value={comment}
                onKeyPress={e => { keyPressHandler(e) }}/>
            <FiSend className="send-ico" size={20} onClick={e => { submitComment(e) }}/>
        </CommentWriterContainer>
    )
}

const CommentWriterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    visibility: ${props => props.isActive ? "visible" : "hidden"};

    img {
        width: 38px;
        height: 38px;
        border-radius: 19px;
    }

    textarea {
        background-color: ${props => props.theme === "light" ? "#e2e2e2" : "#252525"};
        font-family: "Lato", sans-serif;
        border: none;
        resize: none;
        height: 38px;
        width: 80%;
        border-radius: 5px;
        outline: none;
        color: ${props => props.theme === "light" ? "#171717" : "#FFFFFF"};;
        font-size: 16px;
        padding: 6px 15px;
    }

    textarea::-webkit-input-placeholder {
        color: #575757;
    }

    textarea:-moz-placeholder { /* Firefox 18- */
        color: #575757;  
    }

    textarea::-moz-placeholder {  /* Firefox 19+ */
        color: #575757;  
    }

    textarea:-ms-input-placeholder {
        color: #575757;  
    }

    textarea::placeholder {
        color: #575757;  
    }

    .send-ico {
        cursor: pointer;
    }
`