import React from 'react';
import DepartmentCharts from '../components/DepartmentCharts';
import DepartmentTransactions from '../components/DepartmentTransactions';
import DepartmentsPie from '../components/DepartmentsPie';
//import './departments.css';

export default function Departments() {
  return (
    <div className='view'>
      <DepartmentCharts />
      <DepartmentTransactions />
      <DepartmentsPie />
    </div>
  );
}
