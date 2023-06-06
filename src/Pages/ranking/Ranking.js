import { useTable } from "react-table";
import { useMemo } from "react";

import './Ranking.css';

import scores from "../../Data/scores.json";

export default function Main() {
  function handleClick(msg) {
    console.log(msg);
  }

  return (
    <>
      <h1>Ranking</h1>
      <div className="game">
        <Ranking />
      </div>
    </>
  )
}



function HeaderGroup({ headerGroup }) {
  return (
    <tr className="tableHeader">
      {headerGroup.headers.map((column) => (
        <Header header={column} />
      ))}
    </tr>
  )
}

function Header({ header }) {
  return (
    <th>
      {header.render("Header")}
    </th>
  )
}

function Row({ row }) {
  return (
    <tr>
      {row.cells.map((cell) => (
        <Cell cell={cell} />
      ))}
    </tr>
  )
}

function Cell({ cell }) {
  return (
    <td>{cell.render("Cell")}</td>
  )
}


function sortScores() {
  let sortedScores = scores;
  sortedScores.sort(function (a, b) { return a.turns - b.turns })
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