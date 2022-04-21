import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import GoBackButton from "../GoBackButton";

export default function Header({ title, channel, roomId }) {
  const location = useLocation();

  return (
    <Title>
      <GoBackButton />
      {location.pathname.includes("channel/") ? (
        <Infodata>{channel}</Infodata>
      ) : (
        <Infodata>
          <Infodata>{roomId}</Infodata>
        </Infodata>
      )}
      {title}
    </Title>
  );
}

const Title = styled.h2`
  margin: 50px 0 50px;
  padding-bottom: 70px;
  border-bottom: 1px solid #343a40;
  text-align: center;
  font-size: 2em;
`;

const Infodata = styled.header`
  margin-bottom: 10px;
  font-size: 0.5em;
`;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
};
