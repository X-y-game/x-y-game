import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function GameCard({ card, setMycard, setIsChecked, isChecked }) {
  const handleSelect = (e) => {
    setMycard(e.target.htmlFor);
    setIsChecked(true);
  };

  return (
    <CardContainer>
      <Card id={card} name="choice" onChange={handleSelect} hidden checked={isChecked} />
      <CardLabel htmlFor={card} onClick={handleSelect}>
        {card}
      </CardLabel>
    </CardContainer>
  );
}

GameCard.propTypes = {
  card: PropTypes.string.isRequired,
  setMycard: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  setIsChecked: PropTypes.func.isRequired,
};

const CardContainer = styled.ul`
  display: flex;
  justify-content: center;
`;

const CardLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 4em;
  margin: 10px;
  border-radius: 10px;
  background-color: #fbf2f2;
  font-size: 48px;
  color: #343a40;
`;

const Card = styled.input.attrs({ type: "radio" })`
  & + ${CardLabel} {
    background-color: #999;
  }
  &:checked + ${CardLabel} {
    box-shadow: #c1d0fb 2px 2px 1px 1px;
    background-color: ${(props) => (props.id === "X" ? "#c3e8fb" : "#ffb7b7")};
  }
`;
