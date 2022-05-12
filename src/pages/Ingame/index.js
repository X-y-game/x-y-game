import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import GameCard from "../../components/Ingame/GameCard";
import RuleBook from "../../components/RuleBook";
import Modal from "../../components/Modal";
import {
  getSocket,
  emitJoinTeam,
  getCurrentScore,
  sumScores,
  sumResults,
  makeData,
  checkSpecialRound,
} from "../../utils";
import soundPlay from "../../utils/sound";

export default function Game() {
  const history = useHistory();
  const location = useLocation();
  const roomName = location.pathname.split(":")[1];
  const team = localStorage.getItem("team");
  const [currentRound, setCurrentRound] = useState(0);

  const [mycard, setMycard] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [resultBoard, setResultBoard] = useState();
  const [roundScore, setRoundScore] = useState(0);
  const [scoreBoard, setScoreBoard] = useState();
  const [roundDone, setRoundDone] = useState(false);
  const [currentTeamScore, setCurrentScore] = useState(0);

  const [isRuleModal, setIsRuleModal] = useState(false);
  const [isBoardModal, setIsBoardModal] = useState(false);
  const [isCurrentModal, setIsCurrentModal] = useState(false);
  const [isFinishedResult, setIsFinishedResult] = useState(false);
  const [totalResult, setTotalResult] = useState({});

  useEffect(() => {
    if (team === null) {
      history.push("/");
    }

    emitJoinTeam(roomName);
    getSocket.on("cur_round", (curRound) => {
      setCurrentRound(curRound[roomName]);
      setIsSubmitted(false);
    });
    getSocket.on("cur_result", (currentResult) => {
      setResultBoard(currentResult);
      if (resultBoard) setMycard(resultBoard[currentRound - 1][team - 1]);
    });
    getSocket.on("cur_score", (currentScore) => {
      setScoreBoard(currentScore);
    });
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
    getSocket.on("room_info", (roomInfo) => {
      setCurrentRound(roomInfo.roomCurRound);
      setResultBoard(roomInfo.roomResult);
      setScoreBoard(roomInfo.roomScore);
    });
    getSocket.on("openModal", () => {
      soundPlay("result");
      setIsCurrentModal(false);
      setIsBoardModal(true);
      setRoundDone(false);
      setMycard("");
    });

    return () => {
      getSocket.off("join");
    };
  }, []);

  useEffect(() => {
    setIsBoardModal(false);
    setCurrentScore(getCurrentScore(scoreBoard, currentRound, team));
  }, [currentRound]);

  useEffect(() => {
    if (roundDone) {
      if (currentRound === 10) {
        const totalScores = sumScores(scoreBoard);
        const totalResults = sumResults(scoreBoard);
        const teamData = { results: totalResults, scores: totalScores };
        const tableData = makeData(teamData);
        setTotalResult(tableData);
      }
    }
  }, [resultBoard, scoreBoard, roundDone]);

  useEffect(() => {
    if (isSubmitted) soundPlay("submit");
    else soundPlay("click");
  }, [mycard]);

  useEffect(() => {
    if (resultBoard) {
      if (resultBoard[currentRound - 1][team - 1] !== "") {
        setMycard(resultBoard[currentRound - 1][team - 1]);
        setIsSubmitted(true);
      }
    }
  }, [resultBoard]);

  const handleToggleRule = () => {
    setIsRuleModal(!isRuleModal);
    setIsBoardModal(isBoardModal && false);
  };

  const handleCurrentBoard = () => {
    setIsCurrentModal(true);
    setIsBoardModal(!isBoardModal);
    setIsRuleModal(isRuleModal && false);
  };

  const handleSubmit = () => {
    soundPlay("submit");
    setIsSubmitted(true);
    setIsChecked(false);
    getSocket.emit("select_card", roomName, team, currentRound, mycard);
  };

  const handleFinishedModal = () => {
    setIsFinishedResult(true);
    setIsBoardModal(true);
  };

  return (
    <InGame>
      {isRuleModal && <RuleBook handleClick={handleToggleRule} />}
      {isBoardModal && resultBoard && (
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
          handleFinishedModal={handleFinishedModal}
        />
      )}
      <Header>
        <li>Team{team}</li>
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
      <Rule>{checkSpecialRound(currentRound)}</Rule>
      <SelectCard style={{ display: isSubmitted ? "flex" : "none" }} name={mycard}>
        <p>{mycard}</p>
      </SelectCard>
      <WrapCardsLabel>
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
      </WrapCardsLabel>

      <Footer>
        <li>현재 점수 : {currentTeamScore}</li>
        <li>
          {!isSubmitted && (
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
  overflow: hidden;
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

const Rule = styled.article`
  margin-top: 10px;
  color: brown;
`;

const WrapCardsLabel = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cards = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
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
