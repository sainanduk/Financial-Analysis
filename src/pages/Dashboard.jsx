import React, { useEffect, useState } from 'react';
import DashboardStatsGrid from '../components/DashboardStatsGrid';
import BuyerProfilePieChart from '../components/BuyerProfilePieChart';
import BarCharts from '../components/doubleBarChart';
import ThreeTable from '../components/threeTable';
import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config()

export default function Dashboard() {
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/dashboard', {
                    headers: {
                        Authorization:`Bearer ${token}`,
                        "ngrok-skip-browser-warning": "69420",
                    }
                });

                if (response.status === 200) {
                    if (response.headers['content-type'].includes('application/json')) {
                        setApiData(response.data);
                        console.log(response.data);
                    } else {
                        console.error('Response is not JSON:', response);
                        setError('Received non-JSON response from the server.');
                    }
                } else {
                    console.error('Failed to fetch data. Status:', response.status);
                    setError(`Failed to fetch data. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please check your network connection.');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!apiData) {
        return <div>Loading...</div>;
    }

    console.log(apiData.Departments);
    console.log("dashboard done");

    return (
        <div className="flex flex-col gap-4">
            <DashboardStatsGrid data={apiData.ProfitMetrics} data2={apiData.TotalData} />
            <div className="flex flex-row gap-4 w-full">
                <BarCharts data={apiData.Departments} />
            </div>
            <div className="flex flex-row gap-4 w-full">
                <ThreeTable data={apiData.Departments} />
                <BuyerProfilePieChart data={apiData.ProfitMetrics} />
            </div>
        </div>
    );
}
