import Cookies from "js-cookie";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import UserTickets from "./UserTickets";
import Chat from "./Chat";
import { HiUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const UserTemplate = () => {
  const navigate = useNavigate();
  const userName = Cookies.get("name");
  const [tab, setTab] = useState(1);
  const getTabsOfAdmin = () => {
    switch (tab) {
      case 0:
        // console.log(0);
        return <UserDashboard />;
      case 1:
        // console.log(1);
        return <UserTickets />;
      case 2:
        // console.log(2);
        return <Chat />;
      default:
        return null;
    }
  };

  const logoutButton = () => {
    Cookies.remove("role");
    Cookies.remove("id");
    Cookies.remove("email");
    Cookies.remove("actions");
    Cookies.remove("name");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header>
        <nav
          aria-label="menu nav"
          className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0 sm:h-16 md:h-20 "
        >
          <div className="flex justify-between items-center pt-2 md:pt-4 sm:mb-6">
            <div className="flex items-center ml-8">
              <HiUserCircle className="text-white text-2xl mr-2 md:mr-4" />
              <h1 className="text-lg text-white mr-4 font-bold md:mr-12">
                {userName}
              </h1>
            </div>
            <h1 className="text-white md:text-3xl md:visible invisible">
              Welcome {userName}
            </h1>
            <button
              className="border rounded-lg w-20 h-8 text-white text-md md:mr-8 xs:mr-6 xs:mb-4"
              type="button"
              onClick={logoutButton}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main>
        <div className="flex flex-col md:flex-row">
          <nav aria-label="alternative nav">
            <div className="bg-gray-800 shadow-xl xs:h-14 md:h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">
              <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left md:my-8">
                  <li className="mr-3 flex-1">
                    <p className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white hover:cursor-pointer">
                      <i className="fas fa-tasks pr-0 md:pr-3"></i>
                      <span
                        className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block"
                        onClick={() => setTab(0)}
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
                        onClick={() => setTab(1)}
                      >
                        Tickets
                      </span>
                    </p>
                  </li>
                  <li className="mr-3 flex-1">
                    <p className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white hover:cursor-pointer">
                      <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i>
                      <span
                        className="pb-1 md:pb-0 text-xs md:text-base  md:text-white block md:inline-block"
                        onClick={() => setTab(2)}
                      >
                        Chat
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <section className="md:w-full md:mx-12 ">{getTabsOfAdmin()}</section>
        </div>
      </main>
    </>
  );
};

export default UserTemplate;
