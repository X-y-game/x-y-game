import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Result from "./index";
import Score from "./Score";

export default function ResultContainer({ tableData }) {
  const columnData = [
    {
      accessor: "team",
      Header: "team",
    },
    {
      Header: "score",
      accessor: "score",
      Cell: Score,
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
