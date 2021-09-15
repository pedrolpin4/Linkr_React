import styled from "styled-components";
import TrendingBar from '../components/TrendingBar';

export default function BaseLayout({ children,
                                     title })
{

    return (
        <BaseLayoutContainer>
            <Title>{title}</Title>

            <MainContentContainer>
                <LeftSection>
                    { children }
                </LeftSection>

                <RightSection>
                    <TrendingBar />
                </RightSection>
            </MainContentContainer>
        </BaseLayoutContainer>
    )
}

const Title = styled.h1`
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    font-weight: bold;
`

const BaseLayoutContainer = styled.div`
    width: 100%;
    background-color: #333333;
    min-height: 100vh;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    h1 {
        width: 932px;
        text-align: left;
        margin: 53px 0px;
    }
`

const MainContentContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 0px 20px;

`

const LeftSection = styled.section`
    width: 611px;
`

const RightSection = styled.section`
    width: 301px;
`

