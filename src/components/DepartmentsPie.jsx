import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DepartmentsPie = ({ totalExpenditure, totalRevenue, totalProfit }) => {
  const expenditureRevenueData = [
    { name: 'Total Expenditure', value: totalExpenditure },
    { name: 'Total Revenue', value: totalRevenue }
  ];

  const profitData = [
    { name: 'Total Profit', value: totalProfit },
    { name: 'Total Expenditure', value: totalExpenditure }, // Dummy data to balance the chart
    { name: 'Total Revenue', value: totalRevenue }
  ];

  const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', borderRadius: '10px', maxWidth: '85vw', marginTop: '20px' }}>
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
