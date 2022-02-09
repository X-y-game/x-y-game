import React from "react";
import styled from "styled-components";

export default function InterimFindings() {
  return (
    <ModalDiv>
      <p>중간 결과</p>
      <WrapResult>
        <div className="teamtext">
          <p>1조</p>
          <p>2조</p>
          <p>3조</p>
          <p>4조</p>
        </div>
        <div className="wrapRound">
          <p>1R</p>
          <div className="team one">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team two">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team three">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team four">
            <span>X</span>
            <span>100</span>
          </div>
        </div>
        <div className="wrapRound">
          <p>2R</p>
          <div className="team one">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team two">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team three">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team four">
            <span>X</span>
            <span>100</span>
          </div>
        </div>
        <div className="wrapRound">
          <p>3R</p>
          <div className="team one">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team two">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team three">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team four">
            <span>X</span>
            <span>100</span>
          </div>
        </div>
        <div className="wrapRound">
          <p>4R</p>
          <div className="team one">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team two">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team three">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team four">
            <span>X</span>
            <span>100</span>
          </div>
        </div>
        <div className="wrapRound">
          <p>5R</p>
          <div className="team one">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team two">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team three">
            <span>X</span>
            <span>100</span>
          </div>
          <div className="team four">
            <span>X</span>
            <span>100</span>
          </div>
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
  padding: 20px;
  margin: 0 auto;
  overflow: scroll;
  p {
    font-size: 1em;
    font-weight: bold;
  }
`;

const WrapResult = styled.div`
  display: flex;
  height: 216px;
  flex-direction: column;
  padding: 10px;
  margin-top: 5px;
  background-color: #ffeae2;
  gap: 5px;
  overflow: scroll;
  .teamtext {
    display: flex;
    width: 80%;
    margin-left: 40px;
    justify-content: space-between;
  }
  .wrapRound {
    display: flex;
    align-items: center;
    .team {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 10px;
      padding: 0 5px;
      box-sizing: border-box;
      background-color: #c3e8fb;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;
