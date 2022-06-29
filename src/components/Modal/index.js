/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TeamResult from "./teamResult";
import CurrentResult from "../CurrentResult";

export default function Modal({
  handleToggleBoard,
  selectCard,
  roundScore,
  isCurrentResult,
  scoreBoard,
  selectBoard,
  round,
  isFinishResult,
  handleFinishedModal,
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
      {!isFinishResult ? (
        <>
          <ModalDiv
            onClick={() => {
              if (isCurrentResult) {
                handleToggleBoard();
              }
            }}
          >
            <TextResult>{isCurrentResult ? "중간 결과" : "라운드 결과"}</TextResult>
            {isCurrentResult ? (
              <CurrentResult
                scoreData={scoreBoard}
                selectData={selectBoard}
                round={round}
                isFinishResult={isFinishResult}
              />
            ) : (
              <WrapResult>
                {roundResultData().map((data) => (
                  <TeamResult
                    key={`modal_${data.team}`}
                    team={data.team}
                    cardXY={data.cardXY}
                    point={data.point}
                    round={round}
                    handleFinishedModal={handleFinishedModal}
                  />
                ))}
              </WrapResult>
            )}
          </ModalDiv>
          <Dimmed
            onClick={() => {
              if (isCurrentResult) {
                handleToggleBoard();
              }
            }}
          >
            dimmed
          </Dimmed>
        </>
      ) : (
        <>
          <ModalDiv>
            <TextResult>최종결과</TextResult>
            <CurrentResult
              scoreData={scoreBoard}
              selectData={selectBoard}
              round={round}
              isFinishResult={isFinishResult}
            />
          </ModalDiv>
          <Dimmed>dimmed</Dimmed>
        </>
      )}
      <FinishMessage>{isFinishResult ? "게임이 종료 되었습니다!" : ""}</FinishMessage>
    </>
  );
}

const ModalDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  gap: 1em;
  width: 100vw;
  height: 100vh;
  padding: 1em;
  overflow: hidden;
  border-radius: 5px;
  background-color: #54628c;
  text-align: center;
  z-index: 10;
`;

const TextResult = styled.p`
  color: #fff;
  font-size: 2em;
`;

const WrapResult = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 1em 5em 10em 5em;
  /* @media screen and (min-width: 600px) {
    height: 60vh;
  } */
`;

const FinishMessage = styled.p`
  position: relative;
  top: 50vh;
  font-size: 20px;
  color: #fff;
`;

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-size: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

Modal.propTypes = {
  handleToggleBoard: PropTypes.func,
  selectCard: PropTypes.arrayOf(PropTypes.string),
  roundScore: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  scoreBoard: PropTypes.arrayOf(PropTypes.array),
  selectBoard: PropTypes.arrayOf(PropTypes.array),
  isCurrentResult: PropTypes.bool,
  round: PropTypes.number,
  isFinishResult: PropTypes.bool,
  handleFinishedModal: PropTypes.func,
};

Modal.defaultProps = {
  handleToggleBoard: () => {},
  selectCard: "?",
  roundScore: 0,
  scoreBoard: [],
  selectBoard: [],
  isCurrentResult: true,
  isFinishResult: false,
  round: 0,
  handleFinishedModal: () => {},
};
