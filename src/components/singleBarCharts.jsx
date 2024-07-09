// singleBarCharts.jsx
import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

export default function SingleBar({ transactions, type }) {
    // Example transactions data structure (if transactions prop is not provided)
    const exampleData = [
        { name: 'Transaction 1', Profit: 200, Loss: -50 },
        { name: 'Transaction 2', Profit: 300, Loss: -100 },
        { name: 'Transaction 3', Profit: 150, Loss: -20 },
        { name: 'Transaction 2', Profit: 300, Loss: -100 },
        { name: 'Transaction 3', Profit: 150, Loss: -20 },
        { name: 'Transaction 2', Profit: 300, Loss: -100 },
        { name: 'Transaction 3', Profit: 150, Loss: -20 },
        { name: 'Transaction 2', Profit: 300, Loss: -100 },
        { name: 'Transaction 3', Profit: 150, Loss: -20 },
        // Add more transactions as needed
    ];

    // Use transactions prop if provided, otherwise use exampleData
    const dataToUse = transactions || exampleData;

    return (
        <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">{type}</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={300}
                        height={300}
                        data={dataToUse}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Profit" stackId="a" fill="#0ea5e9" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
