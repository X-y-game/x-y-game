import React from "react";
import { useHistory } from "react-router-dom";

export default function roomList({ text, id, channelId }) {
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: `/waiting/${channelId}-${id}`,
      state: { channel: channelId },
    });
  };
  return (
    <li id={id} onClick={handleClick} onKeyDown={handleClick} aria-hidden="true">
      {text}
    </li>
  );
}
