import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { url } from "../config";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [countUserData, setCountUserData] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.1.85:8095/api/usersCount")
      .then((res) => {
        // console.log(res);
        setCountUserData(res.data);
        console.log(countUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(url.API + "api/tickets/count")
      .then((res) => {
        // setData(res.data);
        console.log(res.data);
        setData(res.data);
        // const slicedData = [];
        // for (let i = 0; i < data.length; i += 5) {
        //   slicedData.push(data.slice(i, i + 5));
        // }
        // setItems(slicedData);
        // console.log(setItems);
        // set dropdown options based on number of users
        // const numUsers = res.data.length;
        // const numDropdowns = Math.ceil(numUsers / 5);
        // const dropdownOptions = [];
        // for (let i = 0; i < numDropdowns; i++) {
        //   const start = i * 5 + 1;
        //   const end = Math.min(numUsers, (i + 1) * 5);
        //   dropdownOptions.push(`${start}-${end}`);
        // }
        // setDropdownOptions(dropdownOptions);
      })
      .catch((err) => {
        console.log(err);
        // setData(d);
      });
  }, []);

  const handleRangeChange = (event) => {
    const selectedRange = event.target.value.split("-");
    const start = parseInt(selectedRange[0], 10) - 1;
    let end = parseInt(selectedRange[1], 10);
    if (end === data.length) {
      end = end - 1;
    }
    setStartIndex(start);
    setEndIndex(end);
  };

  const totaldropDowns = Math.ceil(data.length / 5);
  // console.log("rammm", totaldropDowns);

  // Generate the dropdown options based on the selected range

  const optionsMethod = () => {
    const dropdownOptions = [];
    for (let i = 0; i < totaldropDowns; i++) {
      const start = i * 5 + 1;
      // const end = Math.min(start + 4, data.length);
      const end = start + 4;
      dropdownOptions.push(
        <option key={i + 1} value={`${start}-${end}`}>
          {`${start}-${end}`}
        </option>
      );
    }
    console.log(dropdownOptions);
    return dropdownOptions;
  };

  return (
    <div className="w-full h-full">
      <div className="sm:flex sm:flex-row sm:justify-center sm:items-center lg:flex lg:flex-row  lg:justify-around lg:align-center mb-10 ">
        <div className="ml-6 md:h-40 md:w-80 border-blue-500 border-2 p-6 rounded-xl flex flex-col justify-center align-center mb-4">
          <h1 className="md:text-2xl">Active Users</h1>
          <p className="mt-4 text-blue-700 text-4xl">
            {countUserData.Active_Count - 1}
          </p>
        </div>

        <div className="ml-6 md:h-40 md:w-80 border-blue-500 border-2 p-6 rounded-xl flex flex-col justify-center align-center">
          <h1 className="md:text-2xl">Inactive Users</h1>
          <p className="mt-4 text-blue-700 text-4xl">
            {countUserData.Inactive_Count}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center m-4">
        {/* <select onChange={handleRangeChange}>
          <option value="1-5">1-5</option>
          <option value="6-10">6-10</option>
          <option value="11-15">11-15</option>
        </select> */}
        <div className="flex justify-end ">
          <select onChange={handleRangeChange} className="outline-none">
            {optionsMethod()}
          </select>

          {/* <select
            value={selectedRange}
            onChange={(event) => handleRangeChange(event.target.value)}
            className="outline-none"
          >
            {Array(Math.ceil(data.length / 5))
              .fill()
              .map((_, index) => {
                const start = index * 5 + 1;
                const end = Math.min(start + 4, data.length);
                const rangeText = `${start}-${end}`;
                const optionText =
                  end === data.length ? rangeText : `${rangeText}, `;
                return (
                  <option key={index} value={`${start}-${end}`}>
                    {optionText}
                  </option>
                );
              })} */}
          {/* </select> */}
        </div>

        <ResponsiveContainer
          //  width={{ xs: "100%", md: "50%" }}
          width="100%"
          height={300}
          className="xs:block md:hidden"
        >
          <BarChart data={data.slice(startIndex, endIndex)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="user_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ticket_count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer
          width="50%"
          height={300}
          className="hidden md:block"
        >
          <BarChart data={data.slice(startIndex, endIndex)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="user_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ticket_count" fill="#8884d8" barSize={65} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
