import React, { useEffect, useState, useRef } from 'react';
import DepartmentCharts from '../components/DepartmentCharts';
import DepartmentTransactions from '../components/DepartmentTransactions';
import DepartmentsPie from '../components/DepartmentsPie';
import axios from 'axios';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import API_URL from './url';
import { useNavigate } from 'react-router-dom';

export default function Departments() {
  const [department, SetDepartment] = useState('Customer Service');
  const [data, SetData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('financialtoken');
  const transactionRef = useRef();
  const chartsRef = useRef();
  const pieRef = useRef();
  const navigate = useNavigate()

  useEffect(() => {

    if(!token){
      navigate('/signin')
      return
    }

    const fetchdata = async () => {
      try{
      const response = await axios.get(`${API_URL}/departments-summary/${department}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },

      });
      SetData(response.data);
    }catch(error){
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please check your network connection.');
    }
      
    }
    fetchdata();
  }, [department]);

  const handleDepartmentChange = (e) => {
    SetDepartment(e.target.value);
  }

  const downloadGraph = (ref, filename) => {
    toPng(ref.current)
      .then((dataUrl) => {
        download(dataUrl, filename);
      })
      .catch((err) => {
        console.error('Error generating image', err);
      });
  }

  return (
    <>
      <div style={{ width: '100wh', height: '10vh' }}>
        <label>
          Select Department
          <select name='select'
            defaultValue={department}
            style={{ margin: '20px' }}
            onChange={handleDepartmentChange}
          >
            <option value='Customer Service'>Customer Service</option>
            <option value='Design'>Design</option>
            <option value='HR'>HR</option>
            <option value='IT and Infrastructure'>IT and Infrastructure</option>
            <option value='Legal Department'>Legal Department</option>
            <option value='Operation Team'>Operation Team</option>
            <option value='Product Management'>Product Management</option>
            <option value='Quality Assurance'>Quality Assurance</option>
            <option value='Sales and Marketing'>Sales and Marketing</option>
          </select>
        </label>
      </div>
      <div className='view'>
        <div ref={transactionRef}>
          {data && <DepartmentTransactions transactions={data.Transactions} />}
        </div>
        <div ref={chartsRef}>
          {data && <DepartmentCharts categorySummary={data.DepartmentSummary.CategorySummary} />}
        </div>
        <div ref={pieRef}>
          {data && (
            <DepartmentsPie
              totalExpenditure={data.DepartmentSummary.TotalExpenditure}
              totalRevenue={data.DepartmentSummary.TotalRevenue}
              totalProfit={data.DepartmentSummary.TotalProfit}
            />
          )}
        </div>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'start' }}>
        <button onClick={() => downloadGraph(transactionRef, 'transactions-chart.png')} style={{marginRight:'30px'}}>Download Transactions Chart</button>
        <button onClick={() => downloadGraph(chartsRef, 'category-summary-chart.png')} style={{marginRight:'30px'}}>Download Category Summary Chart</button>
        <button onClick={() => downloadGraph(pieRef, 'expenditure-revenue-pie-chart.png')}>Download Expenditure and Revenue Pie Chart</button>
      </div>
    </>
  );
}
