import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledScore = styled.span`
  color: #7988d9;
  font-size: 1.5rem;
  padding: 0 3rem;
  text-align: center;
`;

export default function Score({ value }) {
  return <StyledScore>{value}</StyledScore>;
}

Score.propTypes = {
  value: PropTypes.string.isRequired,
};
