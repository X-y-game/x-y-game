import React from "react";
import { useHistory } from "react-router-dom";

export default function roomList({ text, id, channelId, roomNum, channelNum }) {
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: `/waiting/${channelId}-${roomNum}`,
      state: { room: text },
    });
  };
  return (
    <li onClick={handleClick} onKeyDown={handleClick} aria-hidden="true">
      {text}
    </li>
  );
}
