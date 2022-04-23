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
              <WrapCard>
                <XYcard name="Y">Y</XYcard>
                <XYcard name="Y">Y</XYcard>
                <XYcard name="Y">Y</XYcard>
                <XYcard name="Y">Y</XYcard>
              </WrapCard>
              <p>
                각 100억 <Isprofit name="profit">이익</Isprofit>
              </p>
            </RuleContent>
          </Rule>
          <Rule>
            <RuleContent>
              <WrapCard>
                <XYcard name="X">X</XYcard>
                <XYcard name="X">X</XYcard>
                <XYcard name="X">X</XYcard>
                <XYcard name="X">X</XYcard>
              </WrapCard>
              <p>
                각 100억 <Isprofit name="loss">손실</Isprofit>
              </p>
            </RuleContent>
          </Rule>
          <Rule>
            <RuleContent>
              <WrapCard>
                <XYcard name="X">X</XYcard>
                <XYcard name="Y">Y</XYcard>
                <XYcard name="Y">Y</XYcard>
                <XYcard name="Y">Y</XYcard>
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
              <WrapCard>
                <XYcard name="X">X</XYcard>
                <XYcard name="X">X</XYcard>
                <XYcard name="X">X</XYcard>
                <XYcard name="Y">Y</XYcard>
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
              <WrapCard>
                <XYcard name="X">X</XYcard>
                <XYcard name="X">X</XYcard>
                <XYcard name="Y">Y</XYcard>
                <XYcard name="Y">Y</XYcard>
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
  @media screen and (min-width: 700px) {
    height: 60vh;
    justify-content: center;
    align-items: center;
  }
`;

const ModalName = styled.p`
  font-size: 2em;
  color: #fff;
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

const XYcard = styled.p`
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => (props.name === "X" ? "#7988D9" : "#F17E7E")};
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
  background-color: rgba(0, 0, 0, 0.7);
`;

RuleBook.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
