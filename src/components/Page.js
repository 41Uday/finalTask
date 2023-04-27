import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";

const data = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    department: "Sales",
    date: "2022-01-01",
    actions: "Edit, Delete",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    department: "Marketing",
    date: "2022-02-15",
    actions: "Edit, Delete",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    department: "Finance",
    date: "2022-03-10",
    actions: "Edit, Delete",
  },
  {
    id: 4,
    name: "Sarah Lee",
    email: "sarah.lee@example.com",
    department: "IT",
    date: "2022-04-20",
    actions: "Edit, Delete",
  },
  {
    id: 5,
    name: "Mark Thompson",
    email: "mark.thompson@example.com",
    department: "Sales",
    date: "2022-05-05",
    actions: "Edit, Delete",
  },
  {
    id: 6,
    name: "Julia Nguyen",
    email: "julia.nguyen@example.com",
    department: "Marketing",
    date: "2022-06-12",
    actions: "Edit, Delete",
  },
  {
    id: 7,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    department: "IT",
    date: "2022-07-01",
    actions: "Edit, Delete",
  },
  {
    id: 8,
    name: "Jessica Green",
    email: "jessica.green@example.com",
    department: "Finance",
    date: "2022-08-18",
    actions: "Edit, Delete",
  },
  {
    id: 9,
    name: "Adam Lee",
    email: "adam.lee@example.com",
    department: "Sales",
    date: "2022-09-05",
    actions: "Edit, Delete",
  },
  {
    id: 10,
    name: "Katie Brown",
    email: "katie.brown@example.com",
    department: "Marketing",
    date: "2022-10-12",
    actions: "Edit, Delete",
  },
  {
    id: 11,
    name: "Tom Wilson",
    email: "tom.wilson@example.com",
    department: "IT",
    date: "2022-11-01",
    actions: "Edit, Delete",
  },
  {
    id: 12,
    name: "Emily Jones",
    email: "emily.jones@example.com",
    department: "Finance",
    date: "2022-12-18",
    actions: "Edit, Delete",
  },
  {
    id: 14,
    name: "Sarah Lee",
    email: "sarah.lee@example.com",
    department: "IT",
    date: "2022-04-20",
    actions: "Edit, Delete",
  },
  {
    id: 15,
    name: "Mark Thompson",
    email: "mark.thompson@example.com",
    department: "Sales",
    date: "2022-05-05",
    actions: "Edit, Delete",
  },
  {
    id: 16,
    name: "Julia Nguyen",
    email: "julia.nguyen@example.com",
    department: "Marketing",
    date: "2022-06-12",
    actions: "Edit, Delete",
  },
  {
    id: 17,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    department: "IT",
    date: "2022-07-01",
    actions: "Edit, Delete",
  },
  {
    id: 18,
    name: "Jessica Green",
    email: "jessica.green@example.com",
    department: "Finance",
    date: "2022-08-18",
    actions: "Edit, Delete",
  },
  {
    id: 19,
    name: "Adam Lee",
    email: "adam.lee@example.com",
    department: "Sales",
    date: "2022-09-05",
    actions: "Edit, Delete",
  },
  {
    id: 20,
    name: "Katie Brown",
    email: "katie.brown@example.com",
    department: "Marketing",
    date: "2022-10-12",
    actions: "Edit, Delete",
  },
  {
    id: 21,
    name: "Tom Wilson",
    email: "tom.wilson@example.com",
    department: "IT",
    date: "2022-11-01",
    actions: "Edit, Delete",
  },
  {
    id: 22,
    name: "Emily Jones",
    email: "emily.jones@example.com",
    department: "Finance",
    date: "2022-12-18",
    actions: "Edit, Delete",
  },

  {
    id: 32,
    name: "Emily Jones",
    email: "emily.jones@example.com",
    department: "Finance",
    date: "2022-12-18",
    actions: "Edit, Delete",
  },
  {
    id: 34,
    name: "Sarah Lee",
    email: "sarah.lee@example.com",
    department: "IT",
    date: "2022-04-20",
    actions: "Edit, Delete",
  },
  {
    id: 35,
    name: "Mark Thompson",
    email: "mark.thompson@example.com",
    department: "Sales",
    date: "2022-05-05",
    actions: "Edit, Delete",
  },
  {
    id: 36,
    name: "Julia Nguyen",
    email: "julia.nguyen@example.com",
    department: "Marketing",
    date: "2022-06-12",
    actions: "Edit, Delete",
  },
  {
    id: 37,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    department: "IT",
    date: "2022-07-01",
    actions: "Edit, Delete",
  },
  {
    id: 38,
    name: "Jessica Green",
    email: "jessica.green@example.com",
    department: "Finance",
    date: "2022-08-18",
    actions: "Edit, Delete",
  },
  {
    id: 39,
    name: "Adam Lee",
    email: "adam.lee@example.com",
    department: "Sales",
    date: "2022-09-05",
    actions: "Edit, Delete",
  },
  {
    id: 40,
    name: "Katie Brown",
    email: "katie.brown@example.com",
    department: "Marketing",
    date: "2022-10-12",
    actions: "Edit, Delete",
  },
  {
    id: 41,
    name: "Tom Wilson",
    email: "tom.wilson@example.com",
    department: "IT",
    date: "2022-11-01",
    actions: "Edit, Delete",
  },
  {
    id: 42,
    name: "Emily Jones",
    email: "emily.jones@example.com",
    department: "Finance",
    date: "2022-12-18",
    actions: "Edit, Delete",
  },
];

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
    // setCurrentPage(1);
    // paginate(1);
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
            className="g-white  hover:underline text-blue-500 font-semibold py-2 px-4 border-none"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </li>
        ) : (
          <li
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-none  opacity-50 cursor-not-allowed"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </li>
        )}

        {pageNumbers[0] !== 1 && (
          <li
            className="page-item m-2 font-semibold"
            onClick={() => handlePageChange(1)}
          >
            1
          </li>
        )}

        {pageNumbers[0] > 2 && <li className="page-item disabled m-2">...</li>}

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
            } font-semibold py-2 px-4 border border-gray-400`}
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
            className="page-item m-2"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </li>
        )}

        {currentPage !== totalPages ? (
          <li
            className="g-white  hover:underline text-blue-500 font-semibold py-2 px-4 border-none"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </li>
        ) : (
          <li
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-none  opacity-50 cursor-not-allowed"
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

function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(data.length / postsPerPage);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const idUpData = () => {
    console.log("idUp");
  };

  const idDownData = () => {
    console.log("idDown");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Data</h1>

      <div className="relative md:w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border">
              <th scope="col" className="px-6 py-3">
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
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  <BiUpArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idUpData}
                  />
                  fullname
                  <BiDownArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idDownData}
                  />
                </div>
              </th>
              <th scope="col" className="sm:px-2 sm:py-1 px-6 py-3">
                <div className="flex items-center">
                  <BiUpArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idUpData}
                  />
                  email
                  <BiDownArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idDownData}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  <BiUpArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idUpData}
                  />
                  department
                  <BiDownArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idDownData}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  <BiUpArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idUpData}
                  />
                  date
                  <BiDownArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idDownData}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((e) => (
              <tr
                className="bg-white border dark:bg-gray-800 dark:border-gray-700"
                key={e.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ml-2"
                >
                  {e.id}
                </th>
                <td className="px-6 py-4">{e.name}</td>
                <td className="px-6 py-4">{e.email}</td>
                <td className="px-6 py-4">{e.department}</td>
                <td className="px-6 py-4">{e.date}</td>
                <td className="px-6 py-4  text-blue-500">
                  Active<span className="text-black ml-2">Inactive</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Page;
