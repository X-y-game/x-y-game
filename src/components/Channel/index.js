import React from "react";
import styled from "styled-components";
import List from "../List";

export default function Channel() {
  const chaanel = "2 채널";

  return (
    <ChannelBody>
      <ChannelPage>
        <TitleH2>채널을 선택하세요</TitleH2>
        <WrapChannelUL>
          <li>1 채널</li>
          <List text={chaanel} />
        </WrapChannelUL>
      </ChannelPage>
    </ChannelBody>
  );
}

const ChannelBody = styled.div`
  background-color: #eee;
  height: 100vh;
`;

const ChannelPage = styled.div`
  width: 50%;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
`;

const TitleH2 = styled.h2`
  font-size: 42px;
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 50px;
  border-bottom: 1px solid #000;
`;

const WrapChannelUL = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 24px;
  li {
    width: 100%;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
  }
  li:hover {
    box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.2);
  }
`;
