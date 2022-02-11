import React from "react";
import styled from "styled-components";
import ReactRouterPropTypes from "react-router-prop-types";
import logo from "../../assets/xy-logo.png";
import poster from "../../assets/xy-bg.png";

export default function Home({ history }) {
  const handleClick = () => {
    history.push("/lobby");
  };

  return (
    <Wrapper>
      <GameIntro>
        <div>
          <h1>
            <Logo src={logo} alt="logo" />
          </h1>
          <Content>
            <p className="game-intro">Win as much as you can</p>
            <Poster src={poster} alt="game-poster" />
          </Content>
        </div>
        <Button type="button" onClick={handleClick}>
          Start
        </Button>
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

const Content = styled.div`
  width: 80%;
  margin: 0 auto;
  img {
    width: 100%;
  }
`;

const Logo = styled.img`
  width: 3em;
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

Home.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};
