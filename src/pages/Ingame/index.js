import React, { useState } from "react";
import styled from "styled-components";
import GameItem from "../../components/GameItem";
import RuleBook from "../../components/RuleBook";
import Modal from "../../components/Modal";

export default function Game() {
  const [mycard, setMycard] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isModal, setIsModal] = useState(false);
  const [isInterim, setIsInterim] = useState(false);

  const openRuleModal = () => {
    setIsModal(!isModal);
    setIsInterim(false);
  };

  const openInterimModal = () => {
    setIsInterim(!isInterim);
    setIsModal(false);
  };

  const handleSelect = (e) => {
    setIsSubmitted(false);
    setMycard(e.target.htmlFor);
  };

  const handleSubmit = (e) => {
    setIsSubmitted(true);
    // DB에 저장될 변수
    const myCard = mycard;
  };

  return (
    <InGame>
      {isModal ? <RuleBook handleClick={openRuleModal} /> : ""}
      {isInterim ? <Modal handleClick={openInterimModal} /> : ""}
      <Header>
        <li>Team 1</li>
        <li>Round 1</li>
        <li>
          <span aria-hidden="true" onClick={openInterimModal} onKeyDown={openInterimModal}>
            📊
          </span>
          <span aria-hidden="true" onClick={openRuleModal} onKeyDown={openRuleModal}>
            📒
          </span>
        </li>
      </Header>
      <GameItems>
        {[1, 2, 3, 4].map((item) => (
          <GameItem id={item} key={`team_${item}`} isSubmitted={isSubmitted} mycard={mycard} />
        ))}
      </GameItems>
      <Cards>
        <Card id="X" name="choice" hidden />
        <CardLabel htmlFor="X" onClick={handleSelect}>
          X
        </CardLabel>
        <Card id="Y" name="choice" hidden />
        <CardLabel htmlFor="Y" onClick={handleSelect}>
          Y
        </CardLabel>
      </Cards>
      <Footer>
        <li>현재 점수 : 100</li>
        <li>
          <button type="button" onClick={handleSubmit}>
            {isSubmitted ? "제출완료" : "제출하기"}
          </button>
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
