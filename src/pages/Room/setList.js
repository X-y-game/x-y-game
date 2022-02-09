import React from "react";
import styled from "styled-components";
import RoomList from "./roomList";

export default function SetList() {
  return (
    <WrapChannelUL>
      <RoomList id="1" text="1 채널" />
      <RoomList id="2" text="2 채널" />
      <RoomList id="3" text="3 채널" />
      <RoomList id="4" text="4 채널" />
      <RoomList id="5" text="5 채널" />
      <RoomList id="6" text="6 채널" />
      <RoomList id="7" text="7 채널" />
      <RoomList id="8" text="8 채널" />
      <RoomList id="9" text="9 채널" />
      <RoomList id="10" text="10 채널" />
      <RoomList id="11" text="11 채널" />
      <RoomList id="12" text="12 채널" />
      <RoomList id="13" text="13 채널" />
      <RoomList id="14" text="14 채널" />
      <RoomList id="15" text="15 채널" />
      <RoomList id="16" text="16 채널" />
      <RoomList id="17" text="17 채널" />
      <RoomList id="18" text="18 채널" />
      <RoomList id="19" text="19 채널" />
      <RoomList id="20" text="20 채널" />
      <RoomList id="21" text="21 채널" />
      <RoomList id="22" text="22 채널" />
      <RoomList id="23" text="23 채널" />
      <RoomList id="24" text="24 채널" />
      <RoomList id="25" text="25 채널" />
      <RoomList id="26" text="26 채널" />
      <RoomList id="27" text="27 채널" />
      <RoomList id="28" text="28 채널" />
      <RoomList id="29" text="29 채널" />
      <RoomList id="30" text="30 채널" />
    </WrapChannelUL>
  );
}
const WrapChannelUL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  font-size: 20px;
  li {
    width: 120px;
    padding: 20px;
    color: #fff;
    background-color: #666;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
  }
  li:hover {
    box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.2);
  }
`;
