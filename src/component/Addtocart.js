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
    const cart = localStorage.admin;
    const navigate = useNavigate();
    const [addtocart, setaddtocart] = useState([]);
    const [first, setfirst] = useState(true);
    const [car, setcar] = useState();
    const [dis, setdis] = useState(false)
    const [copied, setCopied] = useState(false);
    const [ifo, setifo] = useState([])
    const [admin, setadmin] = useState([]);


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
                            setifo(data.data.result[0]);
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

    const display = () => {
        if (sum > 0) {
            setdis(prev => true)
            setTimeout(() => {
                setdis(prev => false)
            }, 60000);
        }
    }
    const mailler = () => {
        if (customer) {
            const Name = ifo.Name
            const email = ifo.email
            let ordered = addtocart.map((val) => {
                let price = (val.price);
                let product = (val.product);
                let income = { price, product }
                return (income)
            });
            const allinfor = { Name, email, ordered }
            console.log(allinfor);
            axios.post(`${baseUrl}mail`, allinfor)
        }
    }
    // console.log(admin);
    const handleClick = () => {
        const textToCopy = 1664848694;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

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
                                                                    <h4 className='px-3 pt-3' style={{ float: 'right', }}><b>₦</b> {item.price}</h4>
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
                                            <button type="button" className="default-btn btn-bg-two" onClick={display}>CHECKOUT (₦ {sum})</button>
                                            {dis && (
                                                <div className="card mt-1 p-1">
                                                    <h4>1664848694 <span style={{ float: 'right', }}><button className='butt mx-1' onClick={handleClick}>
                                                        {copied ? 'Copied!' : <i class="fa fa-copy"></i>}
                                                    </button></span> <br /> ACCESS BANK <br /> OGUNWE DEBO</h4>
                                                    <button type="button" className="default-btn btn-bg-two" onClick={mailler}><a href="https://wa.me/2349044796430" className='text-white'>Confirm transaction</a></button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card p-2 mt-1">
                                        <h5>Returns are easy</h5>
                                        <p>Free return within 24 hours for other eligible items</p>
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