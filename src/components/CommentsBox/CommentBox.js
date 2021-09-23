import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import motion from 'framer-motion';

import UserContext from '../../context/UserContext';
import service from '../../service/post';
import Loading from '../Loading';

export default function CommentBox({ postId }) {
    const { userData } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ commentsData, setCommentsData ] = useState([]);

    useEffect(() => {
        let unmounted = false;
        async function getData() {
            const { token } = userData;
            console.log(token)
            const response = await service.getComments(postId, token);
            console.log(response)
            if(response && !unmounted) setCommentsData(response);
            else if(response === false) alert("Something went wrong");
            setIsLoading(false);
        }

        if(userData.token) getData();
        return () => { unmounted = true }
    }, [userData, postId])

    return (
        <CommentBoxContainer>{
            isLoading
                ? <Loading spinnerSize={30}/>
                : commentsData.map(comment => <p>Comentário</p>)
        }</CommentBoxContainer>
    )
}

const CommentBoxContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 350px;
    background-color: red;
`