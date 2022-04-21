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
  padding: 5px;
  border-radius: 5px;
  background-color: #e0dede;
  table {
    font-size: 1.1rem;
    border: none;
    font-weight: 500;
    border-radius: 5px;
  }
  th {
    background-color: #252940;
    color: #fff;
  }
  tr,
  td {
    border: 1px solid #666;
  }
`;

Result.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
