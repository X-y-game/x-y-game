import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Table from "../Table";

export default function Result({ columns, data }) {
  return (
    <Container>
      <Table columns={columns} data={data} />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

Result.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
