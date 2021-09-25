import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useEffect } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";

function SearchBox({ mobile }) {
  const { userData } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchUsers, setSearchUsers] = useState("");

  useEffect(() => {
    if (searchInput.length > 2) {
      const req = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/search?username=${searchInput}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      req.then((resp) => {
        setSearchUsers(
          resp.data.users.sort(function (x, y) {
            return x.isFollowingLoggedUser === y.isFollowingLoggedUser
              ? 0
              : x.isFollowingLoggedUser
              ? -1
              : 1;
          })
        );
        console.log(resp.data.users);
      });
      req.catch((error) => console.log(error.response));
    }
  }, [searchInput]);

  return (
    <>
      <SearchContainer mobile={mobile}>
        <DebounceInput
          placeholder="Search for people and friends"
          className="box"
          minLength={3}
          debounceTimeout={300}
          onChange={(e) => setSearchInput(e.target.value)}
        ></DebounceInput>
        <ImSearch size={25} color="#c6c6c6" />
      </SearchContainer>
      <UsersListBox toShow={searchInput.length >= 3} mobile={mobile}>
        {searchUsers === ""
          ? ""
          : searchUsers.map((user) => (
              <Link to={`/user/${user.id}`}>
                <User onClick={() => setSearchInput("")}>
                  <img src={user.avatar} alt={user.username} />
                  <h1>{user.username}</h1>
                  <h2>{user.isFollowingLoggedUser ? "• following" : ""}</h2>
                </User>
              </Link>
            ))}
      </UsersListBox>
    </>
  );
}

export default SearchBox;

const SearchContainer = styled.div`
  width: ${(props) => (props.mobile ? "611px" : "563px")};
  height: 45px;
  background-color: #fff;
  border-radius: 8px;
  display: ${(props) => (props.mobile ? "none" : "flex")};
  align-items: center;
  justify-content: space-between;
  margin-left: ${(props) =>
    props.mobile ? "0px" : "calc((100vw / 2) - ((563px + 28px) / 2))"};
  padding-right: 10px;
  position: absolute;
  z-index: ${(props) => (props.mobile ? "13" : "12")};
  left: ${(props) => (props.mobile ? "calc(((100vw - 611px) / 2))" : "")};
  top: ${(props) => (props.mobile ? "95px" : "")};

  @media (max-width: 1000px) {
    display: ${(props) => (props.mobile ? "flex" : "none")};
  }

  @media (max-width: 611px) {
    width: ${(props) => (props.mobile ? "calc(100vw - 30px)" : "")};
    left: ${(props) => (props.mobile ? "15px" : "")};
  }

  .box {
    width: 100%;
    height: 45px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-family: Lato;
    font-size: 19px;
    padding: 0 0 0 15px;
    color: gray;
  }
`;

const UsersListBox = styled.ul`
  width: ${(props) => (props.mobile ? "611px" : "563px")};
  height: auto;
  background-color: #e7e7e7;
  position: ${(props) => (props.mobile ? "absolute" : "fixed")};
  top: ${(props) => (props.mobile ? "115px" : "45px")};
  left: ${(props) =>
    props.mobile
      ? "calc(((100vw - 611px) / 2))"
      : "calc((100vw / 2) - ((563px - 28px) / 2))"};
  padding: 20px 0 3px 0;
  border-radius: 8px;
  display: ${(props) => (props.toShow ? "flex" : "none")};
  flex-direction: column;
  z-index: ${(props) => (props.mobile ? "12" : "11")};

  @media (max-width: 611px) {
    width: calc(100vw - 30px);
    left: 15px;
  }
`;

const User = styled.li`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-bottom: 7px;

  img {
    width: 39px;
    height: 39px;
    border-radius: 100px;
    margin-right: 12px;
  }

  h1 {
    font-family: Lato;
    font-size: 19px;
    color: #515151;
    margin-right: 12px;
    line-height: 23px;
    max-width: 365px;
    height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  h2 {
    font-family: Lato;
    font-size: 19px;
    color: #c5c5c5;
    margin-right: 12px;
    line-height: 23px;
  }
`;
