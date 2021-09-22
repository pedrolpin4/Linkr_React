import styled from 'styled-components';

export default function UserComment({ CommentData }) {


    return (
        <UserCommentContainer>
            <LeftSection></LeftSection>
            <RightSection></RightSection>
        </UserCommentContainer>
    )
}

const UserCommentContainer = styled.div`
    width: 100%;
    margin-bottom: 1px solid #353535;
    display: flex;
`
const LeftSection = styled.div`
    width: 50px;
`

const RightSection = styled.div`

`