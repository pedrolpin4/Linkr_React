import { useContext, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import {FaSun, FaMoon} from "react-icons/fa";
import ThemeContext from "../context/ThemeContext";

export default function NavBar () {
  const {
    userData,
    setUserData
  } = useContext(UserContext);

  const {
    theme,
    setTheme
  } = useContext(ThemeContext)

  const history = useHistory();
  const menu = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  console.log(setTheme);
  useEffect(() => {
    function hideMenu(e) {
      if(openDropdown && menu.current !== e.target) {
        setOpenDropdown(false);
      }
    }
    window.addEventListener('click', hideMenu);
    return () => window.removeEventListener('click', hideMenu);
  }, [openDropdown]);

  function toggleMenu () {
    setOpenDropdown(!openDropdown);
  }

  function goToMyPosts () {
    toggleMenu();
    history.push("/my-posts");
  }

  function goToMyLikes () {
    toggleMenu();
    history.push("/my-likes");
  }

  function clearStorage () {
    window.localStorage.removeItem("userLogin");
  }

  function logOut () {
    setOpenDropdown(!openDropdown);
    clearStorage();
    setUserData({});
    history.push("/");
  }

  return (
    <NavBarContainer theme = {theme}>
      <NavBarTitle href="/timeline" theme = {theme}>linkr</NavBarTitle>
      <div>
        {openDropdown ? (
          <ArrowUp color={theme === "light" ? "#151515": "#FFFFFF"} onClick={toggleMenu} />
        ) : (
          <ArrowDown color={theme === "light" ? "#151515": "#FFFFFF"} onClick={toggleMenu} />
        )}
        <ProfileImg src={userData.user?.avatar} onClick={toggleMenu} />
      </div>
      <DropdownMenu openDropdown={openDropdown} ref={menu} theme = {theme}>
        <p onClick={goToMyPosts}>My posts</p>
        <p onClick={goToMyLikes}>My likes</p>
        <p onClick={logOut}>Logout</p>
        {theme === "light" ?
           <p onClick = {() =>{
            localStorage.setItem("currentTheme", "dark")
            setTheme("dark")
           } }>
              Theme:
              <FaSun color = "#151515" />
            </p> : 
           <p onClick = {() => {
             setTheme("light")
             localStorage.setItem("currentTheme", "light")
            }}>
              Theme:<FaMoon color = "#FFFFF" />
            </p>
        }
        <p></p>
      </DropdownMenu>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  background: ${props => props.theme === "light" ? "#FFFFFF" : "#151515"};
  height: 72px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 0px 28px;
  z-index: 100;
  @media(max-width: 600px){
    padding: 0px 16px; 
  }
`

const NavBarTitle = styled.a`
  font-family: "Passion One", cursive;
  font-weight: bold;
  font-size: 49px;
  color: ${props => props.theme === "light" ? "#151515" :"#FFFFFF"};
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 45px;
  }
`;

const ProfileImg = styled.img`
  margin: 0 7px 0 15px;
  width: 53px;
  height: 53px;
  border-radius: 26.5px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  @media(max-width: 600px){
    width: 44px;
    height: 44px;
    border-radius: 22px;
  }
`;

const DropdownMenu = styled.div`
  position: fixed;
  top: 72px;
  right: 0;
  z-index: 150;
  height: 135px;
  padding: 10px 29px 6px 28px;
  border-radius: 0px 0px 0px 20px;
  background-color: ${props => props.theme === "light" ? "#FAFAFA" :"#171717"};
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 0.05em;
  color: ${props => props.theme === "light" ? "#151515" :"#FFFFFF"};
  text-align: center;
  display: ${(props) => (props.openDropdown ? "block" : "none")};

  p {
    margin-bottom: 11px;
    cursor: pointer;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  svg{
    cursor: pointer;
    margin-left: 10px;
  }

  @media(max-width: 600px){
    width: 150px;
    height: 110px;
    background: #171717;
    font-size: 15px;
  }
`;

const ArrowDown = styled(MdKeyboardArrowDown)`
  cursor: pointer;
  width: 38px;
  height: 41px;
  @media(max-width: 600px) {
    width: 32px;
    height: 35px;
  }
`;

const ArrowUp = styled(MdKeyboardArrowUp)`
  cursor: pointer;
  width: 38px;
  height: 41px;

  @media (max-width: 600px) {
    width: 32px;
    height: 35px;
  }
`;