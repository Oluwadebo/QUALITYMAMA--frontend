import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import { baseUrl } from "./endpoint";
import Navbar from './Navbar'
import go5 from "./asset/go5.jfif"
import sidebarbanner from "./asset/sidebar_banner_img.jpg"
import caro from "./asset/caro4.jpg"
import caro1 from "./asset/caro1.jpg"
import caro2 from "./asset/caro2.jpg"
import zoom from "./asset/zoom (1).jpg"
import zoom1 from "./asset/zoom (2).jpg"
import zoom3 from "./asset/zoom (4).jpg"
import zoom4 from "./asset/zoom (5).jpg"
import original from "./asset/original.png"
import returnoninvestment from "./asset/return-on-investment.png"
import debitcard from "./asset/debit-card.png"
import streetwear from "./asset/street wear design t-shirt.jpg"
import Footer from './Footer';

const Dashboard = () => {
    const navigate = useNavigate();
    // const [customers, setcustomers] = useState([])
    const [files, setfiles] = useState([])
    // const [cart, setcart] = useState([])
    // const customer = localStorage.customer;
    // const customerId = localStorage.customerId;

    useEffect(() => {
        axios.get(`${baseUrl}goods`).then((data) => {
            if (data) {
                setfiles(data.data.result);
            }
        })
    }, [])

    // const addtocart = (val) => {
    //     if (customer) {
    //         axios.get(`${baseUrl}dashboard`,
    //             {
    //                 headers: {
    //                     "Authorization": `Bearer ${customer}`,
    //                     "Content-type": "application/json",
    //                     "Accept": "application/json"
    //                 }
    //             }).then((data) => {
    //                 if (data) {
    //                     let Err = data.data.message;
    //                     if (Err == "Valid Token") {
    //                         setcustomers(data.data.result[0]);
    //                         localStorage.customerId = data.data.result[0]._id
    //                         axios.post(`${baseUrl}addtocart`, { val, customerId })
    //                     } else {
    //                         localStorage.removeItem('customer')
    //                         localStorage.removeItem('customerId')
    //                         navigate("/Registration")
    //                     }
    //                 }
    //             })
    //     } else {
    //         navigate("/Registration")
    //     }
    // }
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
                                <img src={caro} className="w-100" alt="..." />
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <div className="imggi">
                                <img src={caro1} className="w-100" alt="..." />
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <div className="imggi">
                                <img src={caro2} className="w-100" alt="..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <section className="feature-categories">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={zoom} alt="zoom" />
                                </div>
                                <div className="col-md-4">
                                    <img src={zoom4} alt="zoom" />
                                </div>
                                <div className="col-md-4">
                                    <img src={zoom1} alt="zoom" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className=" onsale">
                    <section className="on-sale">
                        <div className="container-fluid">
                            <div className="title-box">
                                <h2>On Sale</h2>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6 my-3 mt-md-0">
                                    <div className="product-top">
                                        <div className="imgBx">
                                            <img src={zoom3} className="h-100" alt='zoom' />
                                            <div className="overlay-right">
                                                <button type="button" className="btn btn-secondary" title="view product">
                                                    <i className="fa fa-eye"></i>
                                                </button>
                                                <button type="button" className="btn btn-secondary" title="Add to wish list">
                                                    <i className="fa fa-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-botttom text-center">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-half"></i>
                                        <h3>HeadPhone</h3>
                                        <h5>$40.00</h5>
                                        <button type="submit" className="default-btn btn-bg-two"><a href="#">Shop Now</a></button>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 my-3 mt-md-0">
                                    <div className="product-top">
                                        <div className="imgBx">
                                            <img src={go5} alt="zoom" />
                                            <div className="overlay-right">
                                                <button type="button" className="btn btn-secondary" title="view product">
                                                    <i className="fa fa-eye"></i>
                                                </button>
                                                <button type="button" className="btn btn-secondary" title="Add to wish list">
                                                    <i className="fa fa-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-botttom text-center">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <h3>Men Dress</h3>
                                        <h5>$70.00</h5>
                                        <button type="submit" className="default-btn btn-bg-two"><a href="#">Shop Now</a></button>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 my-3 mt-md-0">
                                    <div className="product-top">
                                        <div className="imgBx">
                                            <img src={sidebarbanner} alt="zoom" />
                                            <div className="overlay-right">
                                                <button type="button" className="btn btn-secondary" title="view product">
                                                    <i className="fa fa-eye"></i>
                                                </button>
                                                <button type="button" className="btn btn-secondary" title="Add to wish list">
                                                    <i className="fa fa-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-botttom text-center">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <h3>Women Dress</h3>
                                        <h5>$60.00</h5>
                                        <button type="submit" className="default-btn btn-bg-two"><a href="#">Shop Now</a></button>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 my-3 mt-md-0">
                                    <div className="product-top">
                                        <div className="imgBx">
                                            <img src={streetwear} alt="zoom" />
                                            <div className="overlay-right">
                                                <button type="button" className="btn btn-secondary" title="view product">
                                                    <i className="fa fa-eye"></i>
                                                </button>
                                                <button type="button" className="btn btn-secondary" title="Add to wish list">
                                                    <i className="fa fa-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-botttom text-center">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-half"></i>
                                        <h3>Street wear design t-shirt</h3>
                                        <h5>$50.00</h5>
                                        <button type="submit" className="default-btn btn-bg-two"><a href="#">Shop Now</a></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="new-product">
                    <section className="new-product">
                        <div className="container-fluid">
                            <div className="title-box">
                                <h2>New Arrivals</h2>
                            </div>
                            <div className="row">
                                {files.map((item, index) => (
                                    <div className="col-lg-3 col-md-6 my-3 mt-md-0">
                                        <div className="product-top">
                                            <div className="imgBx">
                                                <img src={item.file} className="h-100" alt='zoom' />
                                                <div className="overlay-right">
                                                    <button type="button" className="btn btn-secondary" onClick={() => viewproduct(item._id)} title="view product">
                                                        <i className="fa fa-eye"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-secondary" title="Add to wish list">
                                                        <i className="fa fa-heart"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="product-botttom text-center mt-3">
                                                <h3><span className='float1'>{item.product}</span> <span className='float2'>{item.price}</span></h3><br /><br />
                                                <button type="submit" className="default-btn btn-bg-two"><a href={item.Link}>Shop Now</a></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
                <div className="website-feature">
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
                                            <p><b>Return within 30 days </b>of recieving your order.</p>
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