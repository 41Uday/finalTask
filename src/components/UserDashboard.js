import React, { useState, useEffect } from "react";
import axios from "axios";

import { url } from "../config";
import Cookies from "js-cookie";
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

const UserDashboard = () => {
  const [countTicketsData, setCountTicketsData] = useState({});
  const [secondData, setSecondData] = useState([]);
  const data = [];
  data.push(countTicketsData);
  const userId = Cookies.get("id");
  useEffect(() => {
    axios
      .get(url.API + "api/" + userId + "/countByStatus")
      .then((res) => {
        console.log(res);
        setCountTicketsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(url.API + "api/user/" + userId + "/count/last5days")
      .then((res) => {
        console.log(res);
        setSecondData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-row  justify-around align-center mb-10">
        <div className="shadow-slate-800 md:h-40 md:w-80 border-blue-500 border-2 p-6 flex flex-col justify-center align-center rounded-xl">
          <h1 className="md:text-2xl">Open Tickets</h1>
          <p className="mt-4 text-blue-700 text-4xl">{data[0].open_count}</p>
        </div>
        <div className="ml-6 md:h-40 md:w-80 border-blue-500 border-2 p-6 rounded-xl flex flex-col justify-center align-center">
          <h1 className="md:text-2xl">Inprogress Tickets</h1>
          <p className="mt-4 text-blue-700 text-4xl">
            {data[0].inprogress_count}
          </p>
        </div>
        <div className="ml-6 md:h-40 md:w-80 border-blue-500 border-2 p-6 rounded-xl flex flex-col justify-center align-center">
          <h1 className="md:text-2xl">Closed Tickets</h1>
          <p className="mt-4 text-blue-700 text-4xl">{data[0].closed_count}</p>
        </div>
      </div>
      <div className="flex  justify-center align-center ">
        {/* <ResponsiveContainer width="100%" height={300}> */}
        <BarChart
          width={400}
          height={400}
          data={secondData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            label={{
              value: "date",
              angle: 0,
              position: "insideBottomRight",
              fill: "blue",
              marginTop: 100,
              offset: -8,
            }}
            style={{ marginTop: 100 }}
          />
          <YAxis
            dataKey="count"
            label={{
              value: "count",
              angle: -90,
              position: "insideLeft",
              fill: "blue",
              marginTop: 100,
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" barSize={40} barGap={2} />
        </BarChart>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default UserDashboard;
