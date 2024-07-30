import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../pages/url';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const token = localStorage.getItem('financialtoken');
  const navigate = useNavigate()

  useEffect(() => {


    if(!token){
      navigate('/signin')
      return
    }

    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }); 
      setTableData(response.data.transactions); // Assuming response.data.transactions is an array of transaction objects
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const searchTable = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const sortTable = (column) => {
    const rows = [...tableData];
    rows.sort((a, b) => {
      let cellA = a[column];
      let cellB = b[column];

      if (column === 'amount') {
        cellA = parseFloat(cellA);
        cellB = parseFloat(cellB);
      } else {
        cellA = cellA.toString().toLowerCase();
        cellB = cellB.toString().toLowerCase();
      }

      if (sortAsc) {
        return cellA > cellB ? 1 : -1;
      } else {
        return cellA < cellB ? 1 : -1;
      }
    });

    setTableData(rows);
    setSortedColumn(column);
    setSortAsc(!sortAsc);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="table w-full bg-white bg-opacity-80 shadow-lg rounded-lg overflow-hidden">
        <div className="table__header flex justify-between items-center bg-white bg-opacity-80 p-2">
          <h1 className="text-lg font-semibold">Transactions</h1>
          <div className="input-group w-1/3 relative">
            <input
              type="search"
              placeholder="Search Data..."
              className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              onChange={searchTable}
            />
          </div>
        </div>
        <div className="table__body w-full bg-white bg-opacity-90 p-2 overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable('transactionId')}>
                  Transaction ID
                </th>
                <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable('department')}>
                  Department
                </th>
                <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable('category')}>
                  Category
                </th>
                <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable('dateandtime')}>
                  Date and Time
                </th>
                <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable('amount')}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData
                .filter((row) =>
                  Object.values(row)
                    .join(' ')
                    .toLowerCase()
                    .includes(searchTerm)
                )
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.transactionId}</td>
                    <td>{row.department}</td>
                    <td>{row.category}</td>
                    <td>{row.dateandtime}</td>
                    <td className={row.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                    ₹{row.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;