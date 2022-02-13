import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export default function List({ text, id, channelId }) {
  const history = useHistory();
  const handelClick = () => {
    history.push({
      pathname: `/lobby/${id}`,
      state: { channel: channelId },
    });
  };
  return (
    <li id={id} onClick={handelClick} onKeyDown={handelClick} aria-hidden="true">
      {text}
    </li>
  );
}

List.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  channelId: PropTypes.string.isRequired,
};
