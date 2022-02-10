import React, { useState } from "react";
import styled from "styled-components";

export default function WaitingRoom() {
  const [isSelected, setIsSelected] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const toggleIsSelected = () => {
    setIsSelected(!isSelected);
  };

  const toggleIsReady = () => {
    setIsReady(!isReady);
  };

  const handleReady = (e) => {
    if (!isSelected) {
      e.target.disabled = true;
      return;
    }
    toggleIsReady();
  };

  const handleClickTeam = () => {
    toggleIsSelected();
  };

  return (
    <Waiting>
      <Header>팀 선택</Header>
      <Teams>
        <Team onClick={handleClickTeam} id="1">
          <TeamName>1</TeamName>
          <State>{isSelected ? "선택됨" : "대기"}</State>
        </Team>
        <Team onClick={handleClickTeam} id="2">
          <TeamName>3</TeamName>
          <State>{isSelected ? "선택됨" : "대기"}</State>
        </Team>
        <Team onClick={handleClickTeam} id="3">
          <TeamName>3</TeamName>
          <State>{isSelected ? "선택됨" : "대기"}</State>
        </Team>
        <Team onClick={handleClickTeam} id="4">
          <TeamName>4</TeamName>
          <State>{isSelected ? "선택됨" : "대기"}</State>
        </Team>
      </Teams>
      <Button onClick={handleReady} disabled={!isSelected}>
        {isReady ? "준비완료" : "준비하기"}
      </Button>
    </Waiting>
  );
}

const Waiting = styled.div`
  height: 100%;
  padding: 40px;
  background-color: #e0dede;
  text-align: center;
`;

const Header = styled.header`
  font-size: 28px;
  font-weight: 500;
`;

const Teams = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 40px 0;
`;

const Team = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: 100px;
  padding: 20px;
  margin: 10px;
  background-color: #c1d0fb;
  border-radius: 10px;
`;

const TeamName = styled.li`
  margin-bottom: 5px;
  font-size: 24px;
`;

const State = styled.li`
  background-color: #e0dede;
  border-radius: 10px;
  padding: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin-bottom: 30px;
  border: 2px solid #f2aeae;
  border-radius: 10px;
  background-color: #e0dede;
`;
