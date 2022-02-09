import React from "react";
import PropTypes from "prop-types";

export default function List({ text, id }) {
  return <li id={id}>{text}</li>;
}

List.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
