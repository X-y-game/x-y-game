import React, { useState } from "react";
import styled from "styled-components";

import Team from "../../components/Team";

export default function WaitingRoom() {
  const [isReady, setIsReady] = useState(false);
  const [team, setTeam] = useState(0);

  const handleReady = () => {
    setIsReady(!isReady);
    if (!isReady) {
      const myTeam = team;
    }
  };

  return (
    <Waiting>
      <Header>팀 선택</Header>
      <Teams htmlFor="team">
        {[1, 2, 3, 4].map((it) => (
          <Team id={it} key={`team_${it}`} setTeam={setTeam} setIsReady={setIsReady} />
        ))}
      </Teams>
      <Button style={{ backgroundColor: isReady ? "#f2aeae" : "#e0dede" }} onClick={handleReady}>
        {isReady ? "선택완료" : "선택하기"}
      </Button>
      <p style={{ display: isReady ? "block" : "none" }}>{team}팀을 선택했습니다</p>
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

const Teams = styled.label`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 40px 0;
`;

const Button = styled.button`
  padding: 10px;
  margin-bottom: 30px;
  border: 2px solid #f2aeae;
  border-radius: 10px;
  background-color: #e0dede;
`;
