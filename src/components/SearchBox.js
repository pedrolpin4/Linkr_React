import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useEffect } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";

function SearchBox() {
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
    <Container>
      <SearchContainer>
        <DebounceInput
          placeholder="Search for people and friends"
          className="caixa"
          minLength={3}
          debounceTimeout={300}
          onChange={(e) => setSearchInput(e.target.value)}
        ></DebounceInput>
        <ImSearch size={25} color="#c6c6c6" />
      </SearchContainer>
      <UsersListBox toShow={searchInput.length >= 3}>
        {searchUsers === ""
          ? ""
          : searchUsers.map((user) => (
              <Link to={`/user/${user.id}`}>
                <User>
                  <img src={user.avatar} alt={user.username} />
                  <h1>{user.username}</h1>
                  <h2>{user.isFollowingLoggedUser ? "• following" : ""}</h2>
                </User>
              </Link>
            ))}
      </UsersListBox>
    </Container>
  );
}

export default SearchBox;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightskyblue;
  padding: 20px;
`;

const SearchContainer = styled.div`
  width: 575px;
  height: 45px;
  background-color: #FFF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: calc((100vw / 2) - 574px / 2);
  padding-right: 10px;
  position: absolute;
  //z-index: 100;

  .caixa {
    width: 100%;
    height: 45px;
    border-radius: 8px;
    border: none;
    outline: none;
    //margin-left: calc((100vw / 2) - 563px / 2);
    font-family: Lato;
    font-size: 19px;
    padding: 0 0 0 15px;
    color: gray;
  }
`;

const UsersListBox = styled.ul`
  width: 575px;
  height: auto;
  background-color: #e7e7e7;
  margin-left: calc((100vw / 2) - 575px / 2);
  margin-top: 30px;
  padding: 20px 0 3px 0;
  border-radius: 8px;
  display: ${(props) => (props.toShow ? "inherit" : "none")};
  //z-index: -1;
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
  }

  h2 {
    font-family: Lato;
    font-size: 19px;
    color: #c5c5c5;
    margin-right: 12px;
    line-height: 23px;
  }
`;
