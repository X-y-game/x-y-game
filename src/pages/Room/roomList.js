import React from "react";
import { useHistory } from "react-router-dom";

export default function roomList({ text, id, channelIndex, roomNum, channelId }) {
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: `/waiting/${channelIndex}-${roomNum}`,
      state: { roomTile: text },
    });
  };
  return (
    <li onClick={handleClick} onKeyDown={handleClick} aria-hidden="true">
      {text}
    </li>
  );
}
