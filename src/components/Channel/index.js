import React, { useState } from "react";
import PropTypes from "prop-types";
import CheckPw from "../CheckPw";
import soundPlay from "../../utils/sound";

export default function Channel({ text, index, channelId, pw }) {
  const [openPwForm, setOpenPwForm] = useState(false);
  const handleClick = () => {
    setOpenPwForm(!openPwForm);
    soundPlay("click");
  };
  return (
    <>
      {openPwForm && (
        <CheckPw passWord={pw} index={index} channelId={channelId} title={text} handleClick={handleClick} />
      )}
      <li onClick={handleClick} onKeyDown={handleClick} aria-hidden="true">
        {text}
      </li>
    </>
  );
}

Channel.propTypes = {
  text: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  pw: PropTypes.string.isRequired,
};
