import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import { MdKeyboardArrowDown as ArrowDown, MdKeyboardArrowUp as ArrowUp} from "react-icons/md"


export default function NavBar () {
  const {
    userData
  } = useContext(UserContext);

  console.log(userData)

  const history = useHistory();
  const [openDropdown, setOpenDropdown] = useState(false);

  function toggleMenu () {
    setOpenDropdown(!openDropdown);
    console.log("aqui2");
  }

  function clearStorage () {
    window.localStorage.removeItem("userLogin");
  }

  function logOut () {
    setOpenDropdown(!openDropdown);
    clearStorage();
    history.push("/");
  }


  return (
    <NavBarContainer>
      <NavBarTitle>linkr</NavBarTitle>
      <div>
        {openDropdown ? (
          <ArrowUp color="#FFFFFF" size={40} onClick={toggleMenu} />
        ) : (
          <ArrowDown color="#FFFFFF" size={40} onClick={toggleMenu} />
        )}

        <ProfileImg src={userData.user.avatar} onClick={toggleMenu} />
      </div>
      <DropdownMenu openDropdown={openDropdown} /*ref={menu}*/>
        <Link to="/my-posts">
          <p>My posts</p>
        </Link>
        <Link to="/my-likes">
          <p>My likes</p>
        </Link>
        <p onClick={logOut}>Logout</p>
      </DropdownMenu>
    </NavBarContainer>
  );
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
  padding: 0px 25px 0px 28px;
  z-index: 100;
`

const NavBarTitle = styled.h1`
  font-family: 'Passion One', sans-serif;
  font-weight: bold;
  font-size: 49px;
  color: #FFFFFF;
`

const ProfileImg = styled.img`
  margin: 0 17px 0 15px;
  width: 53px;
  height: 53px;
  border-radius: 26.5px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const DropdownMenu = styled.div`
  position: fixed;
  top: 72px;
  right: 0;
  z-index: 150;
  height: 109px;
  padding: 10px 29px 6px 28px;
  border-radius: 0px 0px 0px 20px;
  background-color: #171717;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 0.05em;
  color: #ffffff;
  text-align: center;
  display: ${(props) => (props.openDropdown ? "block" : "none")};

  p {
    margin-bottom: 11px;
    cursor: pointer;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;