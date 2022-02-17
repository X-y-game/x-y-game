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
  const [round, setRound] = useState(Number(teamInfo[3]));

  const [mycard, setMycard] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectBoard, setSelect] = useState();
  const [roundScore, setRoundScore] = useState();
  const [scoreBoard, setScoreBoard] = useState();
  const [roundDone, setRoundDone] = useState(false);
  const [currentTeamScore, setCurrentScore] = useState(0);
  const [isRuleModal, setIsRuleModal] = useState(false);
  const [isBoardModal, setIsBoardModal] = useState(false);
  const [isCurrentModal, setIsCurrentModal] = useState(false);
  const [isfinishResult, setisFinishResult] = useState(false);
  const [totalResult, setTotalResult] = useState({});

  useEffect(() => {
    setIsChecked(false);
    setRoundDone(false);
    setIsSubmitted(false);
    emitJoinTeam(roomName);
    socket.on("cur_result", (currentResult) => {
      setSelect(currentResult);
    });
    socket.on("cur_score", (currentScore) => {
      setScoreBoard(currentScore);
    });

    return () => {
      socket.off("join");
    };
  }, []);

  useEffect(() => {
    setCurrentScore(getCurrentScore(scoreBoard, round, team));
    if (selectBoard && roundScore) {
      if (roundDone) {
        setIsCurrentModal(false);
        setIsBoardModal(true);
      }
    }
  }, [selectBoard, scoreBoard, roundDone]);

  const handleNext = () => {
    if (roundDone) {
      setCurrentScore(getCurrentScore(scoreBoard, round, team));
      if (round === 10) {
        const totalScores = sumScores(scoreBoard);
        const totalResults = sumResults(scoreBoard);
        const teamData = { results: totalResults, scores: totalScores };
        const tableData = makeData(teamData);
        setTotalResult(tableData);
        setisFinishResult(true);
        setIsBoardModal(true);
        return;
      }
      setIsSubmitted(false);
      setRoundDone(false);
      setMycard("");
      setRound(round + 1);
      checkSpecialRound(round);
      history.push(`/game/:${roomName}-${team}-${round + 1}`);
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
    if (scoreBoard && selectBoard) {
      getMiddleResult(scoreBoard.slice(0, round), selectBoard.slice(0, round), round);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsChecked(false);
    socket.emit("select_card", roomName, team, round, mycard);
    socket.on("show_round_score", (currentScore) => {
      setRoundScore(currentScore);
      setRoundDone(true);
    });
    socket.on("show_score", (allScore) => {
      setScoreBoard(allScore);
    });
    socket.on("show_select", (allSelect) => {
      setSelect(allSelect);
    });
  };

  return (
    <InGame>
      {isRuleModal && <RuleBook handleClick={handleToggleRule} />}
      {isBoardModal && selectBoard ? (
        <Modal
          handleClick={handleCurrentBoard}
          isInterim={isCurrentModal}
          isfinishResult={isfinishResult}
          selectCard={selectBoard[round - 1]}
          roundScore={roundScore}
          scoreBoard={scoreBoard}
          selectBoard={selectBoard}
          round={round}
          totalResult={totalResult}
        />
      ) : (
        ""
      )}
      <Header>
        <li>{team}</li>
        <li>Round {round}</li>
        <li>
          <span
            style={{ display: round > 1 ? "inline" : "none" }}
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
