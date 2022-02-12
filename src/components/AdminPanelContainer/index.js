import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import Proptypes from "prop-types";
import AdminPanelList from "../AdminPanelList";
import { makeChannelAPI } from "../../api/api";

export default function AdminPanelContainer({ title, placeholder, data }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showInput, setShowInput] = useState(false);
  const containerTitle = title.split(" ")[0];

  // socket객체 정의
  const server = "http://localhost:8000/";
  // const socket = io.connect(server, { cors: { origin: "*" } });

  const handleKeyDown = async (ev) => {
    const enter = 13;
    if (ev.keyCode === enter) {
      switch (ev.target.id) {
        case "Channel":
          await makeChannelAPI(name, password);
          break;

        case "Room":
          break;

        case "Team":
          break;
        default:
          break;
      }

      setName("");
      setPassword("");
    }
  };

  const handleOnChange = (ev) => {
    if (ev.target.name === "channel-pw") {
      setPassword(ev.target.value);
    } else {
      setName(ev.target.value);
    }
  };

  useEffect(() => {
    if (containerTitle === "Channel") {
      setShowInput(!showInput);
    }
  }, []);

  return (
    <Wrapper>
      <h2>{title}</h2>
      {data && <AdminPanelList data={data.channelLists} />}

      <input
        type="text"
        id={containerTitle}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        value={name}
      />
      {showInput && (
        <input
          type="password"
          name="channel-pw"
          minLength="4"
          placeholder="4글자 이상 패스워드를 셋팅해주세요"
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #eeeeee;
  border: solid 1px #444444;
  border-radius: 5px;
  padding: 15px 10px;
  margin-top: 10px;
  box-shadow: 0 0 5px #22222277;

  h2 {
    padding-bottom: 5px;
    border-bottom: solid 1px #222222;
  }

  span,
  button {
    width: calc(75% - 10px);
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    line-height: 40px;
    background-color: #fbf2f2;
    color: #252940;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    margin-top: 15px;
    cursor: pointer;
  }

  span {
    display: inline-block;
    margin-right: 10px;
  }

  li > button {
    width: 25%;
  }

  input {
    font-size: 1rem;
    background: #22222233;
    border: #222222aa;
    border-radius: 3px;
    color: #222222;
    width: 100%;
    min-height: 25px;
    line-height: 25px;
    margin-top: 10px;
    padding: 0 5px;
    box-sizing: border-box;
  }
`;

AdminPanelContainer.propTypes = {
  title: Proptypes.string.isRequired,
  placeholder: Proptypes.string.isRequired,
  data: Proptypes.objectOf(Proptypes.array),
};

AdminPanelContainer.defaultProps = {
  data: null,
};
