import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";


export default function NavBar () {
    const {
        userData
    } = useContext(UserContext)

    return(
        <NavBarContainer>
            <NavBarTitle>linkr</NavBarTitle>
            <div>
               <ion-icon name = "checkbox-outline"/>
               <ProfileImg src = {userData.avatar} />
            </div>
        </NavBarContainer>
    )
}

const NavBarContainer = styled.div`
    background: #151515;
    height: 72px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 7px 0px 28px;
`

const NavBarTitle = styled.h1`
    font-family: 'Passion One', sans-serif;
    font-weight: bold;
    font-size: 49px;
    color: #FFFFFF;
`

const ProfileImg = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
`