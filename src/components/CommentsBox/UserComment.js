import styled from 'styled-components';

export default function UserComment({ commentData, isActive }) {
    const { text, user } = commentData

    return (
        <UserCommentContainer isActive={isActive}>
            <LeftSection>
                <img src={user.avatar}/>
            </LeftSection>
            <RightSection>
                <header>
                    <p className="username">{user.username}</p>
                    <p className="detail"></p>
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
    }

    .comment-text {
        color: #ACACAC;
        font-size: 14px;
        word-break: break-word;
    }
`