import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import { baseUrl } from "./endpoint";
import Navbar from './Navbar';
import Upload from './Upload';
import Footer from './Footer';

const Admin = () => {
    const navigate = useNavigate();
    const [admin, setadmin] = useState([])
    const [adminId, setadminId] = useState('')
    const [pageloader, setpageloader] = useState(true)
    const [adminfiles, setadminfiles] = useState([])
    const token = localStorage.Admin;
    const adminIds = localStorage.adminId;

    useEffect(() => {
        if (token) {
            axios.get(`${baseUrl}Admin`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-type": "application/json",
                        "Accept": "application/json"
                    }
                }).then((data) => {
                    if (data) {
                        let Err = data.data.message;
                        if (Err == "Valid Token") {
                            setadmin(data.data.result[0]);
                            localStorage.adminId = data.data.result[0]._id
                            setadminId(data.data.result[0]._id)
                        } else {
                            localStorage.removeItem('Admin')
                            localStorage.removeItem('adminId')
                            navigate("/RegistAdmin")
                        }
                    }
                })
            axios.post(`${baseUrl}adminfiles`, { adminId: adminIds }).then((data) => {
                if (data) {
                    setadminfiles(data.data.result);
                    setpageloader(prev => false)
                }
            })
        } else {
            navigate("/RegistAdmin")
        }
    }, [])

    const delet = (val) => {
        axios.post(`${baseUrl}admindel`, { id: val }).then((data) => {
            if (data) {
                window.location.reload()
            }
        })
    };
    const edit = (val) => {
        // console.log(val);
    }

    return (
        <>
            <div className="">
                <Navbar />
                <div className="container-fluid mt-5 pt-4 mb-4">
                    <h4 className='pt-1'>
                        Welcome <span className="naem">{admin.Name}</span>
                    </h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <Upload />
                            </div>
                            <div className="col-md-8">
                                <div className="title-box">
                                    <h2>Products</h2>
                                </div>
                                {pageloader && (
                                    <div className="spine">
                                        <div className="pageloader"></div>
                                    </div>
                                )}
                                {!pageloader && (
                                    <div className="row">
                                        {adminfiles.map((item, index) => (
                                            <div className="col-md-4">
                                                <div className="product-top">
                                                    <div className="imgBx">
                                                        <img src={item.file} className="h-100" />
                                                    </div>
                                                    <div className="product-botttom mt-2">
                                                        <h3><span className='float1'>{item.product}</span> <span  className='float2'>{item.price}</span></h3><br />
                                                        <h5 className='float'>{item.description}</h5>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <p className='px-5 fa fa-edit clo py-3' name="id" onClick={() => edit(item._id)}></p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className='px-5 fa fa-trash colo py-3' name="id" onClick={() => delet(item._id)}></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )
}

export default Admin