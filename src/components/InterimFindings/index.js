import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import InterimData from "./interimData";

export default function InterimFindings({ socreData, selectData, round }) {
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
        teamOneScore: socreData[i][0],
        teamTwoScore: socreData[i][1],
        teamThreeScore: socreData[i][2],
        teamFourScore: socreData[i][3],
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
      <hr />

      {round === 10 ? (
        <WrapfinishScore>
          <em>합계</em>
          <div>{round + 200}</div>
          <div>{round + 300}</div>
          <div>{round + 100}</div>
          <div>{round + 200}</div>
        </WrapfinishScore>
      ) : (
        ""
      )}
    </WrapResult>
  );
}

const WrapResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: #c1d0fb;
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

const WrapfinishScore = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 10px 30px 10px 0px;
  em {
    font-weight: bold;
    font-size: 1.2em;
  }
  div {
    font-weight: bold;
  }
`;

InterimFindings.propTypes = {
  socreData: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectData: PropTypes.arrayOf(PropTypes.array).isRequired,
  round: PropTypes.number.isRequired,
};
