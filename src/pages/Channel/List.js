import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export default function List({ text, id, channelId, num }) {
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: `/lobby/${channelId}`,
      state: { channel: num },
    });
  };
  return (
    <li id={id} onClick={handleClick} onKeyDown={handleClick} aria-hidden="true">
      {text}
    </li>
  );
}

List.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  channelId: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
};
