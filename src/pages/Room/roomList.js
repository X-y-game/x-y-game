import React from "react";
import { useHistory } from "react-router-dom";

export default function roomList({ text, id, channelId, roomNum, channelNum }) {
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: `/waiting/${channelId}-${id}`,
      state: { channel: `${channelNum}-${roomNum}` },
    });
  };
  return (
    <li id={id} onClick={handleClick} onKeyDown={handleClick} aria-hidden="true">
      {text}
    </li>
  );
}
