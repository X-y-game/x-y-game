import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import soundPlay from "../../utils/sound";

export default function Team({ id, setTeam, title }) {
  const [isSelected, setIsSelected] = useState(false);
  const toggleIsSelected = () => {
    setIsSelected(!isSelected);
  };

  const handleClickTeam = (e) => {
    soundPlay("click");
    toggleIsSelected(e);
    setTeam(id);
  };

  return (
    <TeamContainer>
      <TeamCard id={id} name="team" hidden />
      <TeamName onClick={handleClickTeam} htmlFor={id}>
        <p>{title}</p>
      </TeamName>
    </TeamContainer>
  );
}

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TeamName = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 5px;
  background-color: #ececec;
  border-radius: 10px;
  font-size: 1.5em;
  box-shadow: #d3d3d3 2px 2px 1px 1px;
  cursor: pointer;
`;

const TeamCard = styled.input.attrs({ type: "radio" })`
  display: none;
  &:checked + ${TeamName} {
    box-shadow: #f17e7e 2px 2px 1px 1px;
    background-color: #f2aeae;
  }
`;

Team.propTypes = {
  id: PropTypes.number.isRequired,
  setTeam: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
