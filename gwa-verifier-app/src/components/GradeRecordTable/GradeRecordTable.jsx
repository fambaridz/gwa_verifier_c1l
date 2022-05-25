import React, { useMemo } from "react";
import PropTypes from "prop-types";
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
import EditableCell from "../EditableCell";
import { useTable } from "react-table";

const defaultColumn = {
  Cell: EditableCell,
};

function GradeRecordTable({
  data,
  handleDelete = () => {},
  handleUpdate,
  enabledExtraFeature = true,
}) {
  const columns = useMemo(() => {
    const headers = [
      {
        Header: "Course No.",
        accessor: "courseno", // accessor is the "key" in the data
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
        Header: "Enrolled",
        accessor: "enrolled",
      },
      {
        Header: "Running Total",
        accessor: "running_total",
      },
    ];
    if (enabledExtraFeature)
      headers.push({
        Header: "Action",
        accessor: "action",
        Cell: (props) => {
          const {
            row: {
              original: { uid },
            },
          } = props;
          return (
            <IconButton aria-label="delete" onClick={() => handleDelete(uid)}>
              <DeleteIcon />
            </IconButton>
          );
        },
      });
    return headers;
  }, [data]);

  const tableInstance = useTable({
    columns,
    data,
    defaultColumn,
    handleUpdate,
  });

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
                    {cell.render("Cell", {
                      uid: row.original.uid,
                    })}
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

GradeRecordTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
  enabledExtraFeature: PropTypes.bool,
};

export default GradeRecordTable;
