import React from "react";
import { url } from "../config";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import EmailPopup from "./EmailPopup";
import axios from "axios";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";

// const data = [
//   {
//     id: 1,
//     name: "John Smith",
//     email: "john.smith@example.com",
//     department: "Sales",
//     date: "2022-01-01",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 2,
//     name: "Jane Doe",
//     email: "jane.doe@example.com",
//     department: "Marketing",
//     date: "2022-02-15",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     email: "bob.johnson@example.com",
//     department: "Finance",
//     date: "2022-03-10",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 4,
//     name: "Sarah Lee",
//     email: "sarah.lee@example.com",
//     department: "IT",
//     date: "2022-04-20",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 5,
//     name: "Mark Thompson",
//     email: "mark.thompson@example.com",
//     department: "Sales",
//     date: "2022-05-05",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 6,
//     name: "Julia Nguyen",
//     email: "julia.nguyen@example.com",
//     department: "Marketing",
//     date: "2022-06-12",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 7,
//     name: "Mike Johnson",
//     email: "mike.johnson@example.com",
//     department: "IT",
//     date: "2022-07-01",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 8,
//     name: "Jessica Green",
//     email: "jessica.green@example.com",
//     department: "Finance",
//     date: "2022-08-18",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 9,
//     name: "Adam Lee",
//     email: "adam.lee@example.com",
//     department: "Sales",
//     date: "2022-09-05",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 10,
//     name: "Katie Brown",
//     email: "katie.brown@example.com",
//     department: "Marketing",
//     date: "2022-10-12",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 11,
//     name: "Tom Wilson",
//     email: "tom.wilson@example.com",
//     department: "IT",
//     date: "2022-11-01",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 12,
//     name: "Emily Jones",
//     email: "emily.jones@example.com",
//     department: "Finance",
//     date: "2022-12-18",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 14,
//     name: "Sarah Lee",
//     email: "sarah.lee@example.com",
//     department: "IT",
//     date: "2022-04-20",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 15,
//     name: "Mark Thompson",
//     email: "mark.thompson@example.com",
//     department: "Sales",
//     date: "2022-05-05",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 16,
//     name: "Julia Nguyen",
//     email: "julia.nguyen@example.com",
//     department: "Marketing",
//     date: "2022-06-12",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 17,
//     name: "Mike Johnson",
//     email: "mike.johnson@example.com",
//     department: "IT",
//     date: "2022-07-01",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 18,
//     name: "Jessica Green",
//     email: "jessica.green@example.com",
//     department: "Finance",
//     date: "2022-08-18",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 19,
//     name: "Adam Lee",
//     email: "adam.lee@example.com",
//     department: "Sales",
//     date: "2022-09-05",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 20,
//     name: "Katie Brown",
//     email: "katie.brown@example.com",
//     department: "Marketing",
//     date: "2022-10-12",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 21,
//     name: "Tom Wilson",
//     email: "tom.wilson@example.com",
//     department: "IT",
//     date: "2022-11-01",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 22,
//     name: "Emily Jones",
//     email: "emily.jones@example.com",
//     department: "Finance",
//     date: "2022-12-18",
//     actions: "Edit, Delete",
//   },

//   {
//     id: 32,
//     name: "Emily Jones",
//     email: "emily.jones@example.com",
//     department: "Finance",
//     date: "2022-12-18",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 34,
//     name: "Sarah Lee",
//     email: "sarah.lee@example.com",
//     department: "IT",
//     date: "2022-04-20",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 35,
//     name: "Mark Thompson",
//     email: "mark.thompson@example.com",
//     department: "Sales",
//     date: "2022-05-05",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 36,
//     name: "Julia Nguyen",
//     email: "julia.nguyen@example.com",
//     department: "Marketing",
//     date: "2022-06-12",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 37,
//     name: "Mike Johnson",
//     email: "mike.johnson@example.com",
//     department: "IT",
//     date: "2022-07-01",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 38,
//     name: "Jessica Green",
//     email: "jessica.green@example.com",
//     department: "Finance",
//     date: "2022-08-18",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 39,
//     name: "Adam Lee",
//     email: "adam.lee@example.com",
//     department: "Sales",
//     date: "2022-09-05",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 40,
//     name: "Katie Brown",
//     email: "katie.brown@example.com",
//     department: "Marketing",
//     date: "2022-10-12",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 41,
//     name: "Tom Wilson",
//     email: "tom.wilson@example.com",
//     department: "IT",
//     date: "2022-11-01",
//     actions: "Edit, Delete",
//   },
//   {
//     id: 42,
//     name: "Emily Jones",
//     email: "emily.jones@example.com",
//     department: "Finance",
//     date: "2022-12-18",
//     actions: "Edit, Delete",
//   },
// ];

// const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
//   // console.log(itemsPerPage, totalItems, paginate);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageNumbers = [];

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Created an array of page numbers
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   // Handle page number clicks
//   const handleClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     paginate(pageNumber);
//   };

//   const abc = () => {
//     setCurrentPage(1);
//     paginate(1);
//     console.log("first");
//   };

//   const lastArrow = () => {
//     setCurrentPage(totalPages);
//     console.log(totalPages);
//     paginate(totalPages);
//     console.log("last");
//   };

//   return (
//     <nav className="flex justify-center w-full sx:w-5/6">
//       <ul className="flex items-center">
//         {/* Render "Prev" button if not on first page */}
//         <li>
//           <AiOutlineLeft
//             className="hover:text-blue-500 hover:cursor-pointer text-xl"
//             onClick={abc}
//           />
//         </li>
//         {currentPage > 1 ? (
//           <li>
//             <button
//               className="bg-white  hover:underline text-blue-500 font-semibold py-2 px-4 border-none"
//               onClick={() => handleClick(currentPage - 1)}
//             >
//               Prev
//             </button>
//           </li>
//         ) : (
//           <li>
//             <button
//               className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-none  opacity-50 cursor-not-allowed"
//               // onClick={() => handleClick(currentPage - 1)}
//             >
//               Prev
//             </button>
//           </li>
//         )}

