import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function RuleBook({ handleClick }) {
  return (
    <>
      <ModalDiv onClick={handleClick}>
        <ModalName>게임 규칙</ModalName>
        <WrapRule>
          <Rule>
            <RuleContent>
              <div>
                <span>🙆‍♂️</span>
                <span>🙆‍♂️</span>
                <span>🙆</span>
                <span>🙆</span>
              </div>
              <p>Y</p>
              <p>
                각 100억 <Isprofit name="profit">이익</Isprofit>
              </p>
            </RuleContent>
          </Rule>
          <Rule>
            <RuleContent>
              <div>
                <span>🤦‍♂️</span>
                <span>🤦‍♂️</span>
                <span>🤦</span>
                <span>🤦</span>
              </div>
              <p>X</p>
              <p>
                각 100억 <Isprofit name="loss">손실</Isprofit>
              </p>
            </RuleContent>
          </Rule>
          <Rule>
            <RuleContent>
              <div>
                <span>🤦‍♂️</span>
                <span>🤦‍♂️</span>
                <span>🙆</span>
                <span>🤦</span>
              </div>
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
              <div>
                <span>🤦‍♂️</span>
                <span>🙆‍♂️</span>
                <span>🙆</span>
                <span>🙆</span>
              </div>
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
              <div>
                <span> 🤦‍♂️</span>
                <span> 🤦‍♂️</span>
                <span>🙆</span>
                <span>🙆</span>
              </div>
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
      <Dimd onClick={handleClick}>dimd</Dimd>
    </>
  );
}

const ModalDiv = styled.div`
  position: absolute;
  top: 8vh;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
  border-radius: 5px;
  background-color: #54628c;
  z-index: 10;
  p {
    font-weight: bold;
  }
  @media screen and (min-width: 700px) {
    height: 60vh;
    justify-content: center;
    align-items: center;
  }
`;

const ModalName = styled.p`
  margin-bottom: 50px;
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
  @media screen and (min-width: 700px) {
    font-size: 2em;
  }
`;

const Rule = styled.div`
  max-width: 45vw;
  padding: 10px;
  border-radius: 5px;
  background-color: #e0dede;
  box-sizing: border-box;

  p {
    font-size: 1em;
  }
`;

const RuleContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  p {
    font-size: 1.3em;
    color: #000;
  }
  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 1.5em;
  }
`;

const WrapCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
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
  width: 100vw;
  margin: 0 auto;
`;

const Dimd = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 0;
`;

RuleBook.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
