import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ title, channelId, roomId }) {
  const location = useLocation();

  return (
    <Title>
      {location.pathname.includes("lobby/") ? (
        <Infodata>채널 : {+channelId + 1}</Infodata>
      ) : (
        <Infodata>
          채널 : {+channelId + 1} 룸 : {roomId}
        </Infodata>
      )}
      {title}
    </Title>
  );
}

const Title = styled.h2`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #000;
  text-align: center;
  font-size: 2em;
`;

const Infodata = styled.p`
  margin-bottom: 10px;
  font-size: 0.4em;
`;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
};
