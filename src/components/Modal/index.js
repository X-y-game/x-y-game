import React from "react";
import styled from "styled-components";

export default function Modal() {
  return (
    <ModalDiv>
      <p>라운드 결과</p>
      <WrapResult>
        <div className="teamResult">
          <p>1조</p>
          <div className="selectCard xCard">X</div>
          <p>+ 100</p>
        </div>
        <div className="teamResult">
          <p>2조</p>
          <div className="selectCard yCard">Y</div>
          <p>- 100</p>
        </div>
        <div className="teamResult">
          <p>3조</p>
          <div className="selectCard xCard">X</div>
          <p>+ 100</p>
        </div>
        <div className="teamResult">
          <p>4조</p>
          <div className="selectCard xCard">X</div>
          <p>+ 100</p>
        </div>
      </WrapResult>
    </ModalDiv>
  );
}

const ModalDiv = styled.div`
  background-color: #e0e0e0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 20px;
  margin: 0 auto;
  gap: 20px;
  p {
    font-size: 24px;
    font-weight: bold;
  }
`;

const WrapResult = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 20px;
  .teamResult {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffeae2;
    padding: 10px;
    gap: 20px;
  }
  .selectCard {
    display: flex;
    width: 50%;
    background-color: #c3e8fb;
    justify-content: center;
    align-items: center;
    font-size: 2em;
  }
  .yCard {
    background-color: #ffb7b7;
`;
