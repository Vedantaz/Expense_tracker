import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Select } from '../../atoms/selectField';
import { rows } from '../../../data/data';
import { PieChart } from '@mui/x-charts';

export const EmployeeAllocationChart = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [userProjectData, setUserProjectData] = useState([]);

  useEffect(() => {
    if (rows.length > 0) {
      const defaultUser = rows[0].name;
      // setSelectedUser(defaultUser);
      // setProjectData(defaultUser);
    }
  }, [rows]);

  const handleUserChange = (event) => {
    const userName = event.target.value;
    setSelectedUser(userName);
    setProjectData(userName);
  };

  const setProjectData = (userName) => {
    const user = rows.find((row) => row.name === userName);
    if (user) {
      const assignedProjects = user.projects.split(',').map((project) => project.trim());
      const projectPercentages = {};

      assignedProjects.forEach((project) => {
        if (!projectPercentages[project]) {
          projectPercentages[project] = 0;
        }
        const employeePercentage = 100 / assignedProjects.length;
        projectPercentages[project] += employeePercentage;
      });

      const formattedProjectPercentages = Object.keys(projectPercentages).map((project) => ({
        project,
        percentage: projectPercentages[project].toFixed(2),
      }));

      setUserProjectData(formattedProjectPercentages);
    }
  };

  const pieChartData = {
    data: userProjectData.map((item) => ({
      label: item.project,
      value: parseFloat(item.percentage),
    })),
  };

  return (
    <Box>
      <Select value={selectedUser} onChange={handleUserChange} label="Select Employee" options={rows.map((row) => row.name)} />
      
      
      {pieChartData.data.length > 0 ? (
        <PieChart
          series={[
            {
              data: pieChartData.data,
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: '40%',
            },
          ]}
          sx={{
            '& .MuiPieChart-arcLabel': {
              fontWeight: 'bold',
            },
          }}
          width={350}
          height={350}
        />
      ) : (
        <Box>No data available for the selected user.</Box>
      )}
    </Box>
  );
};
