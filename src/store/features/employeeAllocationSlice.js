import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: '',
  userProjectData: [],
};

const employeeAllocationSlice = createSlice({
  name: 'employeeAllocation',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setUserProjectData: (state, action) => {
      state.userProjectData = action.payload;
    },
  },
});

export const { setSelectedUser, setUserProjectData } = employeeAllocationSlice.actions;

export default employeeAllocationSlice.reducer;
