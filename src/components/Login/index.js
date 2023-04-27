import React, { useEffect } from "react";

import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import { Autocomplete } from "@mui/material";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

import "./index.css";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`[\]{}|\\:;"',./<>?])(?!.*\s).{8,}$/,
      "password must contains 8 characters"
    )
    .required("password contains one (uppercase,lowercase,digit)"),
});

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [state, setState] = React.useState(false);
  const role = Cookies.get("role");
  const actions = Cookies.get("actions");

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    axios
      .post("http://192.168.1.85:8095/api/login", values)
      .then((res) => {
        // window.location.href = "/admin";
        console.log(res);
        const { id, name, email, role, actions } = res.data;
        console.log(id, name, email, role, actions);
        Cookies.set("id", id, { expires: 5 });
        Cookies.set("name", name, { expires: 5 });
        Cookies.set("email", email, { expires: 5 });
        Cookies.set("role", role, { expires: 5 });
        Cookies.set("actions", actions, { expires: 5 });
        setState(!state);
        if (role === "user" && actions) {
          navigate("/user", { replace: true });
        } else {
          navigate("/admin", { replace: true });
        }
      })
      .catch((res) => {
        console.log(res);
        if (actions === false) {
          toast.error("Access Denied,Contact Admin", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(res.response.data.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
    resetForm();
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

  // if (role === "user") {
  //   navigate("/user");
  // }
  // if (role === "admin") {
  //   navigate("/admin");
  // }

  useEffect(() => {
    if (role === "user") {
      navigate("/user");
    }
    if (role === "admin") {
      navigate("/admin");
    }
  });

  return (
    <div className="login-container">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          {/* <CssBaseline /> */}
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Box
                  // component="form"
                  noValidate
                  // onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                      <div className="error">
                        <ErrorMessage name="email" />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                      <div className="error">
                        <ErrorMessage name="password" />
                      </div>
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  <Grid container justifyContent="flex-start">
                    <Grid item>
                      <Link
                        to="/signup"
                        variant="body2"
                        className="text-black hover:text-blue-600"
                      >
                        Don't have an account? Sign Up
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
      {toastMethod()}
    </div>
  );
}
