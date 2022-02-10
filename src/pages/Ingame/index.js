import React from "react";
import styled from "styled-components";

export default function Game() {
  return (
    <InGame>
      <Header>
        <li>Team 1</li>
        <li>Round 1</li>
        <li>
          <span>📊</span>
          <span>📒</span>
        </li>
      </Header>
      <Teams>
        <Team>
          <TeamName>1</TeamName>
          <SelectedCard>
            <Card className="selected-card">X</Card>
          </SelectedCard>
        </Team>
        <Team>
          <TeamName>2</TeamName>
          <SelectedCard>
            <Card className="enemy-card">?</Card>
          </SelectedCard>
        </Team>
        <Team>
          <TeamName>3</TeamName>
          <SelectedCard>
            <Card className="enemy-card">X</Card>
          </SelectedCard>
        </Team>
        <Team>
          <TeamName>4</TeamName>
          <SelectedCard>
            <Card className="enemy-card">X</Card>
          </SelectedCard>
        </Team>
      </Teams>
      <Cards>
        <Card>X</Card>
        <Card>Y</Card>
      </Cards>
      <Footer>
        <li>현재 점수 : 100</li>
        <li>
          <button type="button">선택완료</button>
        </li>
      </Footer>
    </InGame>
  );
}

const InGame = styled.div`
  height: 100%;
  padding: 40px;
  background-color: #e0dede;
  text-align: center;
`;

const Header = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 24px;
  font-weight: 700;

  li:first-child {
    font-size: 18px;
  }

  span {
    margin: 3px;
    cursor: pointer;
  }
`;

const Teams = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px 0;
`;

const Team = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80px;
  background-color: #c1d0fb;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
`;

const TeamName = styled.li`
  font-size: 18px;
`;

const SelectedCard = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  .selected-card {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
  .enemy-card {
    width: 30px;
    height: 30px;
    font-size: 12px;
    background-color: #e0dede;
  }
`;

const Cards = styled.ul`
  display: flex;
  justify-content: center;
`;

const Card = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: #f2aeae;
  margin: 10px;
  font-size: 48px;
`;

const Footer = styled.ul`
  display: flex;
  padding: 10px;
  font-weight: 500;
  font-size: 20px;
  justify-content: space-around;
  align-items: center;
  button {
    border: 3px solid #c1d0fb;
    border-radius: 10px;
    padding: 10px;
  }
`;
