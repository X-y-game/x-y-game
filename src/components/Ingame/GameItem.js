import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function GameItem({ id, team, isSubmitted, mycard }) {
  if (`team${id}` === team) {
    return (
      <Item>
        <li>{id}</li>
        <SelectedCard id={isSubmitted ? mycard : "0"}>{isSubmitted ? mycard : "?"}</SelectedCard>
      </Item>
    );
  }
  return (
    <Item>
      <li>{id}</li>
      <SelectedCard>?</SelectedCard>
    </Item>
  );
}

const Item = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80px;
  padding: 10px;
  margin: 10px;
  background-color: #c1d0fb;
  border-radius: 10px;
`;

const SelectedCard = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: ${(props) => {
    let color = "#e0dede";
    if (props.id === "X") {
      color = "#c3e8fb";
    } else if (props.id === "Y") {
      color = "#ffb7b7";
    }
    return color;
  }};
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

GameItem.propTypes = {
  id: PropTypes.number.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  mycard: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
};
