import React, { useEffect, useState } from 'react';
import DashboardStatsGrid from '../components/DashboardStatsGrid';
import BuyerProfilePieChart from '../components/BuyerProfilePieChart';
import BarCharts from '../components/doubleBarChart';
import ThreeTable from '../components/threeTable';
import axios from 'axios';

export default function Dashboard() {
	const apiData = {Departments:[]}
    // const [apiData, setApiData] = useState(null);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://b070-47-247-94-66.ngrok-free.app/dashboard',
    // {
    //     headers:{
    //          "ngrok-skip-browser-warning": "69420", 
    //     }
    // });

    //             if (response.status === 200) {
    //                 if (response.headers['content-type'].includes('application/json')) {
    //                     setApiData(response.data);
    //                 } else {
    //                     console.error('Response is not JSON:', response);
    //                     setError('Received non-JSON response from the server.');
    //                 }
    //             } else {
    //                 console.error('Failed to fetch data. Status:', response.status);
    //                 setError(`Failed to fetch data. Status: ${response.status}`);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             setError('Error fetching data. Please check your network connection.');
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div className="flex flex-col gap-4">
            <DashboardStatsGrid />
            <div className="flex flex-row gap-4 w-full">
                {apiData && <BarCharts data={apiData.Departments} />}
            </div>
            <div className="flex flex-row gap-4 w-full">
                {apiData && <ThreeTable data={apiData.Departments} />}
                <BuyerProfilePieChart />
            </div>
        </div>
    );
}
