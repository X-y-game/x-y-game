import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TeamResult from "./teamResult";
import InterimFindings from "../InterimFindings";
import Result from "../Result/Container";

export default function Modal({
  handleToggleBoard,
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

  return (
    <>
      {!isfinishResult ? (
        <>
          <ModalDiv onClick={handleToggleBoard}>
            <p>{isInterim ? "중간 결과" : "라운드 결과"}</p>
            {isInterim ? (
              <InterimFindings scoreData={scoreBoard} selectData={selectBoard} round={round} />
            ) : (
              <WrapResult>
                {roundResultData().map((data) => (
                  <TeamResult key={`modal_${data.team}`} team={data.team} cardXY={data.cardXY} point={data.point} />
                ))}
              </WrapResult>
            )}
          </ModalDiv>
          <Dimmed onClick={handleToggleBoard}>dimmed</Dimmed>
        </>
      ) : (
        <ModalDiv>
          <p>최종결과</p>
          <Result tableData={totalResult} />
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
  padding: 15px;
  border-radius: 5px;
  background-color: #fbf2f2;
  text-align: center;
  z-index: 10;
  p {
    font-size: 1em;
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
  @media screen and (min-width: 600px) {
    height: 60vh;
  }
`;

const FinishMessage = styled.p`
  position: relative;
  top: 90vh;
  font-weight: bold;
  font-size: 20px;
`;

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 0;
`;

Modal.propTypes = {
  handleToggleBoard: PropTypes.func,
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
  handleToggleBoard: () => {},
  selectCard: "?",
  roundScore: 0,
  scoreBoard: [],
  selectBoard: [],
  isInterim: true,
  isfinishResult: false,
  round: 0,
  totalResult: {},
};
