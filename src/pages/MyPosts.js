import { useState, useEffect, useContext } from 'react';

import UserContext from '../context/UserContext';
import BaseLayout from "../components/BaseLayout";
import Loading from "../components/Loading";
import Post from '../components/Post';
import service from '../service/auth';


function MyPosts() {
    const [ posts, setPosts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        let unmounted = false;

        const { token, user } = userData;
        async function getPosts() {
            const response = await service.getMyPosts("5f8eb824-09fe-4ef6-a5ed-a26dbcb1bc10", 3 /* change for user.id */ );
            console.log(response)
            if(response && !unmounted) setPosts(response.posts);
            else alert("Desculpe, nossas rotas estão engarrafadas no momento :(")
            setIsLoading(false);
        }
        getPosts();
        return () => { unmounted = true };
    }, [userData])

    return (
        <BaseLayout title="my posts">{
            isLoading
                ? <Loading spinnerSize={30}/>
                : posts.length === 0
                    ? "Nenhum post encontrado :("
                    : posts.map((post, index) => <Post key={index}
                                                       username={post.user.username} 
                                                       text={post.text}
                                                       link={post.link}
                                                       profilePic={post.user.avatar}
                                                       prevTitle={post.linkTitle}
                                                       prevImage={post.linkImage}
                                                       prevDescription={post.linkDescription}
                                                       likes={post.likes}
                                                       userId={post.user.id} />)
        }</BaseLayout>
    )
}

export default MyPosts;