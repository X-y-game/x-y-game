import React from "react";
import styled from "styled-components";

export default function WaitingRoom() {
  return (
    <Waiting>
      <Header>팀 선택</Header>
      <Teams>
        <Team>
          <TeamName>1</TeamName>
          <Users>
            <User>🙆</User>
            <User>🙆</User>
            <User>🙆</User>
            <User>🙆</User>
          </Users>
          <State>완료</State>
        </Team>
        <Team>
          <TeamName>2</TeamName>
          <Users>
            <User>🙆</User>
            <User>🙆</User>
          </Users>
          <State>대기</State>
        </Team>
        <Team>
          <TeamName>3</TeamName>
          <Users>
            <User>🙆</User>
            <User>🙆</User>
            <User>🙆</User>
            <User>🙆</User>
          </Users>
          <State>완료</State>
        </Team>
        <Team>
          <TeamName>4</TeamName>
          <Users>
            <User>🙆</User>
          </Users>
          <State>대기</State>
        </Team>
      </Teams>
      <Button>준비완료</Button>
      <Footer>모든 팀이 준비를 완료하면 시작됩니다</Footer>
    </Waiting>
  );
}

const Waiting = styled.div`
  padding: 40px;
  text-align: center;
  background-color: whitesmoke;
`;

const Header = styled.header`
  font-size: 36px;
  font-weight: 500;
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
  height: 200px;
  background-color: powderblue;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
`;

const TeamName = styled.li`
  font-size: 24px;
  margin-bottom: 5px;
`;

const Users = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;
const User = styled.li`
  font-size: 24px;
`;

const State = styled.li`
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 10px;
`;

const Button = styled.button`
  padding: 20px;
  border: 3px solid pink;
  background-color: whitesmoke;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const Footer = styled.footer`
  font-size: 24px;
  font-weight: 400;
`;
