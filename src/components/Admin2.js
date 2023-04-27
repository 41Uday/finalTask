import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UserTab from "./UserTab";

const Admin2 = () => {
  const navigate = useNavigate();
  const logoutButton = () => {
    Cookies.remove("role");
    Cookies.remove("id");
    Cookies.remove("email");
    Cookies.remove("actions");
    Cookies.remove("name");
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <header>
        <nav
          aria-label="menu nav"
          className="bg-blue-500 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0 sm:h-16 md:h-20 "
        >
          <div className="flex justify-between items-center pt-2 md:pt-4 sm:mb-6">
            <div className="flex items-center ml-8">
              <h1 className="md:text-4xl text-xl text-white mr-4 font-bold md:mr-12 ">
                Admin
              </h1>
            </div>
            <h1 className="text-white md:text-3xl md:visible invisible">
              Welcome
            </h1>
            <button
              className="border rounded-lg w-20 h-8 text-white text-md md:mr-8 xs:mr-6 xs:mb-4 mb-2"
              type="button"
              onClick={logoutButton}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
      <div className="flex justify-center m-4">
        <UserTab />
      </div>
      <div className="flex flex-col md:flex-row">
        <nav aria-label="alternative nav">
          <div className="bg-blue-500 shadow-xl xs:h-14 md:h-20 fixed bottom-0 mt-12  md:h-screen z-10 w-full md:w-48 content-center">
            <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
              <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left md:my-8">
                <li className="mr-3 flex-1">
                  <p className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white hover:cursor-pointer">
                    <i className="fas fa-tasks pr-0 md:pr-3"></i>
                    <span
                      className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block"
                      //   onClick={() => setTab(0)}
                    >
                      Dashboard
                    </span>
                  </p>
                </li>
                <li className="mr-3 flex-1">
                  <p className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white hover:cursor-pointer">
                    <i className="fa fa-envelope pr-0 md:pr-3"></i>
                    <span
                      className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block"
                      //   onClick={() => setTab(1)}
                    >
                      Users
                    </span>
                  </p>
                </li>
                <li className="mr-3 flex-1">
                  <p className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white hover:cursor-pointer">
                    <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i>
                    <span
                      className="pb-1 md:pb-0 text-xs md:text-base  md:text-white block md:inline-block"
                      //   onClick={() => setTab(2)}
                    >
                      Tickets
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Admin2;
