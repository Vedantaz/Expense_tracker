
    import React from 'react';
    import { useSelector } from 'react-redux';
    import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
    import { Box, Typography } from '@mui/material';

    const CategoryChart = () => {
    const { expenses } = useSelector((state) => state.expenses);

    const totalBudget = 5000;

    // Aggregate amounts by category
    const categoryAmounts = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
        acc[expense.category] = 0;
        }
        acc[expense.category] += expense.amount;
        return acc;
    }, {});

    // Calculate total amount spent
  const totalSpent = Object.values(categoryAmounts).reduce((sum, amount) => sum + amount, 0);

   // Calculate the remaining amount (budget - total spent)
   const remainingAmount = totalBudget - totalSpent;

    // Transform aggregated data into chart-compatible format
    const chartData = Object.keys(categoryAmounts).map((category) => ({
        label: `${category} (${((categoryAmounts[category] / totalBudget) * 100).toFixed(1)}%)`,
        value: categoryAmounts[category],
    }));

    // Add the "None" category for the remaining budget (if any)
  if (remainingAmount > 0) {
    chartData.push({
      label: `None (${((remainingAmount / totalBudget) * 100).toFixed(1)}%)`,
      value: remainingAmount,
    });
  }
 
    return (
            <Box sx={{ textAlign: 'center', padding: '20px', width:'100%' }}>
            <Typography variant="h5" gutterBottom>
                Expense Breakdown by Category
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Total Budget: ₹{totalBudget}
            </Typography>
        
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width:'100%', alignContent:'space-between' }}>
                {chartData.length > 0 ? (
                <PieChart
                    series={[
                    {
                        data: chartData,
                        // arcLabel: (item) => `${item.label}%`,
                        arcLabelMinAngle: 35,
                        arcLabelRadius: '60%',
                    },
                    ]}
                    sx={{
                    '& .MuiPieChart-arcLabel': {
                        fontWeight: 'bold',
                        textAlign: 'center', 
                    },
                    
                    }}
                    width={400}
                    height={400}
                />
                ) : (
                <Box>No data available.</Box>
                )}
            </Box>
            </Box>
      );

};

    export default CategoryChart;
