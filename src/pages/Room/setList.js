import React from "react";
import styled from "styled-components";
import RoomList from "./roomList";

export default function SetList() {
  return (
    <WrapChannelUL>
      <RoomList id="1" text="1 룸" />
      <RoomList id="2" text="2 룸" />
      <RoomList id="3" text="3 룸" />
      <RoomList id="4" text="4 룸" />
      <RoomList id="5" text="5 룸" />
      <RoomList id="6" text="6 룸" />
      <RoomList id="7" text="7 룸" />
      <RoomList id="8" text="8 룸" />
      <RoomList id="9" text="9 룸" />
      <RoomList id="10" text="10 룸" />
      <RoomList id="11" text="11 룸" />
      <RoomList id="12" text="12 룸" />
      <RoomList id="13" text="13 룸" />
      <RoomList id="14" text="14 룸" />
      <RoomList id="15" text="15 룸" />
      <RoomList id="16" text="16 룸" />
      <RoomList id="17" text="17 룸" />
      <RoomList id="18" text="18 룸" />
      <RoomList id="19" text="19 룸" />
      <RoomList id="20" text="20 룸" />
      <RoomList id="21" text="21 룸" />
      <RoomList id="22" text="22 룸" />
      <RoomList id="23" text="23 룸" />
      <RoomList id="24" text="24 룸" />
      <RoomList id="25" text="25 룸" />
      <RoomList id="26" text="26 룸" />
      <RoomList id="27" text="27 룸" />
      <RoomList id="28" text="28 룸" />
      <RoomList id="29" text="29 룸" />
      <RoomList id="30" text="30 룸" />
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
