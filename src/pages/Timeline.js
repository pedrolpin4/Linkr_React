import { useEffect, useState } from "react";
import { getPosts } from "../service/auth";

import BaseLayout from "../components/BaseLayout";
import Loading from "../components/Loading";
import Post from '../components/Post';

function Timeline() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        console.log("Effect")
        async function getPostsData() {
            const token = "09622c1e-d975-46a4-8b15-14063223e383"; // Only in development
            const response = await getPosts(token);
            console.log(response.posts)
            if(response) setPosts(response.posts);
        }
        getPostsData();
    },[])

    return (
        <BaseLayout
            title="timeline"
            trends={[{name: "timeline"}]}
        >{
            posts.length === 0
                ? <Loading spinnerSize={30}/>
                : posts.map(post => <Post username={post.user.username}
                                          text={post.text}
                                          link={post.link}
                                          profilePic={post.user.avatar}
                                          prevTitle={post.linkTitle}
                                          prevImage={post.linkImage}
                                          prevDescription={post.linkDescription} />)
        }</BaseLayout>
    )
}

export default Timeline;