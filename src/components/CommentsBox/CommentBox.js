import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import UserContext from '../../context/UserContext';
import service from '../../service/post';
import Loading from '../Loading';

export default function CommentBox({ postId, isActive }) {
    const { userData } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ commentsData, setCommentsData ] = useState([]);

    useEffect(() => {
        let unmounted = false;
        async function getData() {
            const { token } = userData;
            const response = await service.getComments(postId, token);

            if(response && !unmounted) setCommentsData(response.comments);
            else if(response === false) alert("Something went wrong");
            setIsLoading(false);
        }

        if(userData.token) getData();
        return () => { unmounted = true }
    }, [userData, postId])

    return (
        <CommentBoxContainer /* isActive={isActive} */ layout animate={isActive ? "active" : "unactive"} variants={variants}>{
            isLoading
                ? <Loading spinnerSize={30}/>
                : commentsData.map(comment => <p key={comment.id}>Comentário</p>)
        }</CommentBoxContainer>
    )
}

const CommentBoxContainer = styled(motion.div)`
    height: 0;
    background-color: red;
    width: 100%;
`

const variants = {
    active: { height: 350, opacity: 1 },
    unactive: { height: 0, opacity: 0 }
}