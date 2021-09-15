import { useEffect } from "react"
import {getHashtagsPosts} from "../service/auth"

function Hashtag() {
    const testToken = "09622c1e-d975-46a4-8b15-14063223e383"
    const { hashtag } = useParams()
    const [hashtagPosts, setHashtagPosts] = useState([])
    // const { userData } = useContext(UserContext)
    
    const config = {
        headers: {
            "Authorization": `Bearer ${testToken}` 
        }
    }

    function renderHashtagPosts (hashtag, config){
        getHashtagsPosts(hashtag, config)
            .then(res => {
                setHashtagPosts([...res.data.posts])
            })
            .catch(() => alert(`There was an error while finding the posts from the hashtag ${hashtag}`))
    }

   useEffect(() => renderHashtagPosts(hashtag, config), [])

    return (
        <>
            <PageTitle># {hashtag}</PageTitle>
            {hashtagPosts.map(post => (
                <h2>olá</h2>
            ))}
        </>
    )
}

export default Hashtag;