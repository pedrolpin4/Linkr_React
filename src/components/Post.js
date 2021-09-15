import styled from "styled-components";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

import Preview from './Preview';

export default function Post({ profilePic,
                               link,
                               username,
                               text,
                               liked,
                               prevTitle,
                               prevDescription,
                               prevImage  })
{
    const [ isLiked, setIsLiked ] = useState(liked);


    return (
        <PostContainer>
            <LeftSection>
                <img src={profilePic} />
                {
                    liked
                        ? <AiFillHeart color="#ff0000" size={15} />
                        : <AiOutlineHeart color="#fff" size={15} />
                }
                <p>10</p>
            </LeftSection>

            <RightSection>
                <header>
                    <p className="username">{username}</p>
                    <FaTrash size={12} />
                </header>
                <p className="description"> {text}</p>
                <Preview title={prevTitle}
                         description={prevDescription}
                         img={prevImage}
                         link={link}/>
            </RightSection>
        </PostContainer>
    )
}

const PostContainer = styled.div`
    background-color: #171717;
    border-radius: 15px;
    width: 611px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;
    min-height: 200px;
`

const LeftSection = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;

    img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        margin-bottom: 10px;
    }
`

const RightSection = styled.div`
    width: 90%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding-left: 10px;

    svg {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .username {
        margin-bottom: 10px;
    }

    .description {
        color: #B7B7B7;
        margin-bottom: 10px;
    }
`

const Like = styled.p``