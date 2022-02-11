import React from "react";
import styled from "styled-components";
import InterimData from "./interimData";

export default function InterimFindings() {
  const RoundData = [
    {
      id: 1,
      roundNum: 1,
      teamOneCardXY: true,
      teamTwoCardXY: false,
      teamThreeCardXY: true,
      teamFourCardXY: true,
      teamOneScore: 100,
      teamTwoScore: -100,
      teamThreeScore: 100,
      teamFourScore: 100,
    },
    {
      id: 2,
      roundNum: 2,
      teamOneCardXY: true,
      teamTwoCardXY: false,
      teamThreeCardXY: true,
      teamFourCardXY: true,
      teamOneScore: 100,
      teamTwoScore: -100,
      teamThreeScore: 100,
      teamFourScore: 100,
    },
    {
      id: 3,
      roundNum: 3,
      teamOneCardXY: true,
      teamTwoCardXY: false,
      teamThreeCardXY: true,
      teamFourCardXY: true,
      teamOneScore: 100,
      teamTwoScore: -100,
      teamThreeScore: 100,
      teamFourScore: 100,
    },
    {
      id: 4,
      roundNum: 4,
      teamOneCardXY: true,
      teamTwoCardXY: false,
      teamThreeCardXY: true,
      teamFourCardXY: true,
      teamOneScore: 100,
      teamTwoScore: -100,
      teamThreeScore: 100,
      teamFourScore: 100,
    },
    {
      id: 5,
      roundNum: 5,
      teamOneCardXY: true,
      teamTwoCardXY: false,
      teamThreeCardXY: true,
      teamFourCardXY: true,
      teamOneScore: 100,
      teamTwoScore: -100,
      teamThreeScore: 100,
      teamFourScore: 100,
    },
    {
      id: 6,
      roundNum: 6,
      teamOneCardXY: true,
      teamTwoCardXY: false,
      teamThreeCardXY: true,
      teamFourCardXY: true,
      teamOneScore: 100,
      teamTwoScore: -100,
      teamThreeScore: 100,
      teamFourScore: 100,
    },
  ];
  return (
    <WrapResult>
      <TeamNumber>
        <p>1조</p>
        <p>2조</p>
        <p>3조</p>
        <p>4조</p>
      </TeamNumber>

      {RoundData.map((it) => (
        <InterimData
          key={it.id}
          roundNum={it.roundNum}
          teamOneCardXY={it.teamOneCardXY}
          teamTwoCardXY={it.teamTwoCardXY}
          teamThreeCardXY={it.teamThreeCardXY}
          teamFourCardXY={it.teamFourCardXY}
          teamOneScore={it.teamOneScore}
          teamTwoScore={it.teamTwoScore}
          teamThreeScore={it.teamThreeScore}
          teamFourScore={it.teamFourScore}
        />
      ))}
    </WrapResult>
  );
}

const WrapResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 216px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: #c1d0fb;
  overflow: scroll;
  overflow-x: hidden;
  p {
    font-size: 1.3em;
    font-weight: bold;
  }
`;

const TeamNumber = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-left: 43px;
`;
