import styled from 'styled-components';

export default function UserComment({ commentData, isActive, following, postOwner, lastChild, index }) {
    const { text, user } = commentData;

    return (
        <UserCommentContainer isActive={isActive} ref={e => { lastChild(e, index) }}>
            <LeftSection>
                <a href={`/user/${user.id}`}>
                    <img src={user.avatar}/>
                </a>
            </LeftSection>
            <RightSection>
                <header>
                    <a href={`/user/${user.id}`} className="username">{user.username}</a>
                    <p className="detail">{
                        postOwner.id === user.id
                            ? " • post's author"
                            : following 
                                ? " • following" 
                                : ""
                    }</p>
                </header>
                <p className="comment-text">{text}</p>
            </RightSection>
        </UserCommentContainer>
    )
}

const UserCommentContainer = styled.div`
    width: 100%;
    margin-bottom: 1px solid #353535;
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #353535;
    font-family: "Lato", sans-serif;

    img {
        width: 38px;
        height: 38px;
        border-radius: 19px;
    }
`
const LeftSection = styled.div`
    width: 10%;
`

const RightSection = styled.div`
    width: 90%;

    header {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 5px;
    }

    .username {
        color: #fff;
        font-weight: bold;
    }

    .detail {
        font-size: 14px;
        color: #565656;
        margin-left: 5px;
    }

    .comment-text {
        color: #ACACAC;
        font-size: 14px;
        word-break: break-word;
    }
`