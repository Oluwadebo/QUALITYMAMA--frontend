import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { baseUrl } from "./endpoint";

const Registration = () => {
    const navigate = useNavigate();
    const [Error, setError] = useState("");
    const [first, setfirst] = useState(true)
    const [loader, setloader] = useState(false)

    let lower = new RegExp(`(?=.*[a-z])`);
    let upper = new RegExp(`(?=.*[A-Z])`);
    let number = new RegExp(`(?=.*[0-9])`);

    const login = () => {
        setfirst(prev => true)
    }

    const register = () => {
        setfirst(prev => false)
    }

    const signup = useFormik({
        initialValues: {
            Name: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            setloader(prev => true)
            axios.post(`${baseUrl}customersignup`, values).then((credentials) => {
                if (credentials) {
                    let Err = credentials.data.message;
                    if (Err == "Email already used") {
                        setloader(prev => false)
                        setError("Email already used");
                    } else {
                        setloader(prev => false)
                        setfirst(prev => true)
                    }
                }
            })
        },
        validationSchema: yup.object({
            Name: yup
                .string()
                .required("This field is required")
                .min(3, "must be greater than three"),
            email: yup
                .string()
                .required("This field is required")
                .email("must be a valid email"),
            password: yup
                .string()
                .required("This field is required")
                .matches(lower, "Must include lowerCase letter")
                .matches(upper, "Must include upperCase letter")
                .matches(number, "Must include a number")
                .min(5, "must be greater than 5 charaters"),
        }),
    });
    const signin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            setloader(prev => true)
            axios.post(`${baseUrl}customersignin`, values).then((credentials) => {
                if (credentials) {
                    let Err = credentials.data.message;
                    if (Err == "Email not found") {
                        setloader(prev => false)
                        setError("Email not found");
                    } else if (Err == "Invaild password") {
                        setloader(prev => false)
                        setError("Invaild password");
                    } else {
                        if (Err == "Token generated") {
                            localStorage.customer = credentials.data.token
                            setloader(prev => false)
                            navigate("/")
                        }
                    }
                }
            })
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .required("This field is required")
                .email("must be a valid email"),
            password: yup
                .string()
                .required("This field is required")
                .matches(lower, "Must include lowerCase letter")
                .matches(upper, "Must include upperCase letter")
                .matches(number, "Must include a number")
                .min(5, "password is weak, must be greater than 5 charaters"),
        }),
    });

    const toggle = useRef();
    const i = useRef();
    const password = useRef();

    const showHide = () => {
        if (password.current.type === "password") {
            password.current.setAttribute("type", "text");
            toggle.current.classList.add("hide");
            i.current.classList = "fa fa-eye-slash";
        } else {
            password.current.setAttribute("type", "password");
            i.current.classList = "fa fa-eye";
            toggle.current.classList.remove("hide");
        }
    };
    return (
        <>
            <div className="container">
                <div className="row mx-auto my-5">
                    {first && (
                        <div className="shadow col-12 col-md-4 mx-auto px-4 pb-3 asd">
                            <h3 className="m-4 text-white">
                                <b>
                                    <i>SIGN-IN</i>
                                </b>
                            </h3>
                            <p>
                                <b className="text-danger"><marquee className="card">{Error}</marquee></b>
                            </p>
                            <form action="" onSubmit={signin.handleSubmit}>
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className={
                                            signin.errors.email && signin.touched.email
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        onChange={signin.handleChange}
                                        style={{ backgroundColor: "#F5F7FA" }}
                                        name="email"
                                        onBlur={signin.handleBlur}
                                    />
                                    {signin.touched.email && (
                                        <div style={{ color: "red" }} className="my-2">
                                            {signin.errors.email}
                                        </div>
                                    )}
                                    <label>&#x1F4E7;&nbsp; Your email</label>
                                </div>
                                <div className="form-floating my-3">
                                    <input
                                        type="password"
                                        placeholder="Your password"
                                        className={
                                            signin.errors.password && signin.touched.password
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        ref={password}
                                        maxLength={10}
                                        onChange={signin.handleChange}
                                        style={{ backgroundColor: "#F5F7FA" }}
                                        name="password"
                                        onBlur={signin.handleBlur}
                                    />
                                    <div
                                        id="toggle"
                                        ref={toggle}
                                        onClick={showHide}
                                        className="gose pe-4"
                                    >
                                        <i ref={i} className="fa fa-eye" aria-hidden="true"></i>
                                    </div>
                                    {signin.touched.password && (
                                        <div style={{ color: "red" }} className="my-2">
                                            {signin.errors.password}
                                        </div>
                                    )}
                                    <label>&#x1F512;&nbsp; Your password</label>
                                    <button
                                        type="submit"
                                        className="btn form-control py-3 mt-3 asdb"
                                    >
                                        <b>Sign-In</b>
                                        {loader && (
                                            <div className="spin">
                                                <div className="loader"></div>
                                            </div>
                                        )}
                                    </button>
                                </div>
                                <div className="row mt-3 text-white">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-8">
                                                <p style={{ opacity: "0.9" }}>Don't have an account?</p>
                                            </div>
                                            <div className="col-4">
                                                <p>
                                                    <b className="sig" onClick={register}>
                                                        Sign-Up
                                                    </b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {!first && (
                        <div className="shadow col-12 col-md-4 mx-auto px-4 pb-3 asd">
                            <h3 className="m-4 text-white">
                                <b>
                                    <i>Create an account</i>
                                </b>
                            </h3>
                            <p>
                                <b className="text-danger"><marquee className="card">{Error}</marquee></b>
                            </p>
                            <form action="" onSubmit={signup.handleSubmit}>
                                <div className="form-floating my-3">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className={
                                            signup.errors.Name && signup.touched.Name
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        onChange={signup.handleChange}
                                        style={{ backgroundColor: "#F5F7FA" }}
                                        name="Name"
                                        onBlur={signup.handleBlur}
                                    />
                                    {signup.touched.Name && (
                                        <div style={{ color: "red" }} className="my-2">
                                            {signup.errors.Name}
                                        </div>
                                    )}
                                    <label>&#x1F464;&nbsp; Your Name</label>
                                </div>
                                <div className="form-floating my-3">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className={
                                            signup.errors.email && signup.touched.email
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        onChange={signup.handleChange}
                                        style={{ backgroundColor: "#F5F7FA" }}
                                        name="email"
                                        onBlur={signup.handleBlur}
                                    />
                                    {signup.touched.email && (
                                        <div style={{ color: "red" }} className="my-2">
                                            {signup.errors.email}
                                        </div>
                                    )}
                                    <label>&#x1F4E7;&nbsp; Your email</label>
                                </div>
                                <div className="form-floating my-3">
                                    <input
                                        type="password"
                                        placeholder="Your password"
                                        className={
                                            signup.errors.password && signup.touched.password
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        ref={password}
                                        maxLength={10}
                                        onChange={signup.handleChange}
                                        style={{ backgroundColor: "#F5F7FA" }}
                                        name="password"
                                        onBlur={signup.handleBlur}
                                    />

                                    <div
                                        id="toggle"
                                        ref={toggle}
                                        onClick={showHide}
                                        className="gose pe-4"
                                    >
                                        <i ref={i} className="fa fa-eye" aria-hidden="true"></i>
                                    </div>
                                    {signup.touched.password && (
                                        <div style={{ color: "red" }} className="my-2">
                                            {signup.errors.password}
                                        </div>
                                    )}
                                    <label>&#x1F512;&nbsp; Your password</label>
                                    <button
                                        type="submit"
                                        className="btn form-control py-3 mt-3 asdb"
                                    >
                                        <b>Sign-Up</b>
                                        {loader && (
                                            <div className="spin">
                                                <div className="loader"></div>
                                            </div>
                                        )}
                                    </button>
                                </div>
                                <div className="row mt-3 text-white">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-8">
                                                <p style={{ opacity: "0.9" }}>Already have an account?</p>
                                            </div>
                                            <div className="col-4">
                                                <p>
                                                    <b className="sig" onClick={login}>
                                                        Sign-In
                                                    </b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Registration