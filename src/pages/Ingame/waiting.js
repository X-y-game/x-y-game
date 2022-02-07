import React from "react";
import styled from "styled-components";

export default function WaitingRoom() {
  return (
    <Waiting>
      <Header>팀을 선택하고 준비를 완료하세요</Header>
      <Teams>
        <Team>1</Team>
        <Team>2</Team>
        <Team>3</Team>
        <Team>4</Team>
      </Teams>
      <Button>준비완료</Button>
      <Footer>모든 팀이 준비를 완료하면 시작됩니다</Footer>
    </Waiting>
  );
}

const Waiting = styled.div`
  text-align: center;
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

const Team = styled.li`
  flex-grow: 1;
  height: 200px;
  background-color: orange;
  padding: 5px;
  margin: 10px;
`;

const Button = styled.button`
  padding: 20px;
  border: 3px solid orange;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const Footer = styled.footer`
  font-size: 24px;
  font-weight: 400;
`;
