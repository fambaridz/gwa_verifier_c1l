import React, { useState, useMemo } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useTable } from "react-table";

function GradeRecordTable() {
  const data = useMemo(
    () => [
      {
        courseNo: "ENG 10",
        grade: 2,
        units: 3,
        weight: 6,
        cumulative: 6,
      },
      {
        courseNo: "ENG 10",
        grade: 2,
        units: 3,
        weight: 6,
        cumulative: 6,
      },
      {
        courseNo: "ENG 10",
        grade: 2,
        units: 3,
        weight: 6,
        cumulative: 6,
      },
      {
        courseNo: "ENG 10",
        grade: 2,
        units: 3,
        weight: 6,
        cumulative: 6,
      },
      {
        courseNo: "ENG 10",
        grade: 2,
        units: 3,
        weight: 6,
        cumulative: 6,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Course No.",
        accessor: "courseNo", // accessor is the "key" in the data
      },
      {
        Header: "Grade",
        accessor: "grade",
      },
      {
        Header: "Units",
        accessor: "units",
      },
      {
        Header: "Weight",
        accessor: "weight",
      },
      {
        Header: "Cumulative",
        accessor: "cumulative",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (props) => (
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <TableContainer sx={{ width: "100%" }}>
      <Table aria-label="simple table" {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GradeRecordTable;
