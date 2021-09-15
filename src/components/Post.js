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
                               prevImage,
                               likes,
                               userId  })
{
    const [ isLiked, setIsLiked ] = useState(liked);


    return (
        <PostContainer>
            <LeftSection>
                <a href={`/user/${userId}`}><img src={profilePic} /></a>
                {
                    liked
                        ? <AiFillHeart color="#ff0000" size={25} />
                        : <AiOutlineHeart color="#fff" size={25} />
                }
                <p className="likes">
                    {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
                </p>
            </LeftSection>

            <RightSection>
                <header>
                    <p className="username">{username}</p>
                    <FaTrash size={12} />
                    <p className="description"> {text}</p>
                </header>
                <Preview title={prevTitle}
                         description={prevDescription}
                         img={prevImage}
                         link={link} />
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
    padding: 15px;
    min-height: 220px;
    position: relative;
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
        margin-bottom: 20px;
    }

    .likes {
        font-size: 12px;
        margin-top: 5px;
    }
`

const RightSection = styled.div`
    width: 90%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding-left: 20px;

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
        min-height: 16px;
    }
`

const Like = styled.p``