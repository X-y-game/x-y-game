/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import AdminPanel from "../../components/AdminPanel";

export default function Admin({
  channelName,
  roomName,
  password,
  channels,
  rooms,
  teams,
  selected,
  onHandleChange,
  onHandleKeyDown,
  onDisplayRooms,
  onDisplayTeams,
  onCreateChannel,
  onDeleteChannel,
  onDeleteRoom,
  onDeleteTeam,
}) {
  return (
    <Container>
      <h1>XY Admin Panel</h1>

      {channels && (
        <AdminPanel
          title="Channel List"
          placeholder="채널 생성하기 콤마로 맥스 인원을 정해주세요! 예시) 멋쟁이신사처럼,100"
          data={channels}
          selected={selected}
          onDelete={onDeleteChannel}
          onHandleChange={onHandleChange}
          onHandleKeyDown={onHandleKeyDown}
          onDisplay={onDisplayRooms}
          onClick={onCreateChannel}
          name={channelName}
          password={password}
        />
      )}

      {rooms ? (
        <AdminPanel
          title="Room List"
          placeholder="룸 생성하기"
          data={rooms}
          name={roomName}
          selected={selected}
          onHandleChange={onHandleChange}
          onHandleKeyDown={onHandleKeyDown}
          onDisplay={onDisplayTeams}
          onDelete={onDeleteRoom}
        />
      ) : (
        <AdminPanel
          title="Room List"
          placeholder="룸 생성하기"
          name={roomName}
          onHandleChange={onHandleChange}
          onHandleKeyDown={onHandleKeyDown}
        />
      )}

      {teams ? (
        <AdminPanel
          title="Team List"
          placeholder="팀 생성하기"
          data={teams}
          onDelete={onDeleteTeam}
          selected={selected}
        />
      ) : (
        <AdminPanel title="Team List" placeholder="팀 생성하기" />
      )}
    </Container>
  );
}

Admin.propTypes = {
  channelName: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  channels: PropTypes.objectOf(PropTypes.arrayOf(Object)),
  rooms: PropTypes.objectOf(PropTypes.arrayOf(Object)),
  teams: PropTypes.objectOf(PropTypes.arrayOf(Object)),
  onHandleChange: PropTypes.func.isRequired,
  onHandleKeyDown: PropTypes.func.isRequired,
  onDisplayRooms: PropTypes.func.isRequired,
  onDisplayTeams: PropTypes.func.isRequired,
  onCreateChannel: PropTypes.func.isRequired,
  onDeleteChannel: PropTypes.func.isRequired,
  onDeleteRoom: PropTypes.func.isRequired,
  onDeleteTeam: PropTypes.func.isRequired,
};

Admin.defaultProps = {
  channels: null,
  rooms: null,
  teams: null,
};

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
