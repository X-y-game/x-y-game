import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import socket from "../../components/utils/socket";
import Team from "../../components/Team";

export default function WaitingRoom() {
  const [isReady, setIsReady] = useState(false);
  const [team, setTeam] = useState(0);
  const [canStart, setCanStart] = useState(false);

  const channelId = 1;
  const roomId = 1;
  const roomName = `${channelId}-${roomId}-${team}`;

  const history = useHistory();
  const handleOnClickStart = () => {
    history.push(`/game/:${roomName}-team${team}`);
  };

  useEffect(() => {
    socket.on("connect", () => {});
    socket.emit("join", roomName);
  }, []);

  useEffect(() => {
    socket.emit("check_teams_ready", roomName);
    socket.on("can_start", (c) => {
      setCanStart(c);
    });
  }, [isReady, canStart]);

  const handleReady = () => {
    if (window.confirm(`${team}팀으로 결정하시겠습니까?`)) {
      setIsReady(!isReady);
      if (!isReady) {
        socket.emit("select_team", channelId, roomId, roomName, team);
      }
    }
  };

  return (
    <Waiting>
      <Header>팀 선택</Header>
      <Teams htmlFor="team" style={{ display: isReady ? "none" : "grid" }}>
        {[1, 2, 3, 4].map((it) => (
          <Team id={it} key={`team_${it}`} setTeam={setTeam} isReady={isReady} handleReady={handleReady} />
        ))}
      </Teams>
      <Button
        style={{ backgroundColor: isReady ? "#f2aeae" : "#e0dede", display: isReady ? "none" : "inline" }}
        onClick={handleReady}
      >
        선택하기
      </Button>
      <div style={{ display: isReady ? "block" : "none", margin: "10px" }}>
        <strong style={{ display: "block", fontSize: "18px", fontWeight: "700", margin: "20px" }}>
          {team}팀을 선택했습니다
        </strong>
        {canStart ? (
          <div>
            모든 팀의 선택이 완료되었습니다
            <br /> 게임을 시작해봅시다 <br />
          </div>
        ) : (
          <div>
            다른 팀의 접속을 기다리는 중입니다
            <br /> 잠시만 기다려주세요 <br />
          </div>
        )}
      </div>
      <StartBtn style={{ display: isReady && canStart ? "inline-block" : "none" }} onClick={handleOnClickStart}>
        게임 시작
      </StartBtn>
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

const StartBtn = styled.button`
  padding: 10px;
  margin: 20px;
  border: 2px solid #f2aeae;
  border-radius: 10px;
  background-color: #e0dede;
`;
