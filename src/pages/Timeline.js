import { useEffect, useState } from "react";
import { getPosts } from "../service/auth";

import BaseLayout from "../components/BaseLayout";
import Loading from "../components/Loading";
import Post from '../components/Post';

function Timeline() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        async function getPostsData() {
            const token = "09622c1e-d975-46a4-8b15-14063223e383"; // Only in development
            const response = await getPosts(token);

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

export default Timeline;