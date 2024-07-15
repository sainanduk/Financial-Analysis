import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

export default function BarCharts({ data }) {
    if (!data) {
        return <div>Loading...</div>;
    }

    const prepareChartData = () => {
        let chartData = [];

        Object.values(data).forEach(department => {
            department.DepartmentSummary.forEach(summary => {
                chartData.push({
                    department: department.Department,
                    category: summary.Category,
                    expenditure: summary.Expenditure,
                    revenue: summary.Revenue
                });
            });
        });

        return chartData;
    };

    const chartData = prepareChartData();
    console.log(chartData);
    console.log("Charts");

    return (
        <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Expenditure and Revenue by Department</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="expenditure" name="Expenditure" fill="#ea580c" />
                        <Bar dataKey="revenue" name="Revenue" fill="#0ea5e9" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
