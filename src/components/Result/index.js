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

  table {
    font-size: 1.2rem;
    border: none;
    font-weight: 500;
    border-radius: 5px;
  }
  tbody {
    border: none;
  }
  tr,
  td {
    border: none;
  }
`;

Result.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.Object).isRequired,
};
