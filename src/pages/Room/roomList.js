import React from "react";
import { useHistory } from "react-router-dom";

export default function roomList({ text, id }) {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/waiting/${id}`);
  };
  return (
    <li id={id} onClick={handleClick} onKeyDown={handleClick} aria-hidden="true">
      {text}
    </li>
  );
}
