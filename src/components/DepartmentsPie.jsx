import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DepartmentsPie = () => {
  const expenditureRevenueData = [
    { name: 'Total Expenditure', value: 1864757.2 },
    { name: 'Total Revenue', value: 0.0 }
  ];

  const profitData = [
    { name: 'Total Profit', value: 1864757.2 }, // Adjusted to positive value for visualization
    { name: 'Total Expenditure', value: 1864757.2 }, // Dummy data to balance the chart
    { name: 'Total Revenue', value: 0.0 }
  ];

  const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px',  borderRadius: '10px', maxWidth:'85vw', marginTop:'20px' }}>
      <div style={{ width: '45%' }}>
        <h4 style={{ color: '#61dafb', textAlign: 'center' }}>Total Expenditure and Revenue</h4>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={expenditureRevenueData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {expenditureRevenueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '45%' }}>
        <h4 style={{ color: '#61dafb', textAlign: 'center' }}>Total Profit</h4>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={profitData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {profitData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DepartmentsPie;