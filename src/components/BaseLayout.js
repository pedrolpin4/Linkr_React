import { useContext } from "react";
import styled from "styled-components";
import TrendingBar from "../components/TrendingBar";
import ThemeContext from "../context/ThemeContext";
import NavBar from "./NavBar";
import SearchBox from "../components/SearchBox";


export default function BaseLayout({ children, title, img }) {
  const {
    theme,
    setTheme
  } = useContext(ThemeContext);

  console.log(theme);
  return (
    <>
      <NavBar/>
      <BaseLayoutContainer theme = {theme}>
        <MainContentContainer>
          <LeftSection>
            <SearchBox mobile={true}/>
            <div className="user-info">
              {
                img
                  ? <img src={img} alt="" className="profile-img"/>
                  : null
              }
              <PageTitle>{title}</PageTitle>
            </div>
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
  
  font-weight: bold;
  
  @media (max-width: 1000px) {
    font-size: 26px;
    line-height: 40px;
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

  .user-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 125px 0 45px 0;
    width: 100%;

    @media (max-width: 1000px) {
      margin-top: 155px;
    }
    @media (max-width: 650px) {
      margin: 155px 0px 19px 17px;    
    }
    @media (max-width: 611px) {
      margin: 150px 0px 19px 10px;
    }
  }

  .profile-img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-right: 10px;
  }

  @media (max-width: 611px) {
    width: 100vw;
  }
`;
