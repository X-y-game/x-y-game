import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import GameItem from "../../components/Ingame/GameItem";
import GameCard from "../../components/Ingame/GameCard";
import RuleBook from "../../components/RuleBook";
import Modal from "../../components/Modal";
import {
  getSocket,
  emitJoinTeam,
  getMiddleResult,
  getCurrentScore,
  sumScores,
  sumResults,
  makeData,
  checkSpecialRound,
} from "../../utils";

export default function Game() {
  const history = useHistory();
  const location = useLocation();
  const teamInfo = location.pathname.split(":")[1].split("-");
  const [channelId, roomId, team] = teamInfo.slice(0, 3);
  const roomName = `${channelId}-${roomId}`;
  const [currentRound, setCurrentRound] = useState(Number(teamInfo[3]));

  const [mycard, setMycard] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [resultBoard, setResultBoard] = useState();
  const [roundScore, setRoundScore] = useState();
  const [scoreBoard, setScoreBoard] = useState();
  const [roundDone, setRoundDone] = useState(false);
  const [currentTeamScore, setCurrentScore] = useState(0);
  const [isRuleModal, setIsRuleModal] = useState(false);
  const [isBoardModal, setIsBoardModal] = useState(false);
  const [isCurrentModal, setIsCurrentModal] = useState(false);
  const [isFinishedResult, setIsFinishedResult] = useState(false);
  const [totalResult, setTotalResult] = useState({});

  useEffect(() => {
    setIsChecked(false);
    setRoundDone(false);
    setIsSubmitted(false);
    emitJoinTeam(roomName);
    getSocket.on("cur_result", (currentResult) => {
      setResultBoard(currentResult);
    });
    getSocket.on("cur_score", (currentScore) => {
      setScoreBoard(currentScore);
    });

    return () => {
      getSocket.off("join");
    };
  }, []);

  useEffect(() => {
    setCurrentScore(getCurrentScore(scoreBoard, currentRound, team));
    if (resultBoard && roundScore) {
      if (roundDone) {
        setIsCurrentModal(false);
        setIsBoardModal(true);
      }
    }
  }, [resultBoard, scoreBoard, roundDone]);

  const handleNext = () => {
    if (roundDone) {
      setCurrentScore(getCurrentScore(scoreBoard, currentRound, team));
      if (currentRound === 10) {
        const totalScores = sumScores(scoreBoard);
        const totalResults = sumResults(scoreBoard);
        const teamData = { results: totalResults, scores: totalScores };
        const tableData = makeData(teamData);
        setTotalResult(tableData);
        setIsFinishedResult(true);
        setIsBoardModal(true);
        return;
      }
      setIsSubmitted(false);
      setRoundDone(false);
      setMycard("");
      setCurrentRound(currentRound + 1);
      checkSpecialRound(currentRound);
      history.push(`/game/:${roomName}-${team}-${currentRound + 1}`);
    }
  };

  const handleToggleRule = () => {
    setIsRuleModal(!isRuleModal);
    setIsBoardModal(isBoardModal && false);
  };

  const handleCurrentBoard = () => {
    setIsCurrentModal(true);
    setIsBoardModal(!isBoardModal);
    setIsRuleModal(isRuleModal && false);
    if (scoreBoard && resultBoard) {
      getMiddleResult(scoreBoard.slice(0, currentRound), resultBoard.slice(0, currentRound), currentRound);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsChecked(false);
    getSocket.emit("select_card", roomName, team, currentRound, mycard);
    getSocket.on("show_round_score", (currentScore) => {
      setRoundScore(currentScore);
      setRoundDone(true);
    });
    getSocket.on("show_score", (allScore) => {
      setScoreBoard(allScore);
    });
    getSocket.on("show_select", (allSelect) => {
      setResultBoard(allSelect);
    });
  };

  return (
    <InGame>
      {isRuleModal && <RuleBook handleClick={handleToggleRule} />}
      {isBoardModal && resultBoard ? (
        <Modal
          handleToggleBoard={handleCurrentBoard}
          isCurrentResult={isCurrentModal}
          isFinishResult={isFinishedResult}
          selectCard={resultBoard[currentRound - 1]}
          roundScore={roundScore}
          scoreBoard={scoreBoard}
          selectBoard={resultBoard}
          round={currentRound}
          totalResult={totalResult}
        />
      ) : (
        ""
      )}
      <Header>
        <li>{team}</li>
        <li>Round {currentRound}</li>
        <li>
          <span
            style={{ display: currentRound > 1 ? "inline" : "none" }}
            aria-hidden="true"
            onClick={handleCurrentBoard}
            onKeyDown={handleCurrentBoard}
          >
            📊
          </span>
          <span aria-hidden="true" onClick={handleToggleRule} onKeyDown={handleToggleRule}>
            📒
          </span>
        </li>
      </Header>
      <SelectCard style={{ display: isSubmitted ? "flex" : "none" }} name={mycard}>
        <p>{mycard}</p>
      </SelectCard>
      <Cards style={{ display: isSubmitted ? "none" : "flex" }}>
        {["X", "Y"].map((item) => (
          <GameCard
            key={`card_${item}`}
            card={item}
            setIsSubmitted={setIsSubmitted}
            setMycard={setMycard}
            setIsChecked={setIsChecked}
            isChecked={isChecked}
          />
        ))}
      </Cards>
      <Footer>
        <li>현재 점수 : {currentTeamScore}</li>
        <li>
          {isSubmitted ? (
            <button type="button" onClick={handleNext}>
              {roundDone ? "다음으로" : "대기중"}
            </button>
          ) : (
            <button type="submit" disabled={!mycard} onClick={handleSubmit}>
              제출하기
            </button>
          )}
        </li>
      </Footer>
    </InGame>
  );
}

const InGame = styled.div`
  height: 100%;
  padding: 20px;
  text-align: center;
`;

const Header = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 24px;
  font-weight: 700;

  li:first-child {
    font-size: 18px;
  }

  span {
    margin: 3px;
    cursor: pointer;
  }
`;

const Cards = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
`;

const cardAnim = keyframes`
  0%{
    transform: translate(-50%, 50%);
  }
  100%{
    transform: translate(-50%, 0%);
  }
`;

const SelectCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);

  width: 2.5em;
  height: 4em;
  border-radius: 10px;
  background-color: ${(props) => (props.name === "X" ? "#c3e8fb" : "#ffb7b7")};
  box-shadow: #c1d0fb 2px 2px 1px 1px;
  font-size: 48px;
  color: #343a40;

  animation: ${cardAnim} 1s forwards;
`;

const Footer = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  left: 0vw;
  bottom: 10%;
  width: 100vw;
  padding: 10px;
  font-weight: 500;
  font-size: 18px;
  button {
    padding: 5px;
    border: 3px solid #c1d0fb;
    border-radius: 10px;
    font-size: 14px;
  }
`;
