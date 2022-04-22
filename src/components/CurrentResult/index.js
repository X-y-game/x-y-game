/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CurrentData from "./currentData";

export default function CurrentResult({ scoreData, selectData, round }) {
  const roundData = () => {
    const pushData = [];
    for (let i = 0; i < round; i += 1) {
      pushData.push({
        id: i + 1,
        roundNum: i + 1,
        teamOneCardXY: selectData[i][0],
        teamTwoCardXY: selectData[i][1],
        teamThreeCardXY: selectData[i][2],
        teamFourCardXY: selectData[i][3],
        teamOneScore: scoreData[i][0],
        teamTwoScore: scoreData[i][1],
        teamThreeScore: scoreData[i][2],
        teamFourScore: scoreData[i][3],
      });
    }
    return pushData;
  };

  return (
    <WrapResult>
      <TeamNumber>
        <p>1팀</p>
        <p>2팀</p>
        <p>3팀</p>
        <p>4팀</p>
      </TeamNumber>

      {roundData().map((it) => (
        <CurrentData
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
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  background-color: #c1d0fb;
  p {
    font-size: 1em;
    font-weight: bold;
  }
  @media screen and (min-width: 600px) {
    width: 60%;
    margin: 0 auto;
  }
`;

const TeamNumber = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-left: 11%;
`;

CurrentResult.propTypes = {
  scoreData: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectData: PropTypes.arrayOf(PropTypes.array).isRequired,
  round: PropTypes.number.isRequired,
};
