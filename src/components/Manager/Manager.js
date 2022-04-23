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
            <td>4팀 참여 정보</td>
            <td>라운드 정보</td>
            <td>카드 선택 현황</td>
            <td>라운드 결과 보여주기</td>
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
                <>
                  <tr key={`tr1_${v}`}>
                    <td>{channels.channelLists[channelId - 1].title}</td>
                    <td>{roomId}</td>
                    <td>
                      {info.activeRooms[v].map((team) => {
                        return team === 1 ? "O" : "X";
                      })}
                    </td>
                    <td>{info.curRound[v]}R</td>
                    <td>{info?.results[v] ? info?.results[v][info.curRound[v] - 1] : null}</td>
                    <td>
                      <button type="button" onClick={handleModal} value={v}>
                        {info.curRound[v]}R 결과
                      </button>
                    </td>
                    <td>
                      <button type="button" onClick={handleNextRound} value={v}>
                        {info.curRound[v] === 10 ? "게임이 종료되었습니다." : `${info.curRound[v] + 1}R 시작하기`}
                      </button>
                    </td>
                    <td>
                      <button type="button" onClick={handleReset} value={v}>
                        RESET
                      </button>
                    </td>
                  </tr>
                  <tr key={`tr2_${v}`}>
                    <td colSpan="4">
                      <details>
                        <summary>카드 선택 정보 펼쳐보기</summary>
                        <table>
                          <thead>
                            <tr>
                              <td>라운드</td>
                              <td>1팀</td>
                              <td>2팀</td>
                              <td>3팀</td>
                              <td>4팀</td>
                            </tr>
                          </thead>
                          <tbody>
                            {info.results[v]?.map((r, i) => {
                              return (
                                <tr>
                                  <td>{i + 1}</td>
                                  <td>{r[0]}</td>
                                  <td>{r[1]}</td>
                                  <td>{r[2]}</td>
                                  <td>{r[3]}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </details>
                    </td>
                    <td colSpan="4">
                      <details>
                        <summary>라운드 별 점수 펼쳐보기</summary>
                        <table>
                          <thead>
                            <tr>
                              <td>라운드</td>
                              <td>1팀</td>
                              <td>2팀</td>
                              <td>3팀</td>
                              <td>4팀</td>
                            </tr>
                          </thead>
                          <tbody>
                            {info.scores[v]?.map((s, i) => {
                              return (
                                <tr>
                                  <td>{i + 1}</td>
                                  <td>{s[0]}</td>
                                  <td>{s[1]}</td>
                                  <td>{s[2]}</td>
                                  <td>{s[3]}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </details>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </Controller>
  );
}

const Controller = styled.article`
  padding: 10px;
  table {
    padding: 10px;
    margin: 0 auto;
    background-color: #f2f2f2;
    table > thead {
      font-size: 14px;
      background-color: #999999;
      tbody {
        font-size: 9px;
      }
    }
  }
  thead {
    font-size: 18px;
    background-color: #999999;
  }
  button {
    padding: 2px;
    border: 1px solid #090909;
    background-color: pink;
  }
`;
