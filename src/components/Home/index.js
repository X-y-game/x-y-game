import React from "react";
import styled from "styled-components";
import logo from "../../assets/xy-logo.png";
import homeposter from "../../assets/mainHome.jpg";

export default function Home() {
  return (
    <Wrapper>
      <GameIntro>
        <div>
          <h1>
            <Logo src={logo} alt="logo" />
          </h1>
          <p className="game-intro">Win as much as you can</p>
        </div>
        <Poster src={homeposter} alt="game-poster" />
        <Button type="button">Start</Button>
      </GameIntro>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const GameIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    margin-bottom: 21px;
  }

  p {
    font-size: 1.5em;
    font-weight: 500;
    text-align: center;
    margin: 1.2em 0 1.5em 0;
    text-transform: uppercase;
  }
`;

const Logo = styled.img`
  width: 3.5em;
  margin-right: 15px;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 25%;
  height: 2.5em;
  font-size: 1.2rem;
  border-radius: 1.2rem;
  background-color: #54628c;
  margin-top: 2em;
  cursor: pointer;
  color: #fff;
  outline: 0;

  &:hover,
  :active {
    color: #f2aeae;
  }
`;

const Poster = styled.img`
  width: 50%;
  height: 50%;
  border-radius: 1.2rem;
`;
