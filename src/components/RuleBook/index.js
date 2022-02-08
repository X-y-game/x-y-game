import React from "react";
import styled from "styled-components";
import ruleBook from "../../assets/rule.png";

export default function RuleBook() {
  return (
    <ModalDiv>
      <p>게임 규칙</p>
      <div>
        <img src={ruleBook} alt="rulebook" />
      </div>
    </ModalDiv>
  );
}

const ModalDiv = styled.div`
  width: 90vw;
  height: 90vh;
  margin: 0 auto;
  background-color: #e0e0e0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 20px;
  gap: 20px;
  p {
    font-size: 30px;
    font-weight: bold;
  }
  div {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  img {
    width: 80%;
    height: 80%;
  }
`;
