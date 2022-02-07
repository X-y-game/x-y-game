import React from "react";
import styled from "styled-components";

export default function Game() {
  return (
    <InGame>
      <Header>
        <li>Team 1</li>
        <li>Round 1</li>
        <li>
          <img src="#" alt="menu" />
          <img src="#" alt="rule book" />
        </li>
      </Header>
      <Teams>
        <Team>1</Team>
        <Team>2</Team>
        <Team>3</Team>
        <Team>4</Team>
      </Teams>
      <Cards>
        <Card>X</Card>
        <Card>Y</Card>
      </Cards>
    </InGame>
  );
}

const InGame = styled.div`
  text-align: center;
`;

const Header = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 36px;
  font-weight: 500;

  li:first-child {
    font-size: 24px;
  }

  img {
    width: 10px;
    height: 10px;
  }
`;

const Teams = styled.ul`
  display: flex;
  padding: 40px 0;
  justify-content: center;
`;

const Team = styled.li`
  flex-grow: 1;
  height: 200px;
  background-color: lightgray;
  padding: 5px;
  margin: 10px;
`;

const Cards = styled.ul`
  display: flex;
  justify-content: space-around;
`;
const Card = styled.button`
  width: 100px;
  height: 100px;
  background-color: green;
  font-size: 48px;
  color: white;
`;
