import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

export default function TeamResult({ team, cardXY, point }) {
  return (
    <WrapCard className="wrapCard">
      <p>{team}팀</p>
      <RotateContainer>
        <BackCard className="back card">뒷 면</BackCard>
        <SelectCard name={cardXY} className="front card">
          {cardXY}
        </SelectCard>
      </RotateContainer>
      <RoundScoreText>{point > 0 ? `+${point}` : point}</RoundScoreText>
    </WrapCard>
  );
}

const SelectCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 4em;
  background-color: ${(props) => (props.name === "X" ? "#c3e8fb" : "#ffb7b7")};
  font-size: 2em;
  border-radius: 5px;
  @media screen and (min-width: 600px) {
    width: 2em;
    height: 3em;
    font-size: 4em;
  }
`;

const BackCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 2.5em;
  height: 4em;
  font-size: 2em;
  border-radius: 5px;
  background-color: #999;
  color: #999;
  @media screen and (min-width: 600px) {
    width: 2em;
    height: 3em;
    font-size: 4em;
  }
`;

const WrapCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40%;
  height: 100%;
  p {
    color: #fff;
  }
  @media screen and (min-width: 600px) {
    width: 20%;
    height: 70%;
    gap: 20px;
    p {
      font-size: 40px;
      color: #fff;
    }
  }
`;

const RotateAnimFront = keyframes`
 0%{
  transform: rotateY(-180deg);
 }

 50%{
  transform: rotateY(-180deg);
 }

 100%{
  transform: rotateY(0);
 }
`;

const RotateAnimBack = keyframes`
 0%{
  transform: rotateY(0);
 }
 50%{
  transform: rotateY(0);
 }
 100%{
  transform: rotateY(180deg);
 }
`;

const OpenScoreAnim = keyframes`
 0%{
   opacity: 0;
 }
 99%{
  opacity: 0;
 }
 100%{
   opacity: 1;
 }
`;

const RotateContainer = styled.div`
  position: relative;

  .card {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-perspective: 0;
    -webkit-transition: 1s;
    backface-visibility: hidden;
    visibility: visible;
  }

  .front {
    transform: rotateY(-180deg);
    animation: ${RotateAnimFront} 2s forwards;
  }
  .back {
    transform: rotateY(0);
    animation: ${RotateAnimBack} 2s forwards;
  }
`;

const RoundScoreText = styled.p`
  animation: ${OpenScoreAnim} 1.8s forwards;
`;

TeamResult.propTypes = {
  team: PropTypes.number.isRequired,
  cardXY: PropTypes.string.isRequired,
  point: PropTypes.number.isRequired,
};
