import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SampleDashboard = () => {
  const data = [
    { count: 12, date: "2023-04-24" },
    { date: "2023-04-25", count: 2 },
    { count: 10, date: "2023-04-23" },
    { count: 8, date: "2023-04-24" },
    { count: 2, date: "2023-04-25" },
  ];

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default SampleDashboard;
