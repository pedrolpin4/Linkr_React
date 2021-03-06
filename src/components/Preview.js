import { useState } from 'react';
import styled from 'styled-components';
import PreviewModal from './PreviewModal';

export default function Preview({ title, description, link, img, theme }) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <PreviewContainer onClick={() => setShowModal(true)} theme={theme}>
          <LeftSection theme={theme}>
            <h1>{title !== null ? title : link}</h1>
            <p>{description}</p>
            <p className="link" href={link}>
              {link}
            </p>
          </LeftSection>
          <RightSection
            img={
              img !== null || img !== ""
                ? img
                : "https://forestgreenslimplots.andrezzasoares.repl.co/download.png"
            }
          />
        </PreviewContainer>
        <PreviewModal
          showModal={showModal}
          setShowModal={setShowModal}
          link={link}
          theme={theme}
        />
      </>
    );
}

const PreviewContainer = styled.a`
    text-decoration: none;
    background-color: inherit;
    border: ${props => props.theme === "light" ? "1px solid #e5e5e5" : "1px solid #6e6e6e"};
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    height: 155px;
    z-index: 10;
    overflow: hidden;
    cursor: pointer;
    @media screen and (max-width: 600px) {
        height: 115px;
    }
`

const LeftSection = styled.div`
    width: calc(100% - 155px);
    font-family: 'Lato', sans-serif;
    color: ${props => props.theme === "light" ? "#333333" : "#CECECE"};
    padding: 10px;

    h1 {
        font-size: 16px;
        line-height: 22px;
        margin: 10px 0px 20px 0px;
        word-wrap: break-word;
        max-height: 32px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    p {
        font-size: 11px;
        margin-bottom: 10px;
        word-wrap: break-word;
        color: ${props => props.theme === "light" ? "#2A2A2A" : "#9B9595"};
        height: 55px;
        overflow: hidden;
        @media screen and (max-width: 600px) {
            height: 35px;
            margin-bottom: 5px;
            overflow: hidden;
        }
    }

    .link {
        font-size: 11px;
        text-decoration: none;
        color: ${props => props.theme === "light" ? "#171717" : "#FFFFFF"};
        border: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 0;
        line-height: 20px;
    }

    @media screen and (max-width: 600px) {
        margin-left: 5px;
        width: calc(100% - 95px);
        padding: 5px;
        h1{
            font-size: 11px;
            margin: 0px 0px 4px 0px
        }
        p{
            font-size: 9px;
        }
        .link{
            font-size: 9px;
        }
    }
`

const RightSection = styled.div`
    width: 155px;
    height: inherit;
    border-radius: 0px 10px 10px 0px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${props => props.img});
    z-index: 5;

    @media screen and (max-width: 600px) {
        width: 95px;
  }
`