import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function CheckPw({ passWord, index, channelId, title, handleClick }) {
  const [wrongPw, setWrongPw] = useState(true);
  const [inputText, setInputText] = useState("");
  const history = useHistory();

  const checkPw = () => {
    if (passWord !== inputText) {
      setWrongPw(false);
      setInputText("");
    } else {
      setWrongPw(true);
      setInputText("");
      history.push({
        pathname: `/channel/${index}`,
        state: { channel: channelId, title: `${title}` },
      });
    }
  };

  const onChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <Wrap>
      <CheckPassWard>
        <p>비밀번호를 입력하세요 👀</p>
        <input type="text" onChange={onChange} value={inputText} />
        <Message check={wrongPw}>비밀번호가 틀렸습니다.</Message>
        <EnterButton type="submit" onClick={checkPw}>
          입력
        </EnterButton>
      </CheckPassWard>
      <Dimd onClick={handleClick}>dimd</Dimd>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const CheckPassWard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 30%;
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  background-color: #c1d0fb;
  p {
    margin-bottom: 20px;
  }
  input {
    line-height: 1.5em;
    border: 1px solid #eee;
    border-radius: 5px;
  }
`;

const EnterButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  font-weight: bold;
  color: #fff;
  background-color: #252940;
  &:hover {
    background-color: #54628c;
  }
`;

const Message = styled.p`
  display: ${(props) => (props.check === true ? "none" : "block")};
  position: absolute;
  bottom: 55px;
  font-size: 16px;
  color: #ff0000;
`;

const Dimd = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  font-size: 0;
  background: rgba(0, 0, 0, 0.2);
`;

CheckPw.propTypes = {
  passWord: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  channelId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
