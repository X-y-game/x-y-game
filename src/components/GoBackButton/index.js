import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function GoBackButton() {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };
  return (
    <BackButton type="button" onClick={handleClick}>
      <em>Back</em>
    </BackButton>
  );
}

const BackButton = styled.button`
  position: absolute;
  left: 2px;
  top: 6vh;
  margin-top: -35px;
  border-top: 10px solid transparent;
  border-right: 20px solid #252940;
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
  background-color: inherit;
  em {
    position: absolute;
    width: 20px;
    top: 10px;
    font-size: 10px;
  }
  @media screen and (min-width: 600px) {
    left: 20px;
    top: 7vh;
    border-top: 15px solid transparent;
    border-right: 25px solid #252940;
    border-bottom: 15px solid transparent;
    border-left: 15px solid transparent;
    em {
      width: 30px;
      top: 15px;
    }
  }
`;
