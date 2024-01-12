import React, { useState } from "react";
import Styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Vortex} from "react-loader-spinner";

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function registerSubmit(values) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((error) => { console.log(error)
        let errMessage = error.response.data.message;
        setError(errMessage);
        setIsLoading(false);
      });
      console.log(data)
    if (data.message === "success") {
      setIsLoading(false);
      navigate("/Login");
    }
  }
  let phoneRegex =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name mimimum lenght is 3")
      .max(10, "Name maximum length is 10")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegex, "Invalid phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase letter"
      )
      .required("Password is requied"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords does not match")
      .required("Password is required"),
  });
  // -------------------------------Start Manual Validation-------------------------------------

  //   function validate(values){
  //     let phoneRegex= /^\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
  //     let errors={}
  //     if (!values.name)
  //     {
  // errors.name="name is required"
  //     }

  //   else if (values.name.length < 3)
  //   {
  // errors.name="name minimum length is 3"
  //   }
  // else if (values.name.length > 10)
  // {
  // errors.name="name maximum length is 10"
  // }
  // if (!values.phone)
  // {
  // errors.phone="phone is required"
  // }
  //   else if (!phoneRegex.test(values.phone))
  //   {
  // errors.phone="phone number is invalid"
  //   }

  // return errors;
  // }
  // -------------------------------End of Manual Validation-------------------------------------
  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            id="name"
            className="form-control"
            name="name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.name}
            </div>
          ) : null}

          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            id="phone"
            className="form-control"
            name="phone"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.phone}
            </div>
          ) : null}
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
          <label htmlFor="rePassword">Re-enter Password:</label>
          <input
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            id="rePassword"
            className="form-control"
            name="rePassword"
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.rePassword}
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
            <button
              className="btn bg-main text-white mt-2"
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
