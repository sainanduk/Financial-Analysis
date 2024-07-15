import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 1, // Ensures it stays above the scrolling content
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ScrollableTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 400, // Adjust the maximum height as needed
  overflowY: 'auto',
}));

const ThreeTable = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  // Extract departments from data
  const departments = Object.values(data).map(department => ({
    name: department.Department,
    expenditure: department.TotalExpenditure,
    revenue: department.TotalRevenue
  }));

  return (
    <ScrollableTableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Department</StyledTableCell>
            <StyledTableCell align="right">Expenditure</StyledTableCell>
            <StyledTableCell align="right">Revenue</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.expenditure.toFixed(2)}</StyledTableCell>
              <StyledTableCell align="right">{row.revenue.toFixed(2)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollableTableContainer>
  );
}

export default ThreeTable;
