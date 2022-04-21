import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getRoomAPI } from "../../api/api";
import RoomList from "./roomList";
import Header from "../../components/Header";

export default function Room() {
  const location = useLocation();
  const { id: indexId } = useParams();
  const { channel: channelId, title: channelTitle } = location.state;

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function getRoomList() {
      const response = await (await getRoomAPI(channelId)).json();
      setRooms(response.roomLists);
    }
    getRoomList();
  }, []);

  return (
    <Body>
      <ChannelPage>
        <Header title="룸을 선택하세요" channel={channelTitle} roomId="-" />
        <WrapChannelUL>
          {rooms?.map(({ _id, title }, index) => (
            <RoomList
              key={_id}
              id={_id}
              channelIndex={indexId}
              text={title}
              roomNum={index + 1}
              channelId={channelId}
            />
          ))}
        </WrapChannelUL>
      </ChannelPage>
    </Body>
  );
}

const Body = styled.div`
  height: 100%;
`;

const ChannelPage = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
`;

const WrapChannelUL = styled.ul`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0 40% 0;
  font-size: 1.5em;
  li {
    width: 100%;
    padding: 20px;
    background-color: #54628c;
    border-radius: 50px;
    text-align: center;
    transition: 0.2s;
    color: #fff;
    cursor: pointer;
  }
  li:active {
    color: #f2aeae;
  }
  @media screen and (max-width: 1000px) {
    padding: 0 10% 0;
    transition: 0.1s;
  }
`;
