import styled from "styled-components";
import { Title } from '../SharedStyles/StyledComponents';

export default function BaseLayout({ children,
                                     trends,
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
                    <TrendsContainer>{
                        trends.map((trend, index) => <p key={index}>{trend.name}</p>)
                    }</TrendsContainer>
                </RightSection>
            </MainContentContainer>
        </BaseLayoutContainer>
    )
}



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
        margin: 30px 0px;
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

const TrendsContainer = styled.div`
    width: 301px;
    height: 406px;
    border-radius: 10px;
    background-color: #171717;
`

