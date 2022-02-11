import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TeamResult from "./teamResult";
import InterimFindings from "../InterimFindings";

export default function Modal({ onClick }) {
  const teamData = [
    {
      team: 1,
      cardXY: true,
      point: 0,
    },
    {
      team: 2,
      cardXY: false,
      point: 0,
    },
    {
      team: 3,
      cardXY: true,
      point: 0,
    },
    {
      team: 4,
      cardXY: false,
      point: 0,
    },
  ];

  const [isRoundModal, setRoundModal] = useState(false);

  const interFindTrun = () => {
    setRoundModal(false);
  };

  return (
    <ModalDiv onClick={onClick}>
      <p>{isRoundModal ? "라운드 결과" : "중간 결과"}</p>
      {isRoundModal ? (
        <WrapResult>
          {teamData.map((it) => (
            <TeamResult key={it.team} team={it.team} cardXY={it.cardXY} point={it.point} />
          ))}
        </WrapResult>
      ) : (
        <InterimFindings />
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
  onClick: PropTypes.func.isRequired,
};
