import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Channel from "../../components/Channel";
import Header from "../../components/Header";

export default function Channels({ channels }) {
  return (
    <ChannelBody>
      <ChannelPage>
        <Header title="채널을 선택하세요" channel="" roomId="" />
        <WrapChannel>
          {channels?.channelLists?.map(({ _id, title, password }, index) => (
            <Channel key={`channel${_id}`} index={index + 1} text={title} channelId={_id} pw={password} />
          ))}
        </WrapChannel>
      </ChannelPage>
    </ChannelBody>
  );
}

Channels.propTypes = {
  channels: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.array), PropTypes.arrayOf(PropTypes.array)]).isRequired,
};

const ChannelBody = styled.div`
  height: 100%;
`;

const ChannelPage = styled.div`
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
`;

const WrapChannel = styled.ul`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0 40% 0;
  font-size: 1.5em;
  li {
    width: 100%;
    padding: 20px;
    border-radius: 50px;
    background-color: #54628c;
    text-align: center;
    color: #fff;
    transition: 0.2s;
    cursor: pointer;
  }
  li:active {
    color: #f2aeae;
  }
  @media screen and (max-width: 1000px) {
    padding: 0 10% 0;
    transition: 0.1s;
  }
`;
