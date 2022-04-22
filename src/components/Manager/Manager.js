import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getChannels } from "../../utils/api";
import { getSocket } from "../../utils/socket";

export default function Manager() {
  const [channels, setChannels] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getChannels(setChannels);
    getSocket.on("info", (data) => {
      setInfo(data);
    });
    return () => {
      getSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);

  const handleNextRound = (e) => {
    getSocket.emit("control", { roomName: e.target.value, round: info.curRound[e.target.value] + 1 });
    return () => {
      getSocket.disconnect();
    };
  };

  const handleStart = (e) => {
    getSocket.emit("control", { roomName: e.target.value, round: 1 });
    return () => {
      getSocket.disconnect();
    };
  };

  const handleReset = (e) => {
    getSocket.emit("reset", e.target.value);
    return () => {
      getSocket.disconnect();
    };
  };

  const handleModal = (e) => {
    getSocket.emit("modal", e.target.value);
    return () => {
      getSocket.disconnect();
    };
  };

  return (
    <Controller>
      <table>
        <thead>
          <tr>
            <td>채널명</td>
            <td>게임룸명</td>
            <td>게임 시작 하기</td>
            <td>진행중인 라운드</td>
            <td>라운드 결과 띄우기</td>
            <td>다음 라운드로 넘어가기</td>
            <td>게임 초기화</td>
          </tr>
        </thead>
        <tbody>
          {info !== null &&
            channels !== null &&
            Object.keys(info.activeRooms).map((v) => {
              const [channelId, roomId] = v.split("-");
              return (
                <tr>
                  <td>{channels.channelLists[channelId - 1].title}</td>
                  <td>{roomId}</td>
                  <td>
                    <button type="button" onClick={handleStart} value={v}>
                      게임 시작 버튼
                    </button>
                  </td>
                  <td>{info.curRound[v]}</td>
                  <td>
                    <button type="button" onClick={handleModal} value={v}>
                      라운드 결과 모달 띄우기
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={handleNextRound} value={v}>
                      다음 라운드로
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={handleReset} value={v}>
                      게임 룸 초기화
                    </button>
                  </td>
                  {/* <td> {info.results[v]}{info.scores[v] && info.scores[v][info.curRound[v] - 1]}</td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </Controller>
  );
}

const Controller = styled.article`
  thead {
    background-color: #999999;
  }
`;
