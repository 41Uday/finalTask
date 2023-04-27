import React, { useState, useEffect } from "react";
import { url } from "../config";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
// import TicketPopup from "./TicketPopup";
import Cookies from "js-cookie";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = [];

  const visiblePages = 3; // Number of visible page pills
  const maxLeft = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  const maxRight = Math.min(maxLeft + visiblePages - 1, totalPages);

  for (let i = maxLeft; i <= maxRight; i++) {
    pageNumbers.push(i);
  }

  function handlePageChange(pageNumber) {
    onPageChange(pageNumber);
  }

  const abc = () => {
    onPageChange(1);
    console.log("first");
  };

  const lastArrow = () => {
    onPageChange(totalPages);
  };

  return (
    <nav className="flex  justify-center mt-10">
      <ul className="pagination flex items-center  rounded-lg hover:cursor-pointer">
        <li>
          <AiOutlineLeft
            className="hover:text-blue-500 hover:cursor-pointer text-xl"
            onClick={abc}
          />
        </li>
        {currentPage !== 1 ? (
          <li
            className="g-white  hover:underline text-blue-500 font-semibold py-2 px-4 xs:px-2 md:px-1 xs:font-xs border-none"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </li>
        ) : (
          <li
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-none  xs:px-1 opacity-50 cursor-not-allowed"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </li>
        )}
        {pageNumbers[0] !== 1 && (
          <li
            className="page-item xs:m-1 m-2 font-semibold"
            onClick={() => handlePageChange(1)}
          >
            1
          </li>
        )}
        {pageNumbers[0] > 2 && (
          <li className="page-item disabled m-2 xs:m-1">...</li>
        )}
        {pageNumbers.map((pageNumber, index) => (
          <li
            key={index}
            // className={`page-item${
            //   pageNumber === currentPage ? " active" : ""
            // } m-2`}
            className={`${
              pageNumber === currentPage
                ? // "bg-blue-500 hover:bg-blue-700 text-white rounded-md border-none"
                  "text-blue-700 border-none underline  hover:text-blue-700 "
                : "hover:text-blue-700 border-none"
            } font-semibold py-2 xs:px-2 px-4 border border-gray-400`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
          <li className="page-item disabled m-2">...</li>
        )}
        {pageNumbers[pageNumbers.length - 1] !== totalPages && (
          <li
            className="page-item "
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </li>
        )}
        {currentPage !== totalPages ? (
          <li
            className="g-white  hover:underline text-blue-500 font-semibold py-2 md:px-4 xs:px-2 border-none"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </li>
        ) : (
          <li
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 xs:px-2 mdpx-4 border-none  opacity-50 cursor-not-allowed"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </li>
        )}

        <li>
          <AiOutlineRight
            className="hover:text-blue-500 hover:cursor-pointer text-xl"
            onClick={lastArrow}
          />
        </li>
      </ul>
    </nav>
  );
}

const userId = Cookies.get("id");
console.log(userId);

const TicketsTab = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [state, setState] = useState(false);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const [searchValue, setSearchValue] = useState("");
  const totalPages = Math.ceil(data.length / postsPerPage);

  useEffect(() => {
    axios
      .get(url.API + "api/users/tickets")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    setData(data);
    console.log("Called");
  }, [state]);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const emailUpData = () => {
    data.sort((a, b) => a.email.localeCompare(b.email));
    setState(!state);
  };

  const emailDownData = () => {
    data.sort((a, b) => b.email.localeCompare(a.email));
    setState(!state);
  };

  const dateUpData = () => {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setState(!state);
  };

  const dateDownData = () => {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setState(!state);
  };

  const statusUpData = () => {
    data.sort((a, b) => a.status.localeCompare(b.status));
    setState(!state);
  };

  const statusDownData = () => {
    data.sort((a, b) => b.status.localeCompare(a.status));
    setState(!state);
  };

  const getDate = (e) => {
    let r = e.e.date;
    return new Date(r).toLocaleDateString("en-GB");
  };

  // const searchTickets = (event) => {
  //   setSearchValue(event.target.value);
  //   console.log(event.target.value);
  // };

  // const searchButton = () => {
  //   console.log(searchValue);
  //   axios
  //     .get(url.API + "api/byStatus/" + searchValue)
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full md:mb-20 mb-4">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-blue-700">
              Ticket Details of All Users
            </h1>
          </div>
          {/* <div className="md:flex items-center md:justify-between xs:hidden">
            <div className="border-blue-400 outline-none rounded-lg  xl:ml-60 lg:ml-32 flex justify-between  items-center xs:w-full md:w-96 h-12 border px-4">
              <input
                type="search"
                className="border-none outline-none w-5/6 "
                placeholder="Search user tickets"
                // onChange={searchTickets}
              />
              <AiOutlineSearch
              //  onClick={searchButton}
              />
            </div>
          </div> */}
          <div className="lg:w-2/3 w-full mx-auto overflow-auto md:mt-12">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr className="border ">
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    <div className="flex items-center">
                      {/* <BiUpArrowAlt
                        className="hover:cursor-pointer"
                        onClick={idUpData}
                      /> */}
                      Ticket Id
                      {/* <BiDownArrowAlt
                        className="hover:cursor-pointer"
                        onClick={idDownData}
                      /> */}
                    </div>
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    <div className="flex items-center">
                      <BiUpArrowAlt
                        className="hover:cursor-pointer"
                        onClick={emailUpData}
                      />
                      Email
                      <BiDownArrowAlt
                        className="hover:cursor-pointer"
                        onClick={emailDownData}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    <div className="flex items-center">
                      <BiUpArrowAlt
                        className="hover:cursor-pointer"
                        onClick={dateUpData}
                      />
                      Date
                      <BiDownArrowAlt
                        className="hover:cursor-pointer"
                        onClick={dateDownData}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    <div className="flex items-center">
                      <BiUpArrowAlt
                        className="hover:cursor-pointer"
                        onClick={statusUpData}
                      />
                      Status
                      <BiDownArrowAlt
                        className="hover:cursor-pointer"
                        onClick={statusDownData}
                      />
                    </div>
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((e) => (
                  <tr key={e.id} className="border">
                    <td className="px-4 py-3">{e.Ticket_id}</td>
                    <td className="px-4 py-3">{e.email} </td>
                    <td className="px-4 py-3">{getDate({ e })}</td>
                    <td className="px-4 py-3">{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && (
              <h1 className="text-center text-black font-bold mt-6">
                No Tickets Avilable
              </h1>
            )}
          </div>
          {data.length !== 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default TicketsTab;
