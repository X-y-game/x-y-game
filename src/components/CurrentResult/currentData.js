import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function CurrentData({
  roundNum,
  teamOneCardXY,
  teamTwoCardXY,
  teamThreeCardXY,
  teamFourCardXY,
  teamOneScore,
  teamTwoScore,
  teamThreeScore,
  teamFourScore,
  roundTotal,
}) {
  return (
    <WrapRound>
      <p>{roundNum}R</p>
      <CheckCard name={teamOneScore < 0 ? "패" : "승"}>
        <span>{teamOneCardXY}</span>
        <Score name={Math.abs(teamOneScore) >= 1000 ? "천이상" : "천이하"}>
          {teamOneScore === 0 ? "?" : teamOneScore}
        </Score>
      </CheckCard>
      <CheckCard name={teamTwoScore < 0 ? "패" : "승"}>
        <span>{teamTwoCardXY}</span>
        <Score name={Math.abs(teamTwoScore) >= 1000 ? "천이상" : "천이하"}>
          {teamTwoScore === 0 ? "?" : teamTwoScore}
        </Score>
      </CheckCard>
      <CheckCard name={teamThreeScore < 0 ? "패" : "승"}>
        <span>{teamThreeCardXY}</span>
        <Score name={Math.abs(teamThreeScore) >= 1000 ? "천이상" : "천이하"}>
          {teamThreeScore === 0 ? "?" : teamThreeScore}
        </Score>
      </CheckCard>
      <CheckCard name={teamFourScore < 0 ? "패" : "승"}>
        <span>{teamFourCardXY}</span>
        <Score name={Math.abs(teamFourScore) >= 1000 ? "천이상" : "천이하"}>
          {teamFourScore === 0 ? "?" : teamFourScore}
        </Score>
      </CheckCard>
      <CheckCard name={roundTotal < 0 ? "패" : "승"}>{roundTotal}</CheckCard>
    </WrapRound>
  );
}

const WrapRound = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckCard = styled.p`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 3vh;
  margin: 1px;
  background-color: ${(props) => (props.name === "승" ? "#c3e8fb" : "#ffb7b7")};
  font-size: 1em;
  font-weight: bold;
  box-sizing: border-box;
  @media screen and (min-width: 800px) {
    height: 4vh;
    padding: 0 10px;
    font-size: 1.2em;
  }
`;

const Score = styled.span`
  margin-top: ${(props) => (props.name === "천이상" ? "4px" : "")};
  font-size: ${(props) => (props.name === "천이상" ? "0.8em" : "1em")};
`;

CurrentData.propTypes = {
  roundNum: PropTypes.number.isRequired,
  teamOneCardXY: PropTypes.string.isRequired,
  teamTwoCardXY: PropTypes.string.isRequired,
  teamThreeCardXY: PropTypes.string.isRequired,
  teamFourCardXY: PropTypes.string.isRequired,
  teamOneScore: PropTypes.number.isRequired,
  teamTwoScore: PropTypes.number.isRequired,
  teamThreeScore: PropTypes.number.isRequired,
  teamFourScore: PropTypes.number.isRequired,
  roundTotal: PropTypes.number.isRequired,
};
