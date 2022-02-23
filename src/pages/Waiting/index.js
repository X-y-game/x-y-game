import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Team from "../../components/Team";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import { getSocket, emitJoinTeam, getTeams } from "../../utils";

export default function WaitingRoom() {
  const [isReady, setIsReady] = useState(false);
  const [team, setTeam] = useState(0);
  const [canStart, setCanStart] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);

  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  const channelIndex = id.split("-")[0];
  const roomIndex = id.split("-")[1];
  const roomName = `${channelIndex}-${roomIndex}`;

  const roomDataInfo = location.state.roomData;
  const [roomTitle, roomDBID] = roomDataInfo.split("-");

  const handleStart = () => {
    history.push(`/game/:${roomName}-team${team}-${currentRound}`);
  };

  useEffect(async () => {
    setTeamList(await getTeams(roomDBID));
    emitJoinTeam(roomName);
    getSocket.on("cur_round", (round) => {
      setCurrentRound(round);
    });
    getSocket.on("can_start", (isStart) => {
      setCanStart(isStart);
    });

    return () => {
      getSocket.off("join");
      getSocket.off("can_start");
    };
  }, []);

  const handleReady = () => {
    if (window.confirm(`${team}팀으로 결정하시겠습니까?`)) {
      setIsReady(!isReady);
      getSocket.emit("select_team", channelIndex, roomIndex, roomName, team);
    }
  };

  return (
    <Waiting>
      <Header title="팀 선택" channel={channelIndex} roomId={roomTitle} />
      <Teams htmlFor="team" style={{ display: isReady ? "none" : "grid" }}>
        {teamList?.map(({ _id, title }, index) => (
          <Team
            id={index + 1}
            key={`team_${_id}`}
            setTeam={setTeam}
            isReady={isReady}
            handleReady={handleReady}
            title={title}
          />
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
            <p>모든 팀의 선택이 완료되었습니다</p>
            <p>게임을 시작해봅시다</p>
          </div>
        ) : (
          <div>
            <p>다른 팀의 접속을 기다리는 중입니다</p>
            <p>잠시만 기다려주세요</p>
            <Loading>
              <Spinner />
            </Loading>
          </div>
        )}
      </div>
      <StartBtn style={{ display: isReady && canStart ? "inline-block" : "none" }} onClick={handleStart}>
        게임 시작
      </StartBtn>
    </Waiting>
  );
}

const Loading = styled.div`
  position: relative;
  top: 20px;
  right: 20px;
`;

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
