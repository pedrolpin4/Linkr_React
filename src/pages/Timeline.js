import { useContext, useEffect, useState } from "react";

import BaseLayout from "../components/BaseLayout";
import Loading from "../components/Loading";
import Post from '../components/Post';
import service from '../service/post';
import PostBox from "../components/PostBox";
import UserContext from "../context/UserContext";
import FeedbackMessage from '../components/FeedbackMessage';


function Timeline() {
    const { userData, following } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);
    const [ newPosts, setNewPosts ] = useState(0);
    useEffect(() => {
        let unmounted = false;

        async function getPostsData() {
            const { token } = userData;
            const response = await service.getMyFollowsPosts(token);

            if(response && !unmounted) setPosts(response.posts)
            else if(response === false) alert("Desculpe, o servidor saiu pra almoço, por favor atualize a página")

            setIsLoading(false);
        }
        if(userData.token) getPostsData();

        return () => { unmounted = true }
    },[newPosts, userData])

    useEffect(() => {
        let interval = setInterval(() => {
            setNewPosts(prevState => prevState + 1)
        }, 15000)

        return () => { clearInterval(interval) }
    }, [])

    return (
        <BaseLayout
            title="timeline"
            trends={[{name: "timeline"}]}            
        >
            <PostBox setNewPosts={setNewPosts} newPosts={newPosts}/>
            {
            isLoading
                ? <Loading spinnerSize={30}/>
                : following.length === 0 && posts.length === 0
                    ? <FeedbackMessage text="You don't follow anyone yet, search for someone"/>
                    : posts.map(post => <Post key={post.id}
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