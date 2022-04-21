import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import JuaWoff from "./fonts/Jua-Regular.woff";
import JuaWoff2 from "./fonts/Jua-Regular.woff2";

export default createGlobalStyle`
  ${reset}
  @font-face {
    font-family: "Jua", sans-serif;
    src: url(${JuaWoff}) format("woff"), url(${JuaWoff2}) format("woff2")
  }
  * {
    font-size: inherit;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Jua", sans-serif;
    color: #343a40;
  }
  html, body, #root {
    width: 100%;
    height: 100%;
    font-family: "Jua", sans-serif;
    background-color: #f5e4d6;
  }
  a {
    text-decoration : none;
    color : inherit;
  }

  button {
    border : none;
    cursor : pointer;
  }

  table {
    border-collapse: collapse;
  }

th,td {
  text-align: center;
  padding: 0.5rem;
  border: 1px solid black;
}
caption {
  margin: 1em 0;
}
`;
