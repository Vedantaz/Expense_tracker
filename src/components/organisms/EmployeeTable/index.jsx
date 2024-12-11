import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { CollapsibleRow } from '../../molecules/collapsibleRow';
import './styles.css';

const useStyles = () => ({
  tableHeading: {
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '10px',
    textAlign: 'center',
    color: 'white',
  },
});

const EmployeeTable = () => {
  const styles = useStyles();
  const { rows, projectRows, hoursData } = useSelector((state) => state.employees);

  return (
    <Box className="tableBox1">
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="tablehead1">
            <TableRow>
              <TableCell />
              <TableCell sx={styles.tableHeading}>Name</TableCell>
              <TableCell sx={styles.tableHeading}>Update</TableCell>
              <TableCell sx={styles.tableHeading}>Role</TableCell>
              <TableCell sx={styles.tableHeading}>Projects</TableCell>
              <TableCell sx={styles.tableHeading}>Team</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) =>
              projectRows
                .filter((project) => row.userId === project.userId)
                .map((project, index) => (
                  <CollapsibleRow
                    key={`${row.userId}-${project.pName}`}
                    row={row}
                    projects={project}
                    hours={hoursData[index]}
                  />
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default EmployeeTable;