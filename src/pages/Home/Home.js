import React from "react";
import styled from "styled-components";
import ReactRouterPropTypes from "react-router-prop-types";
import poster from "../../assets/logo.png";
import soundPlay from "../../utils/sound";

export default function Home({ history }) {
  const handleClick = () => {
    soundPlay("click");
    history.push("/channel");
  };

  return (
    <Wrapper>
      <GameIntro>
        <div>
          <Content>
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

Home.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

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

  @media screen and (max-height: 600px) {
    h1,
    p {
      font-size: 1rem;
      margin-bottom: 0;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 30%;
    @media screen and (max-width: 1000px) {
      width: 55%;
      transition: 0.1s;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
      transition: 0.1s;
    }
    @media screen and (max-height: 600px) {
      width: 30%;
      transition: 0.1s;
    }
  }
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

  &:active {
    color: #f2aeae;
  }
`;

const Poster = styled.img`
  width: 50%;
  height: 50%;
  border-radius: 1.2rem;
`;
