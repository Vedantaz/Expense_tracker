import React, { useEffect, useDispatch } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

import Expenses from './components/organisms/Expenses';
import EmployeeTable from './components/organisms/EmployeeTable';
import { EmployeeAllocationChart } from './components/organisms/employeeAllocation';
import Navbar from './components/organisms/navbar';
import CategoryChart from './components/organisms/categoryChart';
import './App.css'
function App() {

  return (

    <Router>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          bgcolor: '#f0f4f8',
          minHeight: '100vh',
        }}
      >
        <Routes>
          <Route path="/" element={<Expenses />} />
          <Route path="/employee-table" element={<EmployeeTable />} />
          <Route path="/employee-allocation-chart" element={<EmployeeAllocationChart />} />
          <Route path="/categories" element={<CategoryChart/>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
