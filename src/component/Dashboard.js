import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import { baseUrl } from "./endpoint";
import Navbar from './Navbar'
import stable1 from "./asset/stable1.jpg"
import stable2 from "./asset/stable2.jpg"
import stable3 from "./asset/stable3.jpg"
import stable4 from "./asset/stable4.jpg"
import caro1 from "./asset/caro1.jpg"
import caro2 from "./asset/caro2.jpg"
import caro6 from "./asset/caro6.jpg"
import zoom4 from "./asset/zoom4.jpg"
import zoom3 from "./asset/zoom3.jpg"
import zoom5 from "./asset/zoom5.jpg"
import original from "./asset/original.png"
import returnoninvestment from "./asset/return-on-investment.png"
import debitcard from "./asset/debit-card.png"
import Footer from './Footer';

const Dashboard = () => {
    const navigate = useNavigate();
    // const [customers, setcustomers] = useState([])
    const [files, setfiles] = useState([])
    const [sale, setsale] = useState([])
    const [fashion, setfashion] = useState([])
    // const customer = localStorage.customer;
    // const customerId = localStorage.customerId;

    useEffect(() => {
        axios.get(`${baseUrl}goods`).then((data) => {
            if (data) {
                setfiles(data.data.result);
                let Onsale = "Onsale"
                axios.post(`${baseUrl}onsale`, { Onsale }).then((data) => {
                    if (data) {
                        setsale(data.data.result)
                        let fashio = "fashion"
                        axios.post(`${baseUrl}fashion`, { fashio }).then((data) => {
                            if (data) {
                                setfashion(data.data.result)
                            }
                        })
                    }
                })
            }
        })
    }, [])

    const viewproduct = (val) => {
        if (val) {
            localStorage.Viewproduct = val
            navigate("/Viewproduct")
        }
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-5 pt-4 mb-4 p-0 m-0">
                <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" id='clicked'></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="2000">
                            <div className="imggi">
                                <img src={caro1} className="w-100" alt="..." />
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <div className="imggi">
                                <img src={caro2} className="w-100" alt="..." />
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <div className="imggi">
                                <img src={caro6} className="w-100" alt="..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-3">
                    <section className="feature-categories">
                        <div className="container-fluid">
                            <div className="row">
                                {fashion.map((item, index) => (
                                    <div className="col-lg-4 col-md-6 my-3 mt-md-0">
                                        <div className="product-to">
                                            <div className="" onClick={() => viewproduct(item._id)}>
                                                <div className="imgBx">
                                                    <img src={item.file} className="h-100" alt='zoom' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
                <div className="px-3 onsale">
                    <section className="on-sale">
                        <div className="container-fluid">
                            <div className="title-box">
                                <h2>On Sale</h2>
                            </div>
                            <div className="row">
                                {sale.map((item, index) => (
                                    <div className="col-lg-3 col-md-6 my-3 mt-md-0">
                                        <div className="product-top">
                                            <div className="" onClick={() => viewproduct(item._id)}>
                                                <div className="imgBx">
                                                    <img src={item.file} className="h-100" alt='zoom' />
                                                </div>
                                            </div>
                                            <div className="product-botttom text-center mt-3">
                                                <h3>{item.product}</h3>
                                                <h5><b>₦</b> {item.price}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
                <div className="px-3 new-product">
                    <section className="new-product">
                        <div className="container-fluid">
                            <div className="title-box">
                                <h2>New Arrivals</h2>
                            </div>
                            <div className="row">
                                {files.map((item, index) => (
                                    <div className="col-lg-3 col-md-6 my-3 mt-md-0">
                                        <div className="product-top">
                                            <div className="" onClick={() => viewproduct(item._id)}>
                                                <div className="imgBx">
                                                    <img src={item.file} className="h-100" alt='zoom' />
                                                </div>
                                            </div>
                                            <div className="product-botttom text-center mt-3">
                                                <h5>{item.product}</h5>
                                                <h5><b>₦</b> {item.price}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
                <div className="px-3 website-feature">
                    <section className="website-feature">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-4 feature-box">
                                    <div className="imgBx">
                                        <img src={original} alt="zoom" />
                                        <div className="feature-text">
                                            <p><b>100% Original items </b>are available at our company.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 feature-box">
                                    <div className="imgBx">
                                        <img src={returnoninvestment} alt="zoom" />
                                        <div className="feature-text">
                                            <p><b>Return within 24 hours </b>of recieving your order.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 feature-box">
                                    <div className="imgBx">
                                        <img src={debitcard} alt="zoom" />
                                        <div className="feature-text">
                                            <p><b>Pay Online through multiple </b>options (card/Net banking)</p>
                                        </div>
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

export default Dashboard