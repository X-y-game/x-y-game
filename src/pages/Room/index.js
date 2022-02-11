import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import RoomList from "./roomList";

export default function Room() {
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
        <Header>
          <button type="button" onClick={handleClick} className="backBtn">
            {"<"}
          </button>
          <h2>룸을 선택하세요</h2>
        </Header>
        <WrapChannelUL>
          {RoomArr.map((it) => (
            <RoomList key={it} id={it} text={`${it} 룸`} />
          ))}
        </WrapChannelUL>
      </ChannelPage>
    </Body>
  );
}

const Body = styled.div`
  background-color: #e0dede;
`;

const Header = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #000;
  h2 {
    display: inline-block;
    font-size: 2em;
  }
  .backBtn {
    position: absolute;
    left: 0;
    top: 50%;
    padding: 10px;
    margin-top: -35px;
    background-color: inherit;
    font-size: 25px;
  }
`;

const ChannelPage = styled.div`
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
