import React from 'react';

import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

export default function CircleChart(props) {
    console.log(props)
    return (
        <ResponsiveContainer width="100%" height="80%">
            <PieChart>
            <Legend wrapperStyle={{ paddingBottom: "10px" }} />
            <Pie
                dataKey="value"
                data={props.data}
                cx="50%"
                cy="40%"
                innerRadius={40}
                outerRadius={80}
            ></Pie>
            <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
} 