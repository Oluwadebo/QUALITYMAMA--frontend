import React from 'react'
import * as yup from "yup";
import { useFormik } from "formik";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { baseUrl } from "./endpoint";

const Forgetpassword = () => {
    const navigate = useNavigate();
    const [Error, setError] = useState("");
    const [first, setfirst] = useState(true)
    const [loader, setloader] = useState(false)

    let lower = new RegExp(`(?=.*[a-z])`);
    let upper = new RegExp(`(?=.*[A-Z])`);
    let number = new RegExp(`(?=.*[0-9])`);

    return (
        <>
            <div className=""></div>
        </>
    )
}

export default Forgetpassword