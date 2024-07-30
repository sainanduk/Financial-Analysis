import React from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';

export default function DashboardStatsGrid({data, data2}) {

    return (
        <div className="flex gap-2">
            <BoxWrapper>
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-sky-500">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Expenditure</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{Math.ceil(data2.TotalExpenditure)}/-</strong>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-orange-600">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Revenue</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{Math.ceil(data2.TotalRevenue)}/-</strong>
                        
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-yellow-400">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Current Status</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{Math.ceil(data.CurrentStatus)}/-</strong>
                        
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-green-600">
                    <IoCart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Gross Profit</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{Math.ceil(data.GrossProfit)}/-</strong>
                        
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-green-600">
                    <IoCart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Net Profit</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{Math.ceil(data.NetProfit)}/-</strong>
                        
                    </div>
                </div>
            </BoxWrapper>
        </div>
    );
}

function BoxWrapper({ children }) {
    return (
        <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
            {children}
        </div>
    );
}
