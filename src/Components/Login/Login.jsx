import React, { useContext, useState } from "react";
import Styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";
export default function Login() {
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function loginsubmit(values) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        let errMessage = error.response.data.message;
        setError(errMessage);
        setIsLoading(false);
      });
    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase letter"
      )
      .required("Password is requied"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginsubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <h3>Login Now</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            id="email"
            className="form-control"
            name="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.email}
            </div>
          ) : null}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            className="form-control"
            name="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.password}
            </div>
          ) : null}
          {isLoading ? (
            <Vortex
              visible={true}
              height="60"
              width="60"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["red", "green", "blue", "yellow", "orange", "purple"]}
            />
          ) : (
            <div className="d-flex align-items-center mt-2">
              <button
                className="btn bg-main text-white me-2"
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
              >
                Login
              </button>
              <Link to="/register">Register Now</Link>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
