import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

import Navbar from './Navbar'
import Footer from './Footer'

const Category = () => {
    const navigate = useNavigate();
    const Params = useParams()
    useEffect(() => {
      
    }, [])
    

    return (
        <>
            <Navbar />
            <div className="">
                <div className=""></div>
                <Footer />
            </div>
        </>
    )
}

export default Category