import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Channel from "../../components/Channel";

export default function Channels({ channels }) {
  return (
    <ChannelBody>
      <ChannelPage>
        <Title>채널을 선택하세요.</Title>
        <WrapChannel>
          {channels?.channelLists?.map(({ _id, title, password }, index) => (
            <Channel key={`channel${_id}`} index={index + 1} text={title} channelId={_id} pw={password} />
          ))}
        </WrapChannel>
      </ChannelPage>
    </ChannelBody>
  );
}

// TODO: proptypes check
Channels.propTypes = {
  channels: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object))).isRequired,
};

const ChannelBody = styled.div`
  background-color: #e0dede;
`;

const ChannelPage = styled.div`
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #000;
  text-align: center;
  font-size: 2em;
`;

const WrapChannel = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 1.5em;
  li {
    width: 100%;
    padding: 20px;
    background-color: #fbf2f2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: 0.2s;
    cursor: pointer;
  }
  li:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
