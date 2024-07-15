import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import data from "../responsedepartments.json";
import './chart.css';

// Convert the Transactions data to the desired format
const sortedData = data.Transactions.sort((a, b) => new Date(a.DateandTime) - new Date(b.DateandTime));

const DepartmentTransactions = () => {
  const [startDate, setStartDate] = useState(new Date(sortedData[0].DateandTime));
  const [endDate, setEndDate] = useState(new Date(sortedData[sortedData.length - 1].DateandTime));

  const filteredData = sortedData.filter(item => {
    const itemDate = new Date(item.DateandTime);
    return itemDate >= startDate && itemDate <= endDate;
  });

  const chartData = filteredData.map(item => ({
    date: item.DateandTime,
    amount: item.Amount,
    category: item.Category
  }));

  return (
    <div style={{ width: '100%', padding: '20px', backgroundColor: '#282c34', borderRadius: '10px' }}>
      <h4 style={{ color: '#61dafb', textAlign: 'center' }}>Transactions Line Chart</h4>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ marginRight: '10px' }}>
          <label style={{ color: '#61dafb' }}>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label style={{ color: '#61dafb' }}>End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      
      <div style={{ overflowX: 'auto' }}> {/* Add horizontal scroll */}
        <div style={{ width: '2000px' }}> {/* Set a fixed width for horizontal scroll */}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
              <YAxis />
              <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DepartmentTransactions;