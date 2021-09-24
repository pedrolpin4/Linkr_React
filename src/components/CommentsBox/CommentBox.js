import { useEffect, useContext, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import UserContext from '../../context/UserContext';
import service from '../../service/post';
import Loading from '../Loading';
import UserComment from './UserComment';
import CommentWritter from './CommentWriter';

export default function CommentBox({ postId, isActive, setCommentsAmmount, postOwner }) {
    const { userData, searchUserInFollowing } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ commentsData, setCommentsData ] = useState([]);
    const [ refreshController, setRefreshController ] = useState(0); // this state is changed so that useEffect can update comments data and render new comments

    const [ penultimate, setPenultimate ] = useState();
    const lastChild = useRef();

    function updateCommentsData() {
        setRefreshController(prevState => prevState + 1);
    }

    const refCallback = useCallback((e, index) => {
        if(isActive && (commentsData.length-1) === index) {
            lastChild.current = e;
        }
    }, [isActive, commentsData])

    useEffect(() => {
        let unmounted = false;

        async function getData() {
            const { token } = userData;
            const response = await service.getComments(postId, token);
            setCommentsAmmount(response.comments.length);

            if(response && !unmounted) setCommentsData(response.comments);
            else if(response === false) alert("Something went wrong");
            setIsLoading(false);
        }
        
        
        if(userData.token)  getData();
        setPenultimate(lastChild.current)
        return () => { unmounted = true }
    }, [userData, postId, refreshController, setCommentsAmmount])

    useEffect(() => {
        setTimeout(() => {
            if(refreshController > 0) {
                lastChild.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
            }
        }, 200)

    }, [refreshController, penultimate])

    return (
        <CommentBoxContainer layout animate={isActive ? "active" : "unactive"} variants={variants}>
            <div className="comments-wrapper">{
                isLoading && isActive
                ? <Loading size={30}/>
                : commentsData.map((comment, index) => <UserComment key={comment.id}
                                                                    commentData={comment}
                                                                    isActive={isActive}
                                                                    following={!!searchUserInFollowing(comment.user.id)}
                                                                    postOwner={postOwner}
                                                                    lastChild={refCallback}
                                                                    index={index} />)
                }</div>
            <CommentWritter postId={postId}
                            updateCommentsData={updateCommentsData}
                            reference={lastChild}
                            isActive={isActive} />
        </CommentBoxContainer>
    )
}

const CommentBoxContainer = styled(motion.div)`
    height: 0;
    max-height: 350px;
    background-color: #1E1E1E;
    width: 100%;
    border-radius: 0px 0px 15px 15px;
    padding: 10px;
    position: relative;

    .comments-wrapper {
        overflow-y: auto;
        position: relative;
        top: 0;
        left: 0;
        max-height: calc(350px - 90px);
        
        ::-webkit-scrollbar {
            width: 2px;
        }

            /* Track */
        ::-webkit-scrollbar-track {
            background: inherit;
        }

            /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #888;
        }

            /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }
`

const variants = {
    active: { height: "auto", opacity: 1, transition: {
        stiffness: 100
    }},
    unactive: { height: 0, opacity: 0, transition: {
        duration: .2
    }}
}
