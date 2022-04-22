import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  ${reset}
  * {
    font-size: inherit;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: #343a40;
  }
  html, body, #root {
    width: 100%;
    height: 100%;
    background-color: #f5e4d6;
    font-family: 'Jua', sans-serif;
  }
  a {
    text-decoration : none;
    color : inherit;
  }

  button {
    border : none;
    cursor : pointer;
    font-family: 'Jua', sans-serif;
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
