import React from 'react';
import data from "../responsedepartments.json";
import "./chart.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Convert the CategorySummary data to the desired format
const chartData = data.DepartmentSummary.CategorySummary.map(item => ({
  name: item.Category,
  Expenditure: item.Expenditure,
  Profit: item.Profit,
  Revenue: item.Revenue
}));

const COLORS = {
  Expenditure: '#8884d8', // Light Purple
  Profit: '#82ca9d', // Light Green
  Revenue: '#ffc658' // Light Yellow
};

const DepartmentCharts = () => {
  console.log(data.DepartmentSummary.CategorySummary);
  return (
    <div className='chart' style={{ width: '100%', maxWidth: '65%', height: 400}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Expenditure" fill={COLORS.Expenditure} />
          <Bar dataKey="Profit" fill={COLORS.Profit} />
          <Bar dataKey="Revenue" fill={COLORS.Revenue} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DepartmentCharts;
