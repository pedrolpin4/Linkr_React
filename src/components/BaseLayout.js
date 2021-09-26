import { useContext } from "react";
import styled from "styled-components";
import TrendingBar from "../components/TrendingBar";
import ThemeContext from "../context/ThemeContext";
import NavBar from "./NavBar";
import SearchBox from "../components/SearchBox";


export default function BaseLayout({ children, title }) {
  const {
    theme,
    setTheme
  } = useContext(ThemeContext);

  return (
    <>
      <NavBar/>
      <BaseLayoutContainer theme = {theme}>
        <MainContentContainer>
          <LeftSection>
            <SearchBox mobile={true}/>
              <PageTitle>{title}</PageTitle>
            {children}
          </LeftSection>
          <TrendingBar className="trending-bar" theme = {theme}/>
        </MainContentContainer>
      </BaseLayoutContainer>
    </>
  );
}



const PageTitle = styled.h1`
  line-height: 64px;
  font-family: "Oswald", sans-serif;
  overflow-x: hidden;
  text-overflow: ellipsis;
  font-size: 43px;
  margin: 125px 0 45px 0;
  font-weight: bold;
  width: 100%;

  @media (max-width: 1000px) {
    font-size: 33px;
    line-height: 48.91px;
    margin-top: 155px;
  }

  @media (max-width: 650px) {
    margin: 155px 0px 19px 17px;    
  }

  @media (max-width: 611px) {
    margin: 150px 0px 19px 17px;
    overflow-wrap: break-word;
  }
`;

const BaseLayoutContainer = styled.div`
  width: 100%;
  background-color: ${props => props.theme === "light" ? "#DCDCDC" :"#333333"};
  min-height: 100vh;
  color: ${props => props.theme === "light" ? "#151515" :"#FFFFFF"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MainContentContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0px 20px;
`;

const LeftSection = styled.section`
  width: 611px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  @media (max-width: 611px) {
    width: 100vw;
  }
`;
