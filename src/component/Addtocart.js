import React from 'react'
import { useEffect, useState } from "react";
import Footer from './Footer'
import axios from 'axios';
import { baseUrl } from "./endpoint";
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const Addtocart = () => {
    const customer = localStorage.customer;
    const customerId = localStorage.customerId;
    const navigate = useNavigate();
    const [addtocart, setaddtocart] = useState([]);
    const [first, setfirst] = useState(true);
    useEffect(() => {
        if (customer) {
            axios.get(`${baseUrl}dashboard`,
                {
                    headers: {
                        "Authorization": `Bearer ${customer}`,
                        "Content-type": "application/json",
                        "Accept": "application/json"
                    }
                }).then((data) => {
                    if (data) {
                        let Err = data.data.message;
                        if (Err == "Valid Token") {
                            axios.post(`${baseUrl}getaddtocart`, { id: customerId }).then((data) => {
                                if (data) {
                                    setaddtocart(data.data.result);
                                    setfirst(prev => false)
                                }
                            })
                        } else {
                            localStorage.removeItem('customer')
                            localStorage.removeItem('customerId')
                            navigate("/Registration")
                        }
                    }
                })
        } else {
            navigate("/Registration")
        }

    }, [])

    const remove = (val) => {
        axios.post(`${baseUrl}removeaddtocart`, { id: val }).then((data) => {
            if (data) {
                window.location.reload()
            }
        })
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-5 pt-1 mb-4 p-0 m-0">
                <div className="">
                    <section className="new-product">
                        <div className="container">
                            {!first && (
                                <div className="row">
                                    {addtocart.map((item, index) => (
                                        <div className="col-md-3">
                                            <div className="product-top">
                                                <div className="imgBx">
                                                    <img src={item.file} className="h-100" />
                                                </div>
                                                <div className="product-botttom text-center">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-half"></i>
                                                    <h3>{item.product}</h3>
                                                    <h5>{item.price}</h5>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <p className='px-5 fa fa-remove colo py-3' name="id" onClick={() => remove(item._id)}></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {first && (
                                <div className="fis spine">
                                    <div className="pageloader"></div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Addtocart