//         {/* Render page number buttons */}
//         {pageNumbers.map((number) => (
//           <li key={number}>
//             <button
//               className={`${
//                 number === currentPage
//                   ? // "bg-blue-500 hover:bg-blue-700 text-white rounded-md border-none"
//                     "text-blue-700 border-none underline  hover:text-blue-700 "
//                   : "hover:text-blue-700 border-none"
//               } font-semibold py-2 px-4 border border-gray-400`}
//               onClick={() => handleClick(number)}
//             >
//               {number}
//             </button>
//           </li>
//         ))}

//         {/* Render "Next" button if not on last page */}
//         {currentPage < totalPages ? (
//           <li>
//             <button
//               className="bg-white  hover:underline text-blue-500 font-semibold py-2 px-4 border-none"
//               onClick={() => handleClick(currentPage + 1)}
//             >
//               Next
//             </button>
//           </li>
//         ) : (
//           <li>
//             <button
//               className="bg-white text-gray-800 font-semibold py-2 px-4 border-none border-gray-400 rounded-r opacity-50 cursor-not-allowed"
//               // onClick={() => handleClick(currentPage + 1)}
//             >
//               Next
//             </button>
//           </li>
//         )}
//         <li>
//           <AiOutlineRight
//             className="hover:text-blue-500 hover:cursor-pointer text-xl"
//             onClick={lastArrow}
//           />
//         </li>
//       </ul>
//     </nav>
//   );
// };

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
            className="page-item "
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

const UserTab = () => {
  // const [isEnabled, setIsEnabled] = useState(true);
  const [data, setData] = useState([]);

  // const itemsPerPage = 5;

  // Initialize state for current page and current items
  // const [currentPage, setCurrentPage] = useState(1);
  // const [currentItems, setCurrentItems] = useState(data.slice(0, itemsPerPage));

  // // Handle pagination button clicks
  // const paginate = (pageNumber) => {
  //   // Calculate the start and end indexes of the current page
  //   const startIndex = (pageNumber - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;

  //   // Set the current page and current items
  //   setCurrentPage(pageNumber);
  //   setCurrentItems(data.slice(startIndex, endIndex));
  // };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(data.length / postsPerPage);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    axios
      .get(url.API + "api/users")
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getDate = (e) => {
    // console.log(e.e.actions);
    let r = e.e.date;
    // let a = res.substring(0, 10);
    return new Date(r).toLocaleDateString("en-GB");
  };

  const idUpData = () => {
    console.log("idUp");
  };

  const idDownData = () => {
    console.log("idDown");
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <h1 className="md:text-4xl sm:text-xl text-blue-700 font-sans">
        Users details
      </h1>
      <div className="md:mt-32">
        <div className="flex justify-between  align-center">
          <div className="border-blue-400 outline-none rounded-lg mb-4 flex justify-between items-center md:w-96 md:h-12 border px-4">
            <input
              type="search"
              className="border-none outline-none w-5/6"
              placeholder="Search users by department"
            />
            <AiOutlineSearch />
          </div>
          <EmailPopup />
        </div>
        <div className="overflow-x-auto text-xs md:text-base md:h-3/6 ">
          <table className="">
            <thead className="h-2 flex flex-row">
              <tr className="bg-indigo-100 flex h-14">
                <th className="px-4 py-2 flex items-center">
                  <BiUpArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idUpData}
                  />
                  Id
                  <BiDownArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idDownData}
                  />
                </th>
                <th className="px-4 py-2 flex items-center">
                  <BiUpArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idUpData}
                  />
                  Name
                  <BiDownArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idDownData}
                  />
                </th>
                <th className="px-4 py-2 flex items-center">
                  <BiUpArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idUpData}
                  />
                  Email
                  <BiDownArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idDownData}
                  />
                </th>
                <th className="px-4 py-2 flex items-center">
                  <BiUpArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idUpData}
                  />
                  Department
                  <BiDownArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idDownData}
                  />
                </th>
                <th className="px-4 py-2 flex items-center">
                  <BiUpArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idUpData}
                  />
                  Date
                  <BiDownArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idDownData}
                  />
                </th>
                <th className="px-4 py-2 flex items-center">
                  <BiUpArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idUpData}
                  />
                  Actions
                  <BiDownArrowAlt
                    className="hover:cursor-pointer"
                    onClick={idDownData}
                  />
                </th>
              </tr>
            </thead>
            <tbody className="text-center md:h-40 md:mt-6 ">
              {currentPosts.map((e) => (
                <tr
                  className="bg-white border border-stone-300 hover:bg-lime-50 hover:cursor-pointer
                "
                  key={e.id}
                >
                  <td className="px-4 py-2">{e.id}</td>
                  <td className="px-4 py-2">{e.fullname}</td>
                  <td className="px-4 py-2">{e.email} </td>
                  <td className="px-4 py-2"> {e.dept} </td>
                  <td className="px-4 py-2"> {getDate({ e })} </td>
                  <td className="px-4 py-2">
                    {e.actions ? (
                      <button
                        className="hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        // onClick={handleEnabled}
                      >
                        Enable
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        // onClick={(event) => handleEnabled(event, e)}
                      >
                        Disable
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          {/* Render the current items */}
          {/* {currentItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))} */}

          {/* Rendering the pagination component */}
          {/* <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={paginate}
        /> */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserTab;
