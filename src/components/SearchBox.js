import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useEffect } from "react/cjs/react.development";

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
        setSearchUsers(resp.data.users);
        console.log(resp.data.users);
      });
      req.catch((error) => console.log(error.response));
    } else {
      // com menos de 3 caracteres a lista de usuarios deve sumir
    } 
  },[searchInput]);
  
  return (
    <Container>
      <DebounceInput
        placeholder="Search for people and friends"
        className="caixa"
        minLength={3}
        debounceTimeout={300}
        onChange={(e) => setSearchInput(e.target.value)}
      ></DebounceInput>
      <UsersListBox>
          {searchUsers === "" ? "" : searchUsers.map((user) => (
            <User>
              <img
                src={user.avatar}
                alt=""
              />
              <h1>{user.username}</h1>
              <h2>{user.isFollowingLoggedUser ? "• following" : ""}</h2>
            </User>
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

  .caixa {
    width: 563px;
    height: 45px;
    background: #fff;
    border-radius: 8px;
    border: none;
    outline: none;
    margin-left: calc((100vw / 2) - 563px / 2);
    font-family: Lato;
    font-size: 19px;
    padding: 0 0 0 15px;
    color: gray;
    z-index: 1;
  }
`;

const UsersListBox = styled.ul`
  width: 563px;
  height: auto;
  background-color: #e7e7e7;
  margin-left: calc((100vw / 2) - 563px / 2);
  margin-top: -10px;
  padding-top: 20px;
  border-radius: 8px;
  padding-bottom: 3px;
`;

const User = styled.li`
  width: 100%;
  height: 50px;
  background-color: lightgreen;
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
