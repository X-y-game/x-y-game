import React from "react";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import SetList from "./setList";

export default function Channel() {
  const handleClick = () => {
    console.log("뒤로");
  };

  return (
    <ChannelBody>
      <ChannelPage>
        <Header>
          <button type="button" onClick={handleClick} className="backBtn">
            <FaChevronLeft />
          </button>
          <h2>룸을 선택하세요</h2>
        </Header>
        <SetList />
      </ChannelPage>
    </ChannelBody>
  );
}

const ChannelBody = styled.div`
  background-color: #eee;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-bottom: 30px;
  margin-bottom: 50px;
  border-bottom: 1px solid #000;
  position: relative;
  h2 {
    display: inline-block;
    font-size: 42px;
  }
  .backBtn {
    position: absolute;
    font-size: 25px;
    background-color: inherit;
    left: 0;
    top: 50%;
    margin-top: -35px;
    padding: 10px;
  }
`;

const ChannelPage = styled.div`
  width: 50%;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
`;
