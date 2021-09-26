import { useContext } from "react";
import { motion } from 'framer-motion';
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

  const variants = {
    hidden: {
      opacity: 0,
      x: "100vw"
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeInOut",
        delay: .2,
        duration: .3
      }
    },
    exit: {
      x:"-100vw",
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: .2
      }
    }
  }

  return (
    <>
      <NavBar />
      <BaseLayoutContainer
        theme={theme}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
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
    margin: 150px 0px 19px 10px;
  }
`;

const BaseLayoutContainer = styled(motion.div)`
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
