/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from "react";
import { makeChannelAPI, makeRoomAPI, makeTeamAPI } from "../../api/api";
import { getChannels, getRooms, getTeams, removeChannel, removeRoom, removeTeam } from "../../utils/api";
import Admin from "./Admin";

export default function AdminContainer() {
  const [channels, setChannels] = useState(null);
  const [roomLists, setRoomLists] = useState(null);
  const [teamLists, setTeamLists] = useState(null);

  const [currentChannel, setCurrentChannel] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [selected, setSelected] = useState({});

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getChannels(setChannels);
  }, []);

  const onDeleteChannel = async (channelId) => {
    await removeChannel(channelId);
    getChannels(setChannels);
  };

  const onDeleteRoom = async (roomId) => {
    await removeRoom(roomId);
    getRooms(currentChannel, setRoomLists);
  };

  const onDeleteTeam = async (teamId) => {
    await removeTeam(teamId);
    getTeams(currentRoom, setTeamLists);
  };

  const onHandleChange = (ev) => {
    switch (ev.target.id) {
      case "Channel":
        setName(ev.target.value);
        break;
      case "Room":
        setRoom(ev.target.value);
        break;
      case "channel-pw":
        setPassword(ev.target.value);
        break;
      default:
        break;
    }
  };

  // 클래스 toggle selected
  const highLightUI = (id) => {
    setSelected((prevSelection) => ({ [id]: !prevSelection[id] }));
  };

  const onCreateChannel = async () => {
    await makeChannelAPI(name, password);
    getChannels(setChannels);
    setName("");
    setPassword("");
  };

  const displayRooms = async (channelId) => {
    highLightUI(channelId);
    getRooms(channelId, setRoomLists);
    setCurrentChannel(channelId);
  };

  // 인자로 number 받아서 그 갯수만큼 팀 만들어줌
  const makeTeams = async (roomName, roomId, number = 4) => {
    for (let i = 0; i < number; i++) {
      const title = `${roomName}-${i + 1}팀`;
      await makeTeamAPI(title, roomId);
    }
  };

  const displayTeams = async (roomId) => {
    highLightUI(roomId);
    getTeams(roomId, setTeamLists);
    setCurrentRoom(roomId);
  };

  const onHandleKeyDown = async (ev) => {
    const enter = 13;
    if (ev.target.id === "Room") {
      if (ev.keyCode === enter) {
        const response = await makeRoomAPI(currentChannel, room);
        const result = await response.json();

        setRoom("");
        getRooms(currentChannel, setRoomLists);
        const {
          newRoom: { title, _id: roomId },
        } = result;

        makeTeams(title, roomId);
      }
    }
  };

  return (
    <Admin
      channelName={name}
      roomName={room}
      password={password}
      channels={channels}
      rooms={roomLists}
      teams={teamLists}
      selected={selected}
      onDisplayRooms={displayRooms}
      onDisplayTeams={displayTeams}
      onCreateChannel={onCreateChannel}
      onDeleteChannel={onDeleteChannel}
      onDeleteRoom={onDeleteRoom}
      onDeleteTeam={onDeleteTeam}
      onHandleChange={onHandleChange}
      onHandleKeyDown={onHandleKeyDown}
    />
  );
}
