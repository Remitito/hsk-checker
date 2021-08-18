import styled from "styled-components";

const Container = styled.div `
  display: flex;
  background-color: #b30b0b;
  border-radius: 2rem;
  margin: 0 auto;
  border-width: 10px;
  border-style: solid;
  flex-direction: column;
  margin-top: 180px;
  height: 700px;
  border-color: orange;
  width: 700px;
  color: #fce1a4;
  text-decoration: none;
  text-align: center;
`

const NavBar = styled.div `
  position: fixed;
  top: 0;
  color: #fce1a4;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #b30b0b;
  width: 100%;
`
const SearchBar = styled.div `
  margin-top: 5%;
  margin-bottom: 30%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
`


export {Container, SearchBar, NavBar};