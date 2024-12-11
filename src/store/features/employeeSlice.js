import { createSlice } from '@reduxjs/toolkit';
import {rows, projectRows, hoursData} from '../../data/data';

const initialState = {
  rows: rows, 
  projectRows: projectRows,
  hoursData: hoursData,
  // expandedRows: {}, 
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployeeData(state, action) {
      state.rows = action.payload.rows;
      state.projectRows = action.payload.projectRows;
      state.hoursData = action.payload.hoursData;
    },
    // toggleRow(state, action) {
    //   const rowId = action.payload;
    //   state.expandedRows[rowId] = !state.expandedRows[rowId];
    // },
  },
});

export const { setEmployeeData, toggleRow } = employeeSlice.actions;
export default employeeSlice.reducer;
