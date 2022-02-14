import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Team from "../../components/Team";
import Header from "../../components/Header";
import { getTeamsAPI } from "../../api/api";
import { socket, emitJoinTeam } from "../../components/utils/socket";

export default function WaitingRoom() {
  const [isReady, setIsReady] = useState(false);
  const [team, setTeam] = useState(0);
  const [canStart, setCanStart] = useState(false);
  const [teamList, setTeamList] = useState([]);

  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  const channelIndex = id.split("-")[0];
  const roomIndex = id.split("-")[1];
  const roomName = `${channelIndex}-${roomIndex}`;

  // 룸 아이디, 타이틀
  const roomDataInfo = location.state.roomData;
  const [roomTitle, roomDBID] = roomDataInfo.split("-");

  // 팀 가져오기 db
  async function getTeams() {
    const response = await (await getTeamsAPI(roomDBID)).json();
    setTeamList(response.teamLists);
  }

  const handleStart = () => {
    history.push(`/game/:${roomName}-team${team}-1`);
  };

  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    emitJoinTeam(roomName);

    return () => {
      socket.off("join");
    };
  }, []);

  const handleReady = () => {
    if (window.confirm(`${team}팀으로 결정하시겠습니까?`)) {
      setIsReady(!isReady);
      socket.emit("select_team", channelIndex, roomIndex, roomName, team);
      socket.on("can_start", (isStart) => {
        setCanStart(isStart);
      });
    }
  };

  // 아래처럼 바꿀필요 가 있음 현재, 56-58로 하나 아래처럼 64-71줄로 하나 동일 하지만 useEffect 내에서 처리해야하므로
  // statea만들어서 depenecty 배열에 넣어서 하면 될거 같다. 혹은 현재와 같이 해도 무리 없는 것은 첫 마운트시만 실행되는데, 서버단에서 조건이 충족되면 바로
  // emit해주니까 상관 없어 보임 . 소켓 쓸때는  44,50으로 dependency해줘서 클리어까지 깔끔하게 해주는게 좋다고함.
  useEffect(() => {
    socket.on("can_start", (isStart) => {
      setCanStart(isStart);
    });
    return () => {
      socket.off("can_start");
    };
  }, []);

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
