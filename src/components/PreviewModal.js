import styled from "styled-components";
import {useCallback, useEffect, useRef} from 'react';

function PreviewModal ({showModal, setShowModal, link, theme}){
    const modalRef = useRef();
    const siteRef = useRef();
    function closeModal(e){
        if(modalRef.current === e.target){
            setShowModal(false)
        }
    }

    const modalKeyEvents = useCallback(e => {
        if(e.key === "Escape" && showModal === true){
            setShowModal(false)
        }
    }, [setShowModal, showModal])

    useEffect(()=> {
        document.addEventListener("keydown", modalKeyEvents)   
    }, [modalKeyEvents])

    return(
        <>
            {   showModal 
                ?
                <>
                    <ModalBackground 
                        ref = {modalRef} 
                        onClick ={closeModal} 
                        theme = {theme}
                    >
                        <ModalContainer theme = {theme}>
                            <TopSection>
                                <ModalButton>
                                    <a href = {link} target = "_blank">
                                        Open in new tab
                                    </a>  
                                </ModalButton> 
                                <Xbutton onClick = {() => setShowModal(false)} theme = {theme}>
                                    X
                                </Xbutton>
                            </TopSection>
                            <LinkScreen ref = {siteRef}>
                                <iframe
                                    title={link}
                                    width="100%"
                                    height="100%"
                                    is = "x-frame-bypass"
                                    src={link}
                                ></iframe>
                            </LinkScreen>
                        </ModalContainer>
                    </ModalBackground>      
                </>
                :
                null
            }
        </>
    )
}

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme === "light" ? "rgba(0,0,0, 0.6)" : "rgba(255,255,255, 0.6)"};
    z-index: 120;
`

const ModalContainer = styled.div`
    position: fixed;
    width: 966px;
    height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    top: 60px;
    left: calc((100vw - 966px)/2);
    background: ${props => props.theme === "light" ? "#fafafa" : "#333333"};
    opacity: 1;
    z-index: 130;
    padding: 15px 20px 21px 20px;

    @media(max-width: 1000px){
        width: 580px;
        left: calc((100% - 580px)/2);
    }

    @media(max-width: 600px){
        width: 100vw;
        left: 0px;
    }
`

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`

const ModalButton = styled.button`
    width: 138px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    font-weight: bold;
    font-size: 14px;
    color: #FFFFFF;
    border: none;
`

const LinkScreen = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`

const Xbutton = styled.p`
    font-size: 20px;
    color: ${props => props.theme === "light" ? "#333333" : "#FFF"};
    cursor: pointer;
`

export default PreviewModal