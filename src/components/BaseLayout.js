import styled from "styled-components";
import TrendingBar from '../components/TrendingBar';
import NavBar from "./NavBar";

export default function BaseLayout({ children,title }){
    return(    
        <>
            <NavBar />
            <BaseLayoutContainer>
                <MainContentContainer>
                    <LeftSection>
                        <PageTitle>{title}</PageTitle>
                        {children}
                    </LeftSection>

                    <TrendingBar />
                </MainContentContainer>
            </BaseLayoutContainer>
        </>
    )
}

const PageTitle = styled.h1`
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    margin: 125px 0 63px 0;
    font-weight: bold;
    @media (max-width: 1000px){
        font-size: 33px;
    }
    @media (max-width: 611px){
        margin-left: 17px;
    }
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
`

const MainContentContainer = styled.div`
    display: flex;
    margin-left: 0 auto;
    justify-content: center;
    gap: 0px 20px;
`

const LeftSection = styled.section`
    width: 611px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    @media(max-width: 611px){
        width: 100vw;
    }
`
