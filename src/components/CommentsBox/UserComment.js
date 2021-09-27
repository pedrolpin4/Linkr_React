import styled from 'styled-components';

export default function UserComment({ commentData, isActive, following, postOwner, lastChild, index, theme }) {
    const { text, user } = commentData;

    return (
        <UserCommentContainer isActive={isActive} ref={e => { lastChild(e, index) }} theme = {theme}>
            <LeftSection theme = {theme}>
                <a href={`/user/${user.id}`}>
                    <img src={user.avatar} alt=""/>
                </a>
            </LeftSection>
            <RightSection theme= {theme}>
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
    display: flex;
    visibility: ${props => props.isActive ? "visible" : "hidden"};
    padding: 10px;
    border-bottom: ${props => props.theme === "light" ? "1px solid #e2e2e2" : "1px solid #353535"};
    font-family: "Lato", sans-serif;

    img {
        width: 38px;
        height: 38px;
        border-radius: 19px;
    }
`
const LeftSection = styled.div`
    width: 10%;

    @media screen and (max-width: 500px) {
        width: 15%;
    }

    @media screen and (max-width: 300px) {
        width: 20%;
    }
`

const RightSection = styled.div`
    width: 90%;

    header {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 5px;
        align-items: center;
    }

    .username {
        color: ${props => props.theme === "light" ? "#171717" : "#FFFFFF"};
        line-height: 20px;
        font-weight: bold;
    }

    .detail {
        font-size: 14px;
        color: #565656;
        margin-left: 5px;
    }

    .comment-text {
        color: ${props => props.theme === "light" ? "#333333" : "#ACACAC"};
        font-size: 14px;
        word-break: break-word;
    }

    @media screen and (max-width: 500px) {
        width: 85%;
    }

    @media screen and (max-width: 300px) {
        width: 80%;
    }
`