import React from "react";
import styled from "styled-components";
import Proptypes from "prop-types";

export default function AdminPanelEntry({ title, placeholder }) {
  return (
    <Wrapper>
      <h2>{title}</h2>
      <ul>
        <li>
          <span>멋사 xy 화이팅!</span>
          <button type="button">삭제</button>
        </li>
        <input type="text" placeholder={placeholder} />
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #eeeeee;
  border: solid 1px #444444;
  border-radius: 5px;
  padding: 15px 10px;
  margin-top: 10px;
  box-shadow: 0 0 5px #22222277;

  h2 {
    padding-bottom: 5px;
    border-bottom: solid 1px #222222;
  }

  span,
  button {
    width: calc(75% - 10px);
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    line-height: 40px;
    background-color: #fbf2f2;
    color: #252940;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    margin-top: 15px;
    cursor: pointer;
  }

  span {
    display: inline-block;
    margin-right: 10px;
  }

  li > button {
    width: 25%;
  }

  input {
    font-size: 1rem;
    background: #22222233;
    border: #222222aa;
    border-radius: 3px;
    color: #222222;
    width: 100%;
    min-height: 25px;
    line-height: 25px;
    margin-top: 10px;
    padding: 0 5px;
    box-sizing: border-box;
  }
`;

AdminPanelEntry.propTypes = {
  title: Proptypes.string.isRequired,
  placeholder: Proptypes.string.isRequired,
};
