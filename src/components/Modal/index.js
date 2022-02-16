import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TeamResult from "./teamResult";
import InterimFindings from "../InterimFindings";
import Result from "../Result/Container";

export default function Modal({
  handleClick,
  selectCard,
  roundScore,
  isInterim,
  scoreBoard,
  selectBoard,
  round,
  isfinishResult,
  totalResult,
}) {
  const roundResultData = () => {
    const pushData = [];
    for (let i = 0; i < 4; i += 1) {
      pushData.push({
        team: i + 1,
        cardXY: selectCard[i],
        point: roundScore[i],
      });
    }
    return pushData;
  };

  const [isRoundModal, setIsRoundModal] = useState(isInterim);

  const roundResult = () => {
    setIsRoundModal(false);
  };

  return (
    <>
      {!isfinishResult ? (
        <ModalDiv onClick={handleClick}>
          <p>{isRoundModal ? "중간 결과" : "라운드 결과"}</p>
          {isRoundModal ? (
            <InterimFindings scoreData={scoreBoard} selectData={selectBoard} round={round} />
          ) : (
            <WrapResult>
              {roundResultData().map((it) => (
                <TeamResult key={`modal_${it.team}`} team={it.team} cardXY={it.cardXY} point={it.point} />
              ))}
            </WrapResult>
          )}
        </ModalDiv>
      ) : (
        <ModalDiv>
          <p>최종결과</p>
          <Result />
        </ModalDiv>
      )}
      <FinishMessage>{isfinishResult ? "게임이 종료 되었습니다!" : ""}</FinishMessage>
    </>
  );
}

const ModalDiv = styled.div`
  position: absolute;
  top: 10vh;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background-color: #fbf2f2;
  text-align: center;
  p {
    font-size: 1.5em;
    font-weight: bold;
  }
  button {
    position: absolute;
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
  .wrapCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 40%;
    height: 100%;
    padding: 10px;
    background-color: #c1d0fb;
  }
`;

const FinishMessage = styled.p`
  position: relative;
  top: 90vh;
  font-weight: bold;
  font-size: 20px;
`;

Modal.propTypes = {
  handleClick: PropTypes.func,
  selectCard: PropTypes.arrayOf(PropTypes.string),
  roundScore: PropTypes.arrayOf(PropTypes.number),
  scoreBoard: PropTypes.arrayOf(PropTypes.array),
  selectBoard: PropTypes.arrayOf(PropTypes.array),
  isInterim: PropTypes.bool,
  round: PropTypes.number,
  isfinishResult: PropTypes.bool,
  totalResult: PropTypes.arrayOf(Object),
};

Modal.defaultProps = {
  handleClick: () => {},
  selectCard: "?",
  roundScore: 0,
  scoreBoard: [],
  selectBoard: [],
  isInterim: true,
  isfinishResult: false,
  round: 0,
  totalResult: {},
};
