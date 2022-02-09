import React, { useMemo } from "react";
import Result from "./index";

export default function ResultContainer() {
  const columnData = [
    {
      accessor: "No",
      Header: "No.",
    },
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
  const fakeData = [
    {
      No: 1,
      team: "1팀",
      score: "100점",
      result: "1승 1패",
    },
    {
      No: 2,
      team: "2팀",
      score: "100점",
      result: "1승 2패",
    },
    {
      No: 3,
      team: "3팀",
      score: "100점",
      result: "1승 3패",
    },
    {
      No: 4,
      team: "4팀",
      score: "100점",
      result: "2승 1패",
    },
  ];

  const data = useMemo(() => fakeData, []);
  return <Result columns={columns} data={data} />;
}
