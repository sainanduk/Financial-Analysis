// import React, { useEffect, useState } from 'react';
// import './style.css'

// const = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [tableRows, setTableRows] = useState([]);
//   const [sortedColumn, setSortedColumn] = useState(null);
//   const [sortAsc, setSortAsc] = useState(true);

//   useEffect(() => {
//     setTableRows(document.querySelectorAll('tbody tr'));
//   }, []);

//   const searchTable = (e) => {
//     const searchText = e.target.value.toLowerCase();
//     tableRows.forEach((row) => {
//       const textContent = row.textContent.toLowerCase();
//       const rowVisible = textContent.includes(searchText);
//       row.style.display = rowVisible ? 'table-row' : 'none';
//     });
//   };

//   const sortTable = (index) => {
//     const rows = Array.from(tableRows);
//     rows.sort((a, b) => {
//       const cellA = a.querySelectorAll('td')[index].textContent.trim();
//       const cellB = b.querySelectorAll('td')[index].textContent.trim();

//       if (sortAsc) {
//         return cellA.localeCompare(cellB);
//       } else {
//         return cellB.localeCompare(cellA);
//       }
//     });

//     setTableRows(rows);
//     setSortedColumn(index);
//     setSortAsc(!sortAsc);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="table w-full bg-white bg-opacity-80 shadow-lg rounded-lg overflow-hidden">
//         <div className="table__header flex justify-between items-center bg-white bg-opacity-80 p-2">
//           <h1 className="text-lg font-semibold">Customer's Orders</h1>
//           <div className="input-group w-1/3 relative">
//             <input
//               type="search"
//               placeholder="Search Data..."
//               className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
//               onChange={searchTable}
//             />
//           </div>
//         </div>
//         <div className="table__body w-full bg-white bg-opacity-90 p-2 overflow-auto">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(0)}>
//                   Id
//                 </th>
//                 <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(1)}>
//                   Customer
//                 </th>
//                 <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(2)}>
//                   Location
//                 </th>
//                 <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(3)}>
//                   Order Date
//                 </th>
//                 <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(4)}>
//                   Status
//                 </th>
//                 <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(5)}>
//                   Amount
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>1</td>
//                 <td>Zinzu Chan Lee</td>
//                 <td>Seoul</td>
//                 <td>17 Dec, 2022</td>
//                 <td>Delivered</td>
//                 <td>$128.90</td>
//               </tr>
//               <tr>
//                 <td>2</td>
//                 <td>Jeet Saru</td>
//                 <td>Kathmandu</td>
//                 <td>27 Aug, 2023</td>
//                 <td>Cancelled</td>
//                 <td>$5350.50</td>
//               </tr>
//               <tr>
//                 <td>3</td>
//                 <td>Sonal Gharti</td>
//                 <td>Tokyo</td>
//                 <td>14 Mar, 2023</td>
//                 <td>Shipped</td>
//                 <td>$210.40</td>
//               </tr>
//               <tr>
//                 <td>4</td>
//                 <td>Alson GC</td>
//                 <td>New Delhi</td>
//                 <td>25 May, 2023</td>
//                 <td>Delivered</td>
//                 <td>$149.70</td>
//               </tr>
//               <tr>
//                 <td>5</td>
//                 <td>Sarita Limbu</td>
//                 <td>Paris</td>
//                 <td>23 Apr, 2023</td>
//                 <td>Pending</td>
//                 <td>$399.99</td>
//               </tr>
//               <tr>
//                 <td>6</td>
//                 <td>Alex Gonley</td>
//                 <td>London</td>
//                 <td>23 Apr, 2023</td>
//                 <td>Cancelled</td>
//                 <td>$399.99</td>
//               </tr>
//               <tr>
//                 <td>7</td>
//                 <td>Jeet Saru</td>
//                 <td>New York</td>
//                 <td>20 May, 2023</td>
//                 <td>Delivered</td>
//                 <td>$399.99</td>
//               </tr>
//               <tr>
//                 <td>8</td>
//                 <td>Aayat Ali Khan</td>
//                 <td>Islamabad</td>
//                 <td>30 Feb, 2023</td>
//                 <td>Pending</td>
//                 <td>$149.70</td>
//               </tr>
//               <tr>
//                 <td>9</td>
//                 <td>Alson GC</td>
//                 <td>Dhaka</td>
//                 <td>22 Dec, 2023</td>
//                 <td>Cancelled</td>
//                 <td>$249.99</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Table;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/transactions'); 
      setTableData(response.data); // Assuming response.data is an array of transaction objects
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const searchTable = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const sortTable = (index) => {
    const rows = [...tableData];
    rows.sort((a, b) => {
      const cellA = a[index].toString().toLowerCase();
      const cellB = b[index].toString().toLowerCase();

      if (sortAsc) {
        return cellA.localeCompare(cellB);
      } else {
        return cellB.localeCompare(cellA);
      }
    });

    setTableData(rows);
    setSortedColumn(index);
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
                <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(0)}>
                  Transaction ID
                </th>
                <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(1)}>
                  Department
                </th>
                <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(2)}>
                  Category
                </th>
                <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(3)}>
                  DateAndTime
                </th>
                <th className="sticky top-0 bg-gray-100 py-2 px-4 cursor-pointer" onClick={() => sortTable(4)}>
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
                    <td>{row.dateAndTime}</td>
                    <td>${row.amount.toFixed(2)}</td>
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
