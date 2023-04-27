import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const NotFound = () => {
  const role = Cookies.get("role");
  return (
    <div className="flex flex-col items-center align-center min-h-full">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="mt-8"
      />
      <h1 className="font-semibold mt-4 md:font-2xl">Page Not Found</h1>
      {role === "user" ? (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4"
        >
          <Link to="/user">Home</Link>
        </button>
      ) : (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4"
        >
          <Link to="/admin">Home</Link>
        </button>
      )}
    </div>
  );
};

export default NotFound;
