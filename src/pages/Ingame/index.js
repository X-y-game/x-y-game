import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import GameItem from "../../components/GameItem";
import RuleBook from "../../components/RuleBook";
import Modal from "../../components/Modal";
import { socket } from "../../components/utils/socket";

export default function Game() {
  const location = useLocation();
  const teamInfo = location.pathname.split(":")[1].split("-");
  const [channelId, roomId, team] = teamInfo.slice(0, 3);
  const roomName = `${channelId}-${roomId}`;
  let round = Number(teamInfo[3]);

  const [mycard, setMycard] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [roundSelect, setRoundSelect] = useState([]); // 라운드별 선택
  const [roundScore, setRoundScore] = useState([]); // 라운드 점수
  const [roundDone, setRoundDone] = useState(false); // 라운드 종료 상태
  const history = useHistory();

  const [isRuleModal, setIsRuleModal] = useState(false);
  const [isBoardModal, setIsBoardModal] = useState(false);

  useEffect(() => {
    socket.emit("join", roomName);
  }, []);

  // 리렌더링 테스트
  useEffect(() => {
    console.log(roundSelect);
  }, [roundSelect]);

  // 리렌더링 테스트
  useEffect(() => {
    console.log(roundDone);
    // 최종 라운드가 아닌 경우 테스트
    if (round < 10) {
      socket.emit("get_score", (roomName, "all", round));
      // 리렌더링 필요. 테스트 필요
      socket.on("show_score", (results) => {
        console.log(results);
      });
    }
  }, [roundDone]);

  // 중간결과. 테스트 필요
  useEffect(() => {
    console.log(isBoardModal);
    socket.emit("get_score", (roomName, team, round));
    socket.on("show_score", (results) => {
      console.log(results);
    });
  }, [isBoardModal]);

  const handleNext = () => {
    // 라운드 종료 확인
    if (roundDone) {
      // 최종 라운드
      if (round === 10) {
        socket.emit("get_score", (roomName, "all", round));
        // 리렌더링 필요. 테스트 필요
        socket.on("show_score", (results) => {
          console.log(results);
        });
      }
      // 아래에서 라운드가 넘어갈 때
      // 선택된 카드(라디오버튼)가 초기화되어야함
      setIsSubmitted(false);
      setMycard("");
      round += 1;
      history.push(`/game/:${roomName}-${team}-${round}`);
    } else {
      // line 39-44가 실행되어야합니다
      console.log(roundScore);
    }
  };

  const handleToggleRule = () => {
    setIsRuleModal(!isRuleModal);
    setIsBoardModal(isBoardModal && false);
  };

  const handleCurrentBoard = () => {
    setIsBoardModal(!isBoardModal);
    setIsRuleModal(isRuleModal && false);
  };

  const handleSelect = (e) => {
    setIsSubmitted(false);
    setMycard(e.target.htmlFor);
  };

  // 카드 제출. 리렌더링 테스트 필요
  const handleSubmit = () => {
    setIsSubmitted(true);
    socket.emit("select_card", roomName, team, round, mycard);
    socket.on("show_round_result", (results, roundResult) => {
      setRoundSelect(results);
      setRoundScore(roundResult);
      setRoundDone(true);
    });
  };

  return (
    <InGame>
      {isRuleModal && <RuleBook handleClick={handleToggleRule} />}
      {isBoardModal && <Modal handleClick={handleCurrentBoard} />}
      <Header>
        <li>{team}</li>
        <li>Round {round}</li>
        <li>
          <span aria-hidden="true" onClick={handleCurrentBoard} onKeyDown={handleCurrentBoard}>
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
        <li>현재 점수 : 100</li>
        <li>
          {isSubmitted ? (
            <button type="button" onClick={handleNext}>
              {roundDone ? "다음 라운드로" : "결과보기"}
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
