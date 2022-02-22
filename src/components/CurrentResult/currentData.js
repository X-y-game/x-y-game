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
}) {
  return (
    <WrapRound>
      <p>{roundNum}R</p>
      <CheckCard name={teamOneScore < 0 ? "패" : "승"}>
        <span>{teamOneCardXY}</span>
        <span>{teamOneScore === 0 ? "?" : teamOneScore}</span>
      </CheckCard>
      <CheckCard name={teamTwoScore < 0 ? "패" : "승"}>
        <span>{teamTwoCardXY}</span>
        <span>{teamTwoScore === 0 ? "?" : teamTwoScore}</span>
      </CheckCard>
      <CheckCard name={teamThreeScore < 0 ? "패" : "승"}>
        <span>{teamThreeCardXY}</span>
        <span>{teamThreeScore === 0 ? "?" : teamThreeScore}</span>
      </CheckCard>
      <CheckCard name={teamFourScore < 0 ? "패" : "승"}>
        <span>{teamFourCardXY}</span>
        <span>{teamFourScore === 0 ? "?" : teamFourScore}</span>
      </CheckCard>
    </WrapRound>
  );
}

const WrapRound = styled.div`
  display: flex;
  align-items: center;
`;

const CheckCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3vh;
  margin: 10px;
  padding: 0 1px;
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
};
