import { useContext } from 'react';
import { FiSend } from 'react-icons/fi';
import styled from 'styled-components';

import UserContext from '../../context/UserContext';
import Loading from '../Loading';

export default function CommentWritter({ postData }) {
    const { userData } = useContext(UserContext);

    return (
        <CommentWriterContainer>
            {
                userData.user
                    ? <img src={userData.user.avatar}/>
                    : <Loading spinnerSize={25}/>
            }
            <textarea placeholder="write a comment..." />
            <FiSend size={20}/>
        </CommentWriterContainer>
    )
}

const CommentWriterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    position: relative;

    img {
        width: 38px;
        height: 38px;
        border-radius: 19px;
    }

    textarea {
        background-color: #252525;
        font-family: "Lato", sans-serif;
        border: none;
        resize: none;
        height: 38px;
        width: 80%;
        border-radius: 5px;
        outline: none;
        color: #fff;
        font-size: 16px;
        padding: 5px;
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
`