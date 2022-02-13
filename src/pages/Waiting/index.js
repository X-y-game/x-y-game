import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams, useLocation } from "react-router-dom";
import socket from "../../components/utils/socket";
import Team from "../../components/Team";
import Header from "../../components/Header";

export default function WaitingRoom() {
  const [isReady, setIsReady] = useState(false);
  const [team, setTeam] = useState(0);
  const [canStart, setCanStart] = useState(false);

  const location = useLocation();
  const { id } = useParams();
  const channelRoom = location.state.channel;

  const channelId = id.split("-")[0];
  const roomId = id.split("-")[1];
  const roomName = `${channelId}-${roomId}`;

  const history = useHistory();
  const handleStart = () => {
    history.push(`/game/:${roomName}-team${team}-1`);
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", roomName);
    });
  }, []);

  const handleReady = () => {
    if (window.confirm(`${team}팀으로 결정하시겠습니까?`)) {
      setIsReady(!isReady);
      socket.emit("select_team", channelId, roomId, roomName, team);
      socket.on("can_start", (c) => {
        setCanStart(c);
      });
    }
  };

  return (
    <Waiting>
      <Header title="팀 선택" channelId={channelRoom} roomId={channelRoom} />
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
      <StartBtn style={{ display: isReady && canStart ? "inline-block" : "none" }} onClick={handleStart}>
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
