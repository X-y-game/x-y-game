import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function Team({ id, setTeam }) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleIsSelected = () => {
    setIsSelected(!isSelected);
  };

  const handleClickTeam = (e) => {
    toggleIsSelected(e);
    setTeam(id);
  };

  return (
    <TeamContainer>
      {isSelected ? (
        <div>
          <TeamCard id={id} name="team" hidden />
          <TeamName onClick={handleClickTeam} htmlFor={id}>
            {id}
          </TeamName>
        </div>
      ) : (
        <div>
          <TeamCard id={id} name="team" hidden />
          <TeamName onClick={handleClickTeam} htmlFor={id}>
            {id}
          </TeamName>
        </div>
      )}
    </TeamContainer>
  );
}

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TeamName = styled.label`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100px;
  padding: 20px;
  margin: 5px;
  background-color: #ececec;
  border-radius: 10px;
  font-size: 24px;
  text-align: center;
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
};
