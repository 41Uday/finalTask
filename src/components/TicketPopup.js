import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { url } from "../config";
import Cookies from "js-cookie";

const initialValues = {
  description: "",
  status: "",
  project: "",
};

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  project: Yup.string().required("Project is required"),
});

function TicketPopup(props) {
  const [showPopup, setShowPopup] = useState(false);
  // const navigate = useNavigate();
  const userId = Cookies.get("id");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleCreateTicketSubmit = (values) => {
    console.log("Success", values);
    axios
      .post(url.API + "api/users/createTicket", { ...values, userId: userId })
      .then((res) => {
        console.log(res);
        toast.success("Ticket Created Successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setShowPopup(!showPopup);
        props.onTicketCreated(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toastMethod = () => (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );

  return (
    <div className="flex justify-end items-center mb-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded xs:w-12 mr-2"
        onClick={togglePopup}
      >
        <span className="flex items-center">
          <FaPlus className="font-bold mr-2" />
          Create
        </span>
      </button>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg  p-8 md:w-2/6 w-5/6 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Create a Ticket</h2>
              <button onClick={togglePopup}>
                <FiX className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              </button>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleCreateTicketSubmit}
            >
              <Form>
                <div className="mb-4">
                  <Field
                    className="border rounded-lg py-2 px-3 text-gray-700 w-full outline-blue-300"
                    id="description"
                    type="text"
                    placeholder="Description"
                    name="description"
                  />
                  <ErrorMessage
                    component="p"
                    className="text-red-500 text-sm text-left mt-2"
                    name="description"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    as="select"
                    className="border rounded-lg py-2 px-3 text-gray-700 w-full outline-blue-300"
                    id="status"
                    name="status"
                  >
                    <option value="">Select status</option>
                    <option value="open">open</option>
                    <option value="inprogress">inprogress</option>
                    <option value="closed">closed</option>
                  </Field>
                  <ErrorMessage
                    component="p"
                    className="text-red-500 text-sm text-left mt-2"
                    name="status"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    as="select"
                    className="border rounded-lg py-2 px-3 text-gray-700 w-full outline-blue-300"
                    id="project"
                    name="project"
                  >
                    <option value="">Select your project</option>
                    <option value="DRS">DRS</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Marketplace">Marketplace</option>
                  </Field>
                  <ErrorMessage
                    component="p"
                    className="text-red-500 text-sm text-left mt-2"
                    name="project"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
      {toastMethod()}
    </div>
  );
}

export default TicketPopup;
