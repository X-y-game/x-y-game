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

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [team, setTeam] = useState("");
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
      case "Team":
        setTeam(ev.target.value);
        break;
      case "channel-pw":
        setPassword(ev.target.value);
        break;
      default:
        break;
    }
  };

  const onCreateChannel = async () => {
    await makeChannelAPI(name, password);
    getChannels(setChannels);
    setName("");
    setPassword("");
  };

  const displayRooms = async (channelId) => {
    getRooms(channelId, setRoomLists);
    setCurrentChannel(channelId);
  };

  const displayTeams = async (roomId) => {
    getTeams(roomId, setTeamLists);
    setCurrentRoom(roomId);
  };

  const onHandleKeyDown = async (ev) => {
    const enter = 13;
    if (ev.target.id === "Room") {
      if (ev.keyCode === enter) {
        await makeRoomAPI(currentChannel, room);
        setRoom("");
        getRooms(currentChannel, setRoomLists);
      }
    }

    if (ev.target.id === "Team") {
      if (ev.keyCode === enter) {
        await makeTeamAPI(team, currentRoom);
        setTeam("");
        getTeams(currentRoom, setTeamLists);
      }
    }
  };

  return (
    <Admin
      channelName={name}
      roomName={room}
      teamName={team}
      password={password}
      channels={channels}
      rooms={roomLists}
      teams={teamLists}
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
