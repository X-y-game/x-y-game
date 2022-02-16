import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Result from "./index";

export default function ResultContainer({ tableData }) {
  const columnData = [
    {
      accessor: "team",
      Header: "team",
    },
    {
      accessor: "score",
      Header: "score",
    },
    {
      accessor: "result",
      Header: "result",
    },
  ];

  const columns = useMemo(() => columnData, []);

  return <Result columns={columns} data={tableData} />;
}

ResultContainer.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.Object).isRequired,
};
