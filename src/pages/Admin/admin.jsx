import React from "react";
import styled from "styled-components";
import AdminPanel from "../../components/AdminPanel";

export default function Admin() {
  return (
    <Container>
      <h1>XY Admin Panel</h1>
      <AdminPanel title="Channel List" placeholder="채널 생성하기" />
      <AdminPanel title="Room List" placeholder="룸 생성하기" />
      <AdminPanel title="Team List" placeholder="팀 생성하기" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #54628c;

  h1 {
    padding: 3rem;
    text-align: center;
    font-size: 2rem;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    color: #f2aeae;
  }
`;
