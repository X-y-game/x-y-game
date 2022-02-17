import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function TeamResult({ team, cardXY, point }) {
  return (
    <WrapCard className="wrapCard">
      <p>{team}팀</p>
      <SelectCard name={cardXY}>{cardXY}</SelectCard>
      <p>{point > 0 ? `+${point}` : point}</p>
    </WrapCard>
  );
}

const SelectCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: ${(props) => (props.name === "X" ? "#c3e8fb" : "#ffb7b7")};
  font-size: 2em;
  @media screen and (min-width: 600px) {
    width: 60%;
    height: 50%;
    font-size: 4em;
  }
`;

const WrapCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 40%;
  height: 100%;
  padding: 10px;
  background-color: #c1d0fb;
  @media screen and (min-width: 600px) {
    width: 20%;
    height: 70%;
    p {
      font-size: 40px;
    }
  }
`;

TeamResult.propTypes = {
  team: PropTypes.number.isRequired,
  cardXY: PropTypes.string.isRequired,
  point: PropTypes.number.isRequired,
};
