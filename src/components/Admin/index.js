import React, { useState } from "react";

import Dashboard from "../Dashboard";

import AdminUsersTab from "../AdminUsersTab";

import TicketsTab from "../TicketsTab";
import { useNavigate } from "react-router-dom";
import { BiBarChartSquare, BiLogOutCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import { ImUserPlus } from "react-icons/im";
import { TiTicket } from "react-icons/ti";

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  console.log(Cookies.get("role"), "role check");
  const getTabsOfAdmin = () => {
    switch (tab) {
      case 0:
        console.log(0);
        return <Dashboard />;
      case 1:
        console.log(1);
        return <AdminUsersTab />;
      case 2:
        console.log(2);
        return <TicketsTab />;
      default:
        return null;
    }
  };

  const adminLogout = () => {
    Cookies.remove("role");
    Cookies.remove("id");
    Cookies.remove("email");
    Cookies.remove("actions");
    Cookies.remove("name");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex  flex-row  h-screen w-screen">
      <div className="bg-blue-500 text-white  w-2/6 h-screen  md:w-1/6 pt-12 md:pt-24">
        <h1 className="text-white md:text-4xl text-2xl -mt-4 mb-6  md:-mt-10 md:mb-12 font-sans">
          Admin
        </h1>
        <ul className="font-sans text-xs text-base  sm:font-normal md:font-bold md:text-xl">
          <li
            className="mb-4 p-3 text-white cursor-pointer flex align-center"
            onClick={() => setTab(0)}
          >
            <BiBarChartSquare className="md:text-3xl mr-2" />
            Dashboard
          </li>
          <div className="border-b border-white-100 m-2 m-2 md:mx-4"></div>
          <li
            className="mb-4 p-3 text-white cursor-pointer flex align-center"
            onClick={() => setTab(1)}
          >
            <ImUserPlus className="md:text-2xl mr-2" />
            Users
          </li>
          <div className="border-b border-white-100 m-2 md:mx-4"></div>
          <li
            className="mb-4 p-3 text-white  cursor-pointer flex align-center"
            onClick={() => setTab(2)}
          >
            <TiTicket className="md:text-2xl mr-2 text-md" />
            Tickets
          </li>
          <div className="border-b border-white-100 m-2 md:mx-4"></div>
          <li
            className="mb-4 p-3 text-white  cursor-pointer flex align-center"
            onClick={adminLogout}
          >
            <BiLogOutCircle className="md:text-2xl mr-2 text-md" />
            Logout
          </li>
        </ul>
      </div>
      <div className="flex flex-col p-4 md:p-12  md:w-screen md:h-screen">
        {/* <h1 className="text-center text-blue-500 font-bold text-xl md:text-3xl "></h1> */}
        {getTabsOfAdmin()}
      </div>
    </div>
  );
};

export default Admin;
