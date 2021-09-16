import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import { MdKeyboardArrowDown as ArrowDown} from "react-icons/md"


export default function NavBar () {
    const {
        userData
    } = useContext(UserContext)

    return(
        <NavBarContainer>
            <NavBarTitle>linkr</NavBarTitle>
            <div>
               <ArrowDown color = "#FFFFFF" size = {40}/>
               <ProfileImg src = {userData.avatar} />
            </div>
        </NavBarContainer>
    )
}

const NavBarContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    background: #151515;
    height: 72px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 7px 0px 28px;
    z-index: 100;
`

const NavBarTitle = styled.h1`
    font-family: 'Passion One', sans-serif;
    font-weight: bold;
    font-size: 49px;
    color: #FFFFFF;
`

const ProfileImg = styled.img`
    margin-left: 10px;
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
`