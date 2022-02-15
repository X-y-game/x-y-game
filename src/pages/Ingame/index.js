/* eslint-disable no-plusplus */
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import GameItem from "../../components/GameItem";
import RuleBook from "../../components/RuleBook";
import Modal from "../../components/Modal";
import { socket, emitJoinTeam } from "../../components/utils/socket";

export default function Game() {
  // 중간/최종 결과
  function getMidResult(result, score, round) {
    const midResult = Array(round).fill(Array(4).fill(["", 0]));
    for (let r = 0; r < round; r++) {
      for (let i = 0; i < 4; i++) {
        midResult[r][i] = [result[r][i], score[r][i]];
      }
    }
    return midResult;
  }

  function getCurScore(score, round, team) {
    let teamScore = 0;
    if (score) {
      for (let r = 0; r < round; r++) {
        teamScore += score[r][team.slice(4) - 1];
      }
    }
    return teamScore;
  }

  const location = useLocation();
  const teamInfo = location.pathname.split(":")[1].split("-");
  const [channelId, roomId, team] = teamInfo.slice(0, 3);
  const roomName = `${channelId}-${roomId}`;
  let round = Number(teamInfo[3]);

  const [mycard, setMycard] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectBoard, setSelect] = useState(); // 전체 라운드 선택
  const [roundScore, setRoundScore] = useState(); // 라운드별 점수
  const [scoreBoard, setScoreBoard] = useState(); // 전체 라운드 점수
  const [resultBoard, setResultBoard] = useState(); // 전체 라운드 결과
  const [roundDone, setRoundDone] = useState(false); // 라운드 종료 체크
  const [curTeamScore, setCurTeamScore] = useState(0); // 현재 점수
  const history = useHistory();

  const [isRuleModal, setIsRuleModal] = useState(false);
  const [isBoardModal, setIsBoardModal] = useState(false);
  const [isCurrentModal, setIsCurrentModal] = useState(false);

  useEffect(() => {
    setRoundDone(false);
    setIsSubmitted(false);
    emitJoinTeam(roomName);

    return () => {
      socket.off("join");
    };
  }, []);

  useEffect(() => {
    if (selectBoard && roundScore) {
      // round 별 결과 모달 부분
      if (roundDone) {
        setIsCurrentModal(false);
        setIsBoardModal(true);
      }
      console.log(selectBoard[round - 1], roundScore);
    }
  }, [selectBoard, scoreBoard, roundDone]);

  useEffect(() => {
    if (scoreBoard && selectBoard) {
      // 중간 결과
      console.log(scoreBoard.slice(0, round), selectBoard.slice(0, round));
    }
  }, [isBoardModal]);

  const handleNext = () => {
    if (roundDone && round < 10) {
      setCurTeamScore(getCurScore(scoreBoard, round, team));
      setIsSubmitted(false);
      setMycard("");
      round += 1;
      history.push(`/game/:${roomName}-${team}-${round}`);
    }
    if (round === 10) {
      setIsBoardModal(true);
      console.log("done", selectBoard, scoreBoard);
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
      getMidResult(scoreBoard.slice(0, round), selectBoard.slice(0, round), round);
    }
  };

  const handleSelect = (e) => {
    setIsSubmitted(false);
    setMycard(e.target.htmlFor);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    socket.emit("select_card", roomName, team, round, mycard);
    socket.on("show_round_score", (curScore) => {
      setRoundScore(curScore);
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
      {isBoardModal && (
        <Modal
          handleClick={handleCurrentBoard}
          isInterim={isCurrentModal}
          selectCard={selectBoard[round - 1]}
          roundScore={roundScore}
          scoreBoard={scoreBoard}
          selectBoard={selectBoard}
          round={round}
        />
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
      <Cards>
        <Card id="X" name="choice" hidden defaultChecked={isSubmitted} />
        <CardLabel htmlFor="X" onClick={handleSelect}>
          X
        </CardLabel>
        <Card id="Y" name="choice" hidden defaultChecked={isSubmitted} />
        <CardLabel htmlFor="Y" onClick={handleSelect}>
          Y
        </CardLabel>
      </Cards>
      <Footer>
        <li>현재 점수 : {curTeamScore}</li>
        <li>
          {isSubmitted ? (
            <button type="button" onClick={handleNext}>
              {roundDone ? "다음으로" : "대기중"}
            </button>
          ) : (
            <button type="button" onClick={handleSubmit}>
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

const CardLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 10px;
  border-radius: 10px;
  background-color: #fbf2f2;
  font-size: 48px;
`;

const Card = styled.input.attrs({ type: "radio" })`
  &:checked + ${CardLabel} {
    box-shadow: #c1d0fb 2px 2px 1px 1px;
    background-color: ${(props) => (props.id === "X" ? "#c3e8fb" : "#ffb7b7")};
  }
`;

const Footer = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
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
