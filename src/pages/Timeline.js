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
            const token = "5f8eb824-09fe-4ef6-a5ed-a26dbcb1bc10"; // Only in development
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
                                                       userId={post.user.id}
                                                       id={post.id}
                                                       setNewPosts={setNewPosts}
                                                       newPosts={newPosts} />)
        }</BaseLayout>
    )
}

export default Timeline;