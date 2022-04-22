/* eslint-disable react/forbid-prop-types */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Result from "./index";
import Score from "./Score";

export default function ResultContainer({ tableData }) {
  const columnData = [
    {
      accessor: "team",
      Header: "TEAM",
    },
    {
      Header: "SCORE",
      accessor: "score",
      Cell: Score,
    },
    {
      accessor: "result",
      Header: "RESULT",
    },
  ];

  const columns = useMemo(() => columnData, []);

  return <Result columns={columns} data={tableData} />;
}

ResultContainer.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
