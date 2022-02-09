import React from "react";
import styled from "styled-components";
import SetList from "./setList";

export default function Room() {
  const handleClick = () => {
    console.log("뒤로");
  };

  return (
    <Body>
      <ChannelPage>
        <Header>
          <button type="button" onClick={handleClick} className="backBtn">
            {"<"}
          </button>
          <h2>룸을 선택하세요</h2>
        </Header>
        <SetList />
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
