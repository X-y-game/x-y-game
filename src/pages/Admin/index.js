import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminPanel from "../../components/AdminPanel";
import { getChannelsAPI, removeChannel, makeChannelAPI, getRoomAPI, getTeamsAPI, makeRoomAPI } from "../../api/api";

export default function Admin() {
  const [channels, setChannels] = useState(null);
  const [roomLists, setRoomLists] = useState(null);
  const [teamLists, setTeamLists] = useState(null);
  const [currentChannel, setCurrentChannel] = useState("");

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [team, setTeam] = useState("");
  const [password, setPassword] = useState("");

  async function getChannels() {
    const channelList = await (await getChannelsAPI()).json();
    setChannels(channelList);
  }

  async function getRooms() {
    const rooms = await (await getRoomAPI(currentChannel)).json();
    setRoomLists(rooms);
  }

  useEffect(() => {
    getChannels();
  }, []);

  const onDelete = async (channelId) => {
    await removeChannel(channelId);
    getChannels();
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
    getChannels();
    setName("");
    setPassword("");
  };

  const displayRooms = async (channelId) => {
    const rooms = await (await getRoomAPI(channelId)).json();
    setRoomLists(rooms);
    setCurrentChannel(channelId);
  };

  const displayTeams = async (roomId) => {
    const teams = await (await getTeamsAPI(roomId)).json();
    setTeamLists(teams);
  };

  const onHandleKeyDown = async (ev) => {
    if (ev.target.id === "Room") {
      const enter = 13;
      if (ev.keyCode === enter) {
        await makeRoomAPI(currentChannel, room);
        setRoom("");
        getRooms();
      }
    }

    if (ev.target.id === "Team") {
      // console.log("team");
    }
  };

  return (
    <Container>
      <h1>XY Admin Panel</h1>

      {channels && (
        <AdminPanel
          title="Channel List"
          placeholder="채널 생성하기 콤마로 맥스 인원을 정해주세요! 예시) 멋쟁이신사처럼,100"
          data={channels}
          onDelete={onDelete}
          onHandleChange={onHandleChange}
          onHandleKeyDown={onHandleKeyDown}
          onDisplay={displayRooms}
          onClick={onCreateChannel}
          name={name}
          password={password}
        />
      )}

      {roomLists ? (
        <AdminPanel
          title="Room List"
          placeholder="룸 생성하기"
          data={roomLists}
          name={room}
          onHandleChange={onHandleChange}
          onHandleKeyDown={onHandleKeyDown}
          onDisplay={displayTeams}
        />
      ) : (
        <AdminPanel
          title="Room List"
          placeholder="룸 생성하기"
          name={room}
          onHandleChange={onHandleChange}
          onHandleKeyDown={onHandleKeyDown}
        />
      )}

      {teamLists ? (
        <AdminPanel
          title="Team List"
          placeholder="팀 생성하기"
          data={teamLists}
          name={team}
          onHandleChange={onHandleChange}
          onHandleKeyDown={onHandleKeyDown}
        />
      ) : (
        <AdminPanel
          title="Team List"
          placeholder="팀 생성하기"
          name={team}
          onHandleChange={onHandleChange}
          onHandleKeyDown={onHandleKeyDown}
        />
      )}
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
