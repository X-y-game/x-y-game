import React from "react";
import styled from "styled-components";

export default function RuleBook({ onClick }) {
  return (
    <ModalDiv onClick={onClick}>
      <p>게임 규칙</p>
      <WrapRule>
        <Rule>
          <RuleContent>
            🙆‍♂️ 🙆‍♂️ 🙆 🙆
            <WrapCard>
              <p>Y</p>
            </WrapCard>
            <p>
              각 100억 <Isprofit name="profit">이익</Isprofit>
            </p>
          </RuleContent>
        </Rule>
        <Rule>
          <RuleContent>
            🤦‍♂️ 🤦‍♂️ 🤦 🤦
            <WrapCard>
              <p>X</p>
            </WrapCard>
            <p>
              각 100억 <Isprofit name="loss">손실</Isprofit>
            </p>
          </RuleContent>
        </Rule>
        <Rule>
          <RuleContent>
            🤦‍♂️ 🤦‍♂️ 🙆 🤦
            <WrapCard>
              <p>Y</p>
              <p>Y</p>
              <p>X</p>
              <p>Y</p>
            </WrapCard>
            <p>
              X : 300억 <Isprofit name="profit">이익</Isprofit>
            </p>
            <p>
              Y : 100억 <Isprofit name="loss">손실</Isprofit>
            </p>
          </RuleContent>
        </Rule>
        <Rule>
          <RuleContent>
            🤦‍♂️ 🙆‍♂️ 🙆 🙆
            <WrapCard>
              <p>Y</p>
              <p>X</p>
              <p>X</p>
              <p>X</p>
            </WrapCard>
            <p>
              X : 100억 <Isprofit name="profit">이익</Isprofit>
            </p>
            <p>
              Y : 300억 <Isprofit name="loss">손실</Isprofit>
            </p>
          </RuleContent>
        </Rule>
        <Rule>
          <RuleContent>
            🤦‍♂️ 🤦‍♂️ 🙆 🙆
            <WrapCard>
              <p>Y</p>
              <p>Y</p>
              <p>X</p>
              <p>X</p>
            </WrapCard>
            <p>
              X : 200억 <Isprofit name="profit">이익</Isprofit>
            </p>
            <p>
              Y : 200억 <Isprofit name="loss">손실</Isprofit>
            </p>
          </RuleContent>
        </Rule>
      </WrapRule>
    </ModalDiv>
  );
}

const ModalDiv = styled.div`
  position: absolute;
  top: 10vh;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
  border-radius: 5px;
  background-color: #c1d0fb;
  text-align: center;
  p {
    font-size: 1.5em;
    font-weight: bold;
  }
`;

const Rule = styled.div`
  width: 30vw;
  p {
    font-size: 1em;
  }
`;

const RuleContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  p {
    font-size: 0.8em;
  }
`;

const WrapCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  p {
    font-size: 1em;
  }
`;

const Isprofit = styled.span`
  color: ${(props) => (props.name === "profit" ? "#7988D9" : "#F17E7E")};
`;

const WrapRule = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  width: 100%;
  margin: 0 auto;
`;
