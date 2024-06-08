import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Jan',
		Profit: 4000,
		Loss: 2400
	},
	{
		name: 'Feb',
		Profit: 3000,
		Loss: 1398
	},
	{
		name: 'Mar',
		Profit: 2000,
		Loss: 9800
	},
	{
		name: 'Apr',
		Profit: 2780,
		Loss: 3908
	},
	{
		name: 'May',
		Profit: 1890,
		Loss: 4800
	},
	{
		name: 'Jun',
		Profit: 2390,
		Loss: 3800
	},
	{
		name: 'July',
		Profit: 3490,
		Loss: 4300
	},
	{
		name: 'Aug',
		Profit: 2000,
		Loss: 9800
	},
	{
		name: 'Sep',
		Profit: 2780,
		Loss: 3908
	},
	{
		name: 'Oct',
		Profit: 1890,
		Loss: 4800
	},
	{
		name: 'Nov',
		Profit: 2390,
		Loss: 3800
	},
	{
		name: 'Dec',
		Profit: 3490,
		Loss: 4300
	}
]

export default function TransactionChart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Transactions</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Profit" fill="#0ea5e9" />
						<Bar dataKey="Loss" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
