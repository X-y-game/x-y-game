import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import GameItem from "../../components/Ingame/GameItem";
import GameCard from "../../components/Ingame/GameCard";
import RuleBook from "../../components/RuleBook";
import Modal from "../../components/Modal";
import {
  socket,
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
    socket.on("cur_result", (currentResult) => {
      setResultBoard(currentResult);
    });
    socket.on("cur_score", (currentScore) => {
      setScoreBoard(currentScore);
    });

    return () => {
      socket.off("join");
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
    socket.emit("select_card", roomName, team, currentRound, mycard);
    socket.on("show_round_score", (currentScore) => {
      setRoundScore(currentScore);
      setRoundDone(true);
    });
    socket.on("show_score", (allScore) => {
      setScoreBoard(allScore);
    });
    socket.on("show_select", (allSelect) => {
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
      <GameItems>
        {[1, 2, 3, 4].map((item) => (
          <GameItem id={item} team={team} key={`team_${item}`} isSubmitted={isSubmitted} mycard={mycard} />
        ))}
      </GameItems>
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
  background-color: #e0dede;
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

const GameItems = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px 0;
`;

const Cards = styled.label`
  display: flex;
  justify-content: center;
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
