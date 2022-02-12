import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminPanel from "../../components/AdminPanel";
import { getChannelsAPI } from "../../api/api";

export default function Admin() {
  const [channels, setChannels] = useState(null);

  async function getChannels() {
    const channelList = await (await getChannelsAPI()).json();
    setChannels(channelList);
  }

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <Container>
      <h1>XY Admin Panel</h1>

      {channels && (
        <AdminPanel
          title="Channel List"
          placeholder="채널 생성하기 콤마로 맥스 인원을 정해주세요! 예시) 멋쟁이신사처럼,100"
          data={channels}
        />
      )}

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
