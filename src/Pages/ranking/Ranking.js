import { useTable } from "react-table";
import { useMemo } from "react";


import './Ranking.css';

import scores from "../../Data/scores.json";
import trophy from "../../Data/images/price/trophy.svg";

export default function Main() {
  return (
    <>
      <div className="title">
        <img src={trophy} className="trophy"></img>
        <h1>Ranking</h1>
        <img src={trophy} className="trophy"></img>
      </div>
      <div className="game">
        <Ranking />
      </div>
    </>
  )
}

function sortScores() {
  let sortedScores = scores;
  sortedScores.sort(function (a, b) { return a.turns - b.turns });
  return sortedScores;
}

function Ranking() {
  const data = useMemo(() => sortScores(), []);
  const columns = useMemo(() => [
    {
      Header: "User",
      accessor: "user"
    },
    {
      Header: "Time",
      accessor: "time"
    },
    {
      Header: "Turns",
      accessor: "turns"
    }
  ], []);
  const { headerGroups, rows, prepareRow } = useTable({ columns, data });

  function HeaderGroup({ headerGroup }) {
    return (
      <tr className="tableHeader">
        {headerGroup.headers.map((column) => (
          <th>{column.render("Header")}</th>
        ))}
      </tr>
    )
  }
  
  function Row({ row }) {
    return (
      <tr>
        {row.cells.map((cell) => (
          <td>{cell.render("Cell")}</td>
        ))}
      </tr>
    )
  }

  return (
    <table className="ranking">
      <thead>
        {headerGroups.map((headerGroup) => (
          <HeaderGroup headerGroup={headerGroup} />
        ))}
      </thead>
      <tbody className="tableBody">
        {rows.map((row) => {
          prepareRow(row);
          return <Row row={row} />;
        })}
      </tbody>
    </table>
  )
}