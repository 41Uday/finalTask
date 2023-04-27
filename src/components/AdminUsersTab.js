import React, { useState, useEffect } from "react";
import { url } from "../config";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import EmailPopup from "./EmailPopup";

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
    // console.log("last");
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

const AdminUsersTab = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchDept, setSearchDept] = useState("");
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const [austate, setAustate] = useState(false);
  const totalPages = Math.ceil(data.length / postsPerPage);
  const [abc, setAbc] = useState(false);
  useEffect(() => {
    axios
      .get(url.API + "api/users")
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [abc]);

  const getDate = (e) => {
    let r = e.e.date;
    return new Date(r).toLocaleDateString("en-GB");
  };

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const idUpData = () => {
    data.sort((a, b) => a.user_id - b.user_id);
    setAustate(!austate);
  };

  const idDownData = () => {
    data.sort((a, b) => b.user_id - a.user_id);
    setAustate(!austate);
  };

  const nameUpData = () => {
    data.sort((a, b) => a.fullName.localeCompare(b.fullName));

    setAustate(!austate);
  };

  const nameDownData = () => {
    data.sort((a, b) => b.fullName.localeCompare(a.fullName));
    setAustate(!austate);
  };

  const emailUpData = () => {
    data.sort((a, b) => a.email.localeCompare(b.email));
    setAustate(!austate);
  };

  const emailDownData = () => {
    data.sort((a, b) => b.email.localeCompare(a.email));
    setAustate(!austate);
  };

  const deptUpData = () => {
    data.sort((a, b) => a.dept.localeCompare(b.dept));
    setAustate(!austate);
  };

  const deptDownData = () => {
    data.sort((a, b) => b.dept.localeCompare(a.dept));
    setAustate(!austate);
  };

  const dateUpData = () => {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setAustate(!austate);
  };

  const dateDownData = () => {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setAustate(!austate);
  };

  const searchUsersByDept = () => {
    axios
      .get(url.API + "api/byDept/" + searchDept)
      .then((res) => {
        setData(res.data);

        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setData(data);
  }, [austate]);

  const actionUpData = () => {
    data.sort((a, b) => a.actions - b.actions);
    setAustate(!austate);
  };

  const actionDownData = () => {
    data.sort((a, b) => b.actions - a.actions);
    setAustate(!austate);
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full md:mb-20 mb-4">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-blue-700">
              User Details
            </h1>
          </div>
          <div className="md:flex items-center md:justify-between xs:hidden">
            <div className="xs:flex md:hidden">
              <EmailPopup />
            </div>

            <div className="border-blue-400 outline-none rounded-lg mb-4 xl:ml-60 lg:ml-32 flex justify-between  items-center xs:w-full md:w-96 h-12 border px-4">
              <input
                type="search"
                className="border-none outline-none w-5/6"
                placeholder="Search by department"
                onChange={(event) => setSearchDept(event.target.value)}
              />
              <AiOutlineSearch
                className="hover:cursor-pointer"
                onClick={searchUsersByDept}
              />
            </div>
            <div className="hidden md:flex">
              <EmailPopup />
            </div>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto md:mt-12">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr className="border ">
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    <div className="flex items-center">
                      <BiUpArrowAlt
                        className="hover:cursor-pointer"
                        onClick={idUpData}
                      />
                      Id
                      <BiDownArrowAlt
                        className="hover:cursor-pointer"
                        onClick={idDownData}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    <div className="flex items-center">
                      <BiUpArrowAlt
                        className="hover:cursor-pointer"
                        onClick={nameUpData}
                      />
                      Full Name
                      <BiDownArrowAlt
                        className="hover:cursor-pointer"
                        onClick={nameDownData}
                      />
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
                        onClick={deptUpData}
                      />
                      Department
                      <BiDownArrowAlt
                        className="hover:cursor-pointer"
                        onClick={deptDownData}
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
                        onClick={actionUpData}
                      />
                      Actions
                      <BiDownArrowAlt
                        className="hover:cursor-pointer"
                        onClick={actionDownData}
                      />
                    </div>
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((e) => (
                  <tr key={e.user_id} className="border">
                    <td className="px-4 py-3">{e.user_id}</td>
                    <td className="px-4 py-3">{e.fullName} </td>
                    <td className="px-4 py-3">{e.email}</td>
                    <td className="px-4 py-3">{e.dept}</td>
                    <td className="px-4 py-3">{getDate({ e })}</td>
                    {e.actions ? (
                      <td
                        className="px-4 py-3 text-black underline hover:cursor-pointer"
                        onClick={() => {
                          console.log("diab", e.user_id);
                          axios
                            .post(url.API + "api/" + e.user_id + "/disable")
                            .then((res) => {
                              console.log(res.data);
                              setAbc(!abc);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Disable
                      </td>
                    ) : (
                      <td
                        className="px-4 py-3 text-blue-600 underline hover:cursor-pointer"
                        onClick={() => {
                          axios
                            .post(url.API + "api/" + e.user_id + "/enable")
                            .then((res) => {
                              console.log(res.data);
                              setAbc(!abc);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Enable
                      </td>
                    )}
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

export default AdminUsersTab;
