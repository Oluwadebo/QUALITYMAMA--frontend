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
    const [car, setcar] = useState()

    let sum = 0;
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
                                    const da = data.data.result;

                                    setaddtocart(da);
                                    setcar(da.length);
                                    setfirst(prev => false)
                                }
                            })
                        } else {
                            localStorage.removeItem('customer');
                            navigate("/Registration")
                        }
                    }
                })
        } else {
            navigate("/Registration")
        }

    }, [])

    const total = addtocart.forEach((val, index) => {
        sum = sum + parseFloat(val.price)
    });
    // useEffect(() => {
    //     const total = addtocart.reduce((accumulator, product) => {
    //         console.log(accumulator + product.price);
    //     }, 0);
    // }, [])


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
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <h4 className='card p-2'>Cart ({car})</h4>
                                        {!first && (
                                            <div className="row p-2">
                                                {addtocart.map((item, index) => (
                                                    <div className="col-12">
                                                        <div className="card mb-1">
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div className="produ p-1">
                                                                        <div className="imgBx">
                                                                            <img src={item.file} className="h-100" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-7 pt-3">
                                                                    <h4>{item.product}</h4>
                                                                </div>
                                                                <div className="col-3">
                                                                    <h4 className='px-3' style={{ float: 'right', }}><b>₦</b> {item.price}</h4>
                                                                </div>
                                                                <div className="col-12 sd">
                                                                    <i className='px-3 fa fa-trash' onClick={() => remove(item._id)}> REMOVE</i>
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
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card p-2">
                                            <h4>CART SUMMARY</h4>
                                        </div>
                                        <div className="card p-2">
                                            <div className="row">
                                                <div className="col-8">
                                                    <h5>Subtotal</h5>
                                                </div>
                                                <div className="col-4">
                                                    <h4 style={{ float: 'right', }}><b>₦</b> {sum}</h4>
                                                </div>
                                            </div>
                                            <p>Delivery fees not included yet.</p>
                                        </div>
                                        <div className="card p-2">
                                            <button type="button" className="default-btn btn-bg-two">CHECKOUT (₦ {sum})</button>
                                        </div>
                                    </div>
                                    <div className="card p-2 mt-1">
                                        <h5>Returns are easy</h5>
                                        <p>Free return within 7 days for other eligible items</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Addtocart