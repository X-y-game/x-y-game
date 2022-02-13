import React, { useState } from "react";
import PropTypes from "prop-types";
import CheckPw from "../../components/CheckPw";

export default function List({ text, index, channelId, pw }) {
  const [openPwForm, setOpenPwForm] = useState(false);
  const handleClick = () => {
    setOpenPwForm(!openPwForm);
  };
  return (
    <>
      {openPwForm && <CheckPw passWord={pw} index={index} channelId={channelId} title={text} />}
      <li onClick={handleClick} onKeyDown={handleClick} aria-hidden="true">
        {text}
      </li>
    </>
  );
}

List.propTypes = {
  text: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  pw: PropTypes.string.isRequired,
};
