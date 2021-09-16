import { useEffect, useState } from "react";

import BaseLayout from "../components/BaseLayout";
import Loading from "../components/Loading";
import Post from '../components/Post';
import service from '../service/auth';
import PostBox from "../components/PostBox";

function Timeline() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);
    const [ newPosts, setNewPosts ] = useState(0);

    useEffect(() => {
        async function getPostsData() {
            const token = "09622c1e-d975-46a4-8b15-14063223e383"; // Only in development
            const response = await service.getPosts(token);

            if(response) setPosts(response.posts)
            else if(response === false) alert("Desculpe, o servidor saiu pra almoço, por favor atualize a página")

            setIsLoading(false);
        }
        getPostsData();
    },[newPosts])

    return (
        <BaseLayout
            title="timeline"
            trends={[{name: "timeline"}]}            
        >
            <PostBox setNewPosts={setNewPosts} newPosts={newPosts}/>
            {
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