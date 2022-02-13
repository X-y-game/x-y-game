import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export default function List({ text, index, channelId }) {
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: `/channel/${index}`,
      state: { channel: channelId, title: text },
    });
  };
  return (
    <li onClick={handleClick} onKeyDown={handleClick} aria-hidden="true">
      {text}
    </li>
  );
}

List.propTypes = {
  text: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
