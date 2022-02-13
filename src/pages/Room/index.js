import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getRoomAPI } from "../../api/api";
import RoomList from "./roomList";
import Header from "../../components/Header";

export default function Room() {
  const location = useLocation();
  const history = useHistory();
  const { id: indexId } = useParams();
  const { channel: channelId, title: channelTitle } = location.state;

  const handleClick = () => {
    history.goBack();
  };

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
        <BackBtn type="button" onClick={handleClick}>
          {"<"}
        </BackBtn>
        <Header title="룸을 선택하세요." channel={channelTitle} />
        <WrapChannelUL>
          {rooms?.map(({ _id, title }, index) => (
            <RoomList key={_id} channelIndex={indexId} text={title} roomNum={index + 1} channelId={channelId} />
          ))}
        </WrapChannelUL>
      </ChannelPage>
    </Body>
  );
}

const Body = styled.div`
  background-color: #e0dede;
`;

const BackBtn = styled.button`
  position: absolute;
  left: 10px;
  top: 6vh;
  padding: 10px;
  margin-top: -35px;
  background-color: inherit;
  font-size: 25px;
`;

const ChannelPage = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background-color: #e0dede;
`;

const WrapChannelUL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  font-size: 20px;
  li {
    width: 4.5em;
    padding: 20px;
    background-color: #fbf2f2;
    border-radius: 5px;
    text-align: center;
    transition: 0.2s;
    cursor: pointer;
  }
  li:hover {
    box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.2);
  }
`;
