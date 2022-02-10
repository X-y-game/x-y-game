import React, { useState } from "react";
import styled from "styled-components";

export default function WaitingRoom() {
  const [isSelected, setIsSelected] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const toggleIsSelected = () => setIsSelected(!isSelected);
  const toggleIsReady = () => setIsReady(!isReady);

  const handleReady = (e) => {
    if (!isSelected) {
      e.target.disabled = true;
      console.log(e.target);
      return;
    }
    toggleIsReady();
    console.log(isReady);
  };

  const handleClickTeam = (e) => {
    console.log(e.currentTarget.id);
    toggleIsSelected();
  };

  return (
    <Waiting>
      <Header>팀 선택</Header>
      <Teams>
        <Team onClick={handleClickTeam} id="1">
          <TeamName>1</TeamName>
          {/* <Users>
            <User>🙆</User>
            <User>🙆</User>
            <User>🙆</User>
            <User>🙆</User>
          </Users> */}
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
  text-align: center;
  background-color: #e0dede;
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
  background-color: #c1d0fb;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
`;

const TeamName = styled.li`
  font-size: 24px;
  margin-bottom: 5px;
`;

// const Users = styled.ul`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 5px;
// `;
// const User = styled.li`
//   font-size: 24px;
// `;

const State = styled.li`
  background-color: #e0dede;
  border-radius: 10px;
  padding: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid #f2aeae;
  background-color: #e0dede;
  border-radius: 10px;
  margin-bottom: 30px;
`;
