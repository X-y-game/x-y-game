/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CurrentData from "./currentData";

export default function CurrentResult({ scoreData, selectData, round, isFinishResult }) {
  const roundData = () => {
    const pushData = [];
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    if (!isFinishResult) {
      for (let i = 0; i < round - 1; i += 1) {
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
          roundTotal: scoreData[i][0] + scoreData[i][1] + scoreData[i][2] + scoreData[i][3],
        });
      }
    } else {
      for (let i = 0; i < round; i += 1) {
        one += scoreData[i][0];
        two += scoreData[i][1];
        three += scoreData[i][2];
        four += scoreData[i][3];
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
          roundTotal: scoreData[i][0] + scoreData[i][1] + scoreData[i][2] + scoreData[i][3],
          teamOneTotal: one,
          teamTwoTotal: two,
          teamThreeTotal: three,
          teamFourTotal: four,
          total: one + two + three + four,
        });
      }
    }
    return pushData;
  };

  return (
    <WrapResult>
      <TeamNumber>
        <p />
        <p>1팀</p>
        <p>2팀</p>
        <p>3팀</p>
        <p>4팀</p>
        <p>
          라운드
          <br />
          합계
        </p>
      </TeamNumber>

      <tr>
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
            roundTotal={it.roundTotal}
          />
        ))}
      </tr>
      <hr />
      {isFinishResult && (
        <TotalWrap>
          <TotalScore>
            <p>결과</p>
            <p>{roundData()[9].teamOneTotal}</p>
            <p>{roundData()[9].teamTwoTotal}</p>
            <p>{roundData()[9].teamThreeTotal}</p>
            <p>{roundData()[9].teamFourTotal}</p>
            <p>{roundData()[9].total}</p>
          </TotalScore>
        </TotalWrap>
      )}
    </WrapResult>
  );
}

const WrapResult = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding-right: 5px;
  border-radius: 5px;
  background-color: #c1d0fb;
  text-align: center;

  p {
    width: 100%;
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
  align-items: center;
  padding: 3px;
`;

const TotalWrap = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;
const TotalScore = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3vh;
  p {
    background-color: white;
  }
`;

CurrentResult.propTypes = {
  scoreData: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectData: PropTypes.arrayOf(PropTypes.array).isRequired,
  round: PropTypes.number.isRequired,
  isFinishResult: PropTypes.bool.isRequired,
};
