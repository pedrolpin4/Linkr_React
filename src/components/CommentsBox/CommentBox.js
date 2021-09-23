import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import UserContext from '../../context/UserContext';
import service from '../../service/post';
import Loading from '../Loading';
import UserComment from './UserComment';
import CommentWritter from './CommentWriter';

export default function CommentBox({ postId, isActive, setCommentsAmmount }) {
    const { userData } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ commentsData, setCommentsData ] = useState([]);

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

        if(userData.token) getData();
        return () => { unmounted = true }
    }, [userData, postId])

    return (
        <CommentBoxContainer layout animate={isActive ? "active" : "unactive"} variants={variants}>{
            isLoading && isActive
                ? <Loading size={30}/>
                : commentsData.map(comment => <UserComment key={comment.id}
                                                           commentData={comment}
                                                           isActive={isActive} />)
            }
            <CommentWritter />
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
`

const variants = {
    active: { height: "auto", opacity: 1, transition: {
        stiffness: 100
    }},
    unactive: { height: 0, opacity: 0 }
}