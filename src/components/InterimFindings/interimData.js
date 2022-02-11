import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function InterimData({
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
        <span>{teamOneCardXY ? "X" : "Y"}</span>
        <span>{teamOneScore}</span>
      </CheckCard>
      <CheckCard name={teamTwoScore < 0 ? "패" : "승"}>
        <span>{teamTwoCardXY ? "X" : "Y"}</span>
        <span>{teamTwoScore}</span>
      </CheckCard>
      <CheckCard name={teamThreeScore < 0 ? "패" : "승"}>
        <span>{teamThreeCardXY ? "X" : "Y"}</span>
        <span>{teamThreeScore}</span>
      </CheckCard>
      <CheckCard name={teamFourScore < 0 ? "패" : "승"}>
        <span>{teamFourCardXY ? "X" : "Y"}</span>
        <span>{teamFourScore}</span>
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
  width: 100%;
  margin: 10px;
  padding: 0 1px;
  background-color: ${(props) => (props.name === "승" ? "#c3e8fb" : "#ffb7b7")};
  font-size: 1em;
  font-weight: bold;
  box-sizing: border-box;
`;

InterimData.propTypes = {
  roundNum: PropTypes.number.isRequired,
  teamOneCardXY: PropTypes.bool.isRequired,
  teamTwoCardXY: PropTypes.bool.isRequired,
  teamThreeCardXY: PropTypes.bool.isRequired,
  teamFourCardXY: PropTypes.bool.isRequired,
  teamOneScore: PropTypes.number.isRequired,
  teamTwoScore: PropTypes.number.isRequired,
  teamThreeScore: PropTypes.number.isRequired,
  teamFourScore: PropTypes.number.isRequired,
};
