import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import RoomList from "./roomList";
import Header from "../../components/Header";

export default function Room() {
  const { id } = useParams();
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  const RoomArr = Array(30)
    .fill(1)
    .map((v, i) => v + i);

  return (
    <Body>
      <ChannelPage>
        <BackButton type="button" onClick={handleClick}>
          {"<"}
        </BackButton>
        <Header title="룸을 선택하세요." channelId={id} roomId="none" />
        <WrapChannelUL>
          {RoomArr.map((iterator) => (
            <RoomList key={iterator} channelId={id} id={iterator} text={`${iterator} 룸`} />
          ))}
        </WrapChannelUL>
      </ChannelPage>
    </Body>
  );
}

const Body = styled.div`
  background-color: #e0dede;
`;

const BackButton = styled.button`
  position: absolute;
  left: 10px;
  top: 6vh;
  padding: 10px;
  margin-top: -35px;
  background-color: inherit;
  font-size: 25px;
`;

const ChannelPage = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background-color: #e0dede;
`;

const WrapChannelUL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  font-size: 20px;
  li {
    width: 4.5em;
    padding: 20px;
    background-color: #fbf2f2;
    border-radius: 5px;
    text-align: center;
    transition: 0.2s;
    cursor: pointer;
  }
  li:hover {
    box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.2);
  }
`;
