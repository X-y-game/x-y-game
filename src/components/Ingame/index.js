import React from "react";
import styled from "styled-components";

export default function Game() {
  return (
    <InGame>
      <Header>
        <li>Team 1</li>
        <li>Round 1</li>
        <li>
          <span>📋</span>
          <span>📒</span>
        </li>
      </Header>
      <Teams>
        <Team>
          <TeamName>1</TeamName>
          <SelectedCard>X</SelectedCard>
        </Team>
        <Team>
          <TeamName>2</TeamName>
          <SelectedCard>?</SelectedCard>
        </Team>
        <Team>
          <TeamName>3</TeamName>
        </Team>
        <Team>
          <TeamName>4</TeamName>
          <SelectedCard>?</SelectedCard>
        </Team>
      </Teams>
      <Cards>
        <Card>X</Card>
        <Card>Y</Card>
      </Cards>
      <Footer>
        <li>현재 점수 : 100</li>
        <li>
          <button type="button">다음 라운드로</button>
        </li>
      </Footer>
    </InGame>
  );
}

const InGame = styled.div`
  padding: 40px;
  background-color: whitesmoke;
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
`;

const Teams = styled.ul`
  display: flex;
  padding: 40px 0;
  justify-content: center;
`;

const Team = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: 120px;
  background-color: powderblue;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
`;

const TeamName = styled.li`
  font-size: 24px;
  margin-bottom: 5px;
`;

const SelectedCard = styled.li`
  background-color: whitesmoke;
  padding: 20px;
  border-radius: 10px;
`;

const Cards = styled.ul`
  display: flex;
  justify-content: center;
`;
const Card = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: pink;
  margin: 10px;
  font-size: 48px;
`;

const Footer = styled.ul`
  display: flex;
  padding: 20px;
  font-weight: 500;
  font-size: 20px;
  justify-content: space-around;
  align-items: center;
  button {
    background-color: whitesmoke;
    border: 3px solid gray;
    border-radius: 10px;
    padding: 10px;
  }
`;
