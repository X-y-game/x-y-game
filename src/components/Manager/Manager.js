import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getChannels } from "../../utils/api";
import { getSocket } from "../../utils/socket";

export default function Manager() {
  const [channels, setChannels] = useState(null);
  const [info, setInfo] = useState(null);
  const roundInfo = {};

  useEffect(() => {
    getChannels(setChannels);
    getSocket.on("info", (data) => {
      setInfo(data);
    });
    return () => {
      getSocket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   console.log(info);
  // }, [info]);

  const checkRoundMessage = (v) => {
    switch (v + 1) {
      case 1:
        return "게임 시작하기";
      case 11:
        return "게임이 종료되었습니다";
      default:
        return `${v + 1}R 시작하기`;
    }
  };

  const canGoNext = (v) => {
    const curRound = info?.curRound[v];
    const curResult = info?.results[v];
    if (curResult) return !curResult[curRound - 1]?.includes("");
    return false;
  };

  const handleNextRound = (e) => {
    if (!roundInfo[e.target.value] && info.curRound[e.target.value] !== 0) {
      alert("라운드 결과를 먼저 보여주세요");
    } else if (info.curRound[e.target.value] >= 10) {
      alert("더이상 진행할 라운드가 없습니다.");
    } else if (info.curRound[e.target.value] === 0 || canGoNext(e.target.value)) {
      getSocket.emit("control", { roomName: e.target.value, round: info.curRound[e.target.value] + 1 });
    } else {
      alert("라운드가 완료되지 않았습니다.");
    }
    roundInfo[e.target.value] = false;

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
    if (canGoNext(e.target.value)) {
      getSocket.emit("modal", e.target.value);
      roundInfo[e.target.value] = true;
    } else {
      alert("라운드가 진행중입니다.");
    }
    return () => {
      getSocket.disconnect();
    };
  };

  const calcScore = (scores, team) => {
    let team1 = 0;
    let team2 = 0;
    let team3 = 0;
    let team4 = 0;
    scores?.forEach((score) => {
      team1 += score[0];
      team2 += score[1];
      team3 += score[2];
      team4 += score[3];
    });

    switch (team) {
      case 1:
        return team1;
      case 2:
        return team2;
      case 3:
        return team3;
      case 4:
        return team4;
      default:
        return team1;
    }
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
                    <td>
                      <ul>
                        <li>
                          {info?.results[v] && info?.results[v][info.curRound[v] - 1][0]
                            ? info?.results[v][info.curRound[v] - 1][0]
                            : "?"}
                        </li>
                        <li>
                          {info?.results[v] && info?.results[v][info.curRound[v] - 1][1]
                            ? info?.results[v][info.curRound[v] - 1][1]
                            : "?"}
                        </li>
                        <li>
                          {info?.results[v] && info?.results[v][info.curRound[v] - 1][2]
                            ? info?.results[v][info.curRound[v] - 1][2]
                            : "?"}
                        </li>
                        <li>
                          {info?.results[v] && info?.results[v][info.curRound[v] - 1][3]
                            ? info?.results[v][info.curRound[v] - 1][3]
                            : "?"}
                        </li>
                      </ul>
                    </td>
                    <td>
                      <button type="button" onClick={handleModal} value={v}>
                        {info.curRound[v] > 0 ? `${info.curRound[v]}R 결과 보기` : "대기"}
                      </button>
                    </td>
                    <td>
                      <button type="button" onClick={handleNextRound} value={v}>
                        {info && checkRoundMessage(info.curRound[v])}
                      </button>
                    </td>
                    <td>
                      <button type="button" onClick={handleReset} value={v}>
                        RESET
                      </button>
                    </td>
                  </tr>
                  <tr key={`tr2_${v}`}>
                    <td colSpan="8">
                      <details>
                        <summary>게임 상세 정보</summary>
                        <div>
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
                          <table>
                            <thead>
                              <tr>
                                <td>라운드</td>
                                <td>1팀</td>
                                <td>2팀</td>
                                <td>3팀</td>
                                <td>4팀</td>
                                <td>라운드 합계</td>
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
                                    <td>{s[0] + s[1] + s[2] + s[3]}</td>
                                  </tr>
                                );
                              })}
                              <tr>
                                <td>총 점</td>
                                <td>{calcScore(info.scores[v], 1)}</td>
                                <td>{calcScore(info.scores[v], 2)}</td>
                                <td>{calcScore(info.scores[v], 3)}</td>
                                <td>{calcScore(info.scores[v], 4)}</td>
                                <td>
                                  {calcScore(info.scores[v], 1) +
                                    calcScore(info.scores[v], 2) +
                                    calcScore(info.scores[v], 3) +
                                    calcScore(info.scores[v], 4)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
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
  font-size: 1.5rem;
  table {
    padding: 10px;
    margin: 0 auto;
    background-color: #f2f2f2;
    table > thead {
      font-size: 1.6rem;
      background-color: #999999;
      tbody {
      }
    }
    details > div {
      display: flex;
      justify-content: center;
      padding: 1rem;
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
  ul {
    display: flex;
    justify-content: center;
    gap: 2px;
  }
`;
