import { useState, useEffect, useContext } from 'react';

import UserContext from '../context/UserContext';
import BaseLayout from '../components/BaseLayout';
import Loading from '../components/Loading';
import Post from '../components/Post';
import service from '../service/auth';

function MyLikes() {
    const { userData } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        let unmounted = false;
        /* const { token, user } = userData; */
        const token = "5f8eb824-09fe-4ef6-a5ed-a26dbcb1bc10";
        async function getLikedPosts() {
            const response = await service.getLikedPosts(token);

            if(response && !unmounted) {
                setPosts(response.posts);
                setIsLoading(false);
            }
            else if(response === false) alert("Hoje é feriado ná terra dos servidores, te respondemos amanhã!");
        }

        getLikedPosts();
        return () => { unmounted = true }
    }, [userData])

    return (
        <BaseLayout title="my likes">{
            isLoading
                ? <Loading spinnerSize={30}/>
                : posts.length === 0
                    ? "Nenhum pos encontrado :("
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

export default MyLikes;