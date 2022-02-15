import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TeamResult from "./teamResult";
import InterimFindings from "../InterimFindings";

export default function Modal({ handleClick, selectCard, roundScore, isInterim }) {
  const teamData = [
    {
      team: 1,
      cardXY: selectCard[0],
      point: roundScore[0],
    },
    {
      team: 2,
      cardXY: selectCard[1],
      point: roundScore[1],
    },
    {
      team: 3,
      cardXY: selectCard[2],
      point: roundScore[2],
    },
    {
      team: 4,
      cardXY: selectCard[3],
      point: roundScore[3],
    },
  ];

  const [isRoundModal, setIsRoundModal] = useState(isInterim);

  const roundResult = () => {
    setIsRoundModal(false);
  };

  return (
    <ModalDiv onClick={handleClick}>
      <p>{isRoundModal ? "중간 결과" : "라운드 결과"}</p>
      {isRoundModal ? (
        <InterimFindings roundData={teamData} />
      ) : (
        <WrapResult>
          {teamData.map((it) => (
            <TeamResult key={`modal_${it.team}`} team={it.team} cardXY={it.cardXY} point={it.point} />
          ))}
        </WrapResult>
      )}
    </ModalDiv>
  );
}

const ModalDiv = styled.div`
  position: absolute;
  top: 10vh;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background-color: #fbf2f2;
  text-align: center;
  p {
    font-size: 1.5em;
    font-weight: bold;
  }
  button {
    position: absolute;
  }
`;

const WrapResult = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 20px;
  .wrapCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 40%;
    height: 100%;
    padding: 10px;
    background-color: #c1d0fb;
  }
`;

Modal.propTypes = {
  handleClick: PropTypes.func.isRequired,
  selectCard: PropTypes.arrayOf(PropTypes.string),
  roundScore: PropTypes.arrayOf(PropTypes.number),
  isInterim: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
  selectCard: "?",
  roundScore: 0,
};
