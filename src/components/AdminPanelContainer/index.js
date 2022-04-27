/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Proptypes from "prop-types";
import AdminPanelList from "../AdminPanelList";

export default function AdminPanelContainer({
  title,
  placeholder,
  data,
  selected,
  onDelete,
  onHandleChange,
  onHandleClick,
  onHandleKeyDown,
  onHandleDisplay,
  name,
  password,
}) {
  const [showInput, setShowInput] = useState(false);
  const containerTitle = title.split(" ")[0];

  useEffect(() => {
    if (containerTitle === "Channel") {
      setShowInput(!showInput);
    }
  }, []);

  return (
    <Wrapper>
      <h2>{title}</h2>
      {data && <AdminPanelList data={data} onDelete={onDelete} onDisplay={onHandleDisplay} selected={selected} />}

      <input
        type="text"
        id={containerTitle}
        placeholder={placeholder}
        onChange={onHandleChange}
        value={name}
        onKeyDown={(ev) => onHandleKeyDown(ev)}
      />
      {showInput && (
        <>
          <input
            type="password"
            id="channel-pw"
            minLength="4"
            placeholder="4글자 이상 패스워드를 셋팅해주세요"
            onChange={onHandleChange}
            value={password}
          />
          <button type="button" onClick={onHandleClick}>
            생성
          </button>
        </>
      )}
    </Wrapper>
  );
}

AdminPanelContainer.propTypes = {
  title: Proptypes.string.isRequired,
  placeholder: Proptypes.string.isRequired,
  data: Proptypes.objectOf(Proptypes.array),
  onDelete: Proptypes.func,
  onHandleChange: Proptypes.func,
  onHandleClick: Proptypes.func,
  onHandleKeyDown: Proptypes.func,
  onHandleDisplay: Proptypes.func,
  name: Proptypes.string.isRequired,
  password: Proptypes.string,
};

AdminPanelContainer.defaultProps = {
  data: null,
  onDelete: null,
  onHandleChange: null,
  onHandleClick: null,
  onHandleKeyDown: null,
  onHandleDisplay: null,
  password: "",
};

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
    margin-right: 10px;
    cursor: pointer;
  }

  li > button:last-child {
    width: 25%;
    margin: 0;
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
