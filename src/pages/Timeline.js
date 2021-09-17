import { useEffect, useState } from "react";

import BaseLayout from "../components/BaseLayout";
import Loading from "../components/Loading";
import Post from '../components/Post';
import service from '../service/auth';

function Timeline() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        async function getPostsData() {
            const token = "5f8eb824-09fe-4ef6-a5ed-a26dbcb1bc10"; // Only in development
            const response = await service.getPosts(token);

            if(response) setPosts(response.posts)
            else if(response === false) alert("Desculpe, o servidor saiu pra almoço, por favor atualize a página")

            setIsLoading(false);
        }
        getPostsData();
    },[])

    return (
        <BaseLayout
            title="timeline"
            trends={[{name: "timeline"}]}
        >{
            isLoading
                ? <Loading spinnerSize={30}/>
                : posts.length === 0
                    ? "Nenhum post encontrado :("
                    : posts.map((post, index) => <Post key={index}
                                                       id = {post.id}
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

export default Timeline;