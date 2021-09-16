import styled from "styled-components"

export default function WarningScreen() {
    return (
        <WarningScreenContainer>
            <Message></Message>
            <div>
                <RejectButton></RejectButton>
                <Button></Button>
            </div>
        </WarningScreenContainer>
    )
}

const WarningScreenContaier = styled.div`
    border-radius: 10px;
    background-color: #191919;
`