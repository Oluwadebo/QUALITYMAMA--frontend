import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import { baseUrl } from "./endpoint";
import Navbar from './Navbar'
import caro1 from "./asset/caro1.jpg"
import caro2 from "./asset/caro2.jpg"
import caro6 from "./asset/caro6.jpg"
import original from "./asset/original.png"
import returnoninvestment from "./asset/return-on-investment.png"
import debitcard from "./asset/debit-card.png"
import Footer from './Footer';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./Data";

const Dashboard = () => {
    const navigate = useNavigate();
    const [files, setfiles] = useState([])
    const [sale, setsale] = useState([])
    const [fashion, setfashion] = useState([])
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [Carouse, setCarouse] = useState([])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        axios.get(`${baseUrl}goods`).then((data) => {
            if (data) {
                const viewedProducts = JSON.parse(localStorage.getItem('RecentlyviewedProducts')) || [];
                setRecentlyViewed(viewedProducts);
                let bof = data.data.result;
                let Carous = "Carouse"
                setfiles(bof.filter(bof => bof.selectedOption !== Carous));
                // bof.filter((id) => id !== Carouse)
                // console.log(bof.filter(bof => bof.selectedOption !== Carous));
                // let dat = new Date().toLocaleDateString()
                // bof.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
                // console.log(bof.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)));
                // console.log(bof.sort((a, b) => new Date(a.dateAdded).toLocaleDateString()-new Date(b.dateAdded).toLocaleDateString()));
                let Onsale = "Onsale"
                axios.post(`${baseUrl}onsale`, { Onsale }).then((data) => {
                    if (data) {
                        setsale(data.data.result)
                        let fashio = "fashion"
                        axios.post(`${baseUrl}fashion`, { fashio }).then((data) => {
                            if (data) {
                                setfashion(data.data.result)
                                let Carous = "Carouse"
                                axios.post(`${baseUrl}Carouse`, { Carous }).then((data) => {
                                    if (data) {
                                        setCarouse(data.data.result)
                                    }
                                })
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
            const updatedRecentlyViewedProducts = [val, ...recentlyViewed.filter((id) => id !== val)].slice(0, 9);
            localStorage.setItem('RecentlyviewedProducts', JSON.stringify(updatedRecentlyViewedProducts));
            setRecentlyViewed(updatedRecentlyViewedProducts);
            navigate(`/Viewproduct/${val}`)
        }
    }

    const ategory = (vals) => {
        navigate(`/Category/${vals}`)
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-5 pt-3 mb-4 p-0 m-0">
                <div className="container-fluid">
                    <section className='header'>
                        <div className="row">
                            <div className="col-md-2 bor d-none d-md-block">
                                <ul>
                                    <li onClick={() => ategory("Male Fashion & Apparel")}>Male Fashion & Apparel</li>
                                    <li onClick={() => ategory("Female Fashion & Apparel")}>Female Fashion & Apparel</li>
                                    <li onClick={() => ategory("Beauty & Personal Care")}>Beauty & Personal Care</li>
                                    <li onClick={() => ategory("Sports-wear")}>Sports-wear</li>
                                    <li onClick={() => ategory("Lingerie")}>Lingerie</li>
                                    <li onClick={() => ategory("Phone & Accessories")}>Phone & Accessories</li>
                                    <li onClick={() => ategory("Footwear")}>Footwear</li>
                                    <li onClick={() => ategory("Books-media")}>Books-media</li>
                                    <li onClick={() => ategory("Hand-made")}>Hand-made</li>
                                    <li onClick={() => ategory("Furniture")}>Furniture</li>
                                    <li onClick={() => ategory("Other Category")}>Other Category</li>
                                </ul>
                            </div>
                            <div className="col-md-10">
                                <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="row">
                                            {Carouse.map((item, index) => (
                                                <div className="carousel-item active" data-bs-interval="2000">
                                                    <div className="imggi">
                                                        <img src={item.file} className="w-100" alt="..." />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
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
                <div className="px-3">
                    <section className="on-sale">
                        <div className="container-fluid card p-2">
                            <div className="title-box">
                                <h2>On Sale</h2>
                            </div>
                            <Carousel showDots={false} responsive={responsive}>
                                {sale.map((item, index) => (
                                    <div className="cards scal" onClick={() => viewproduct(item._id)}>
                                        <img className="product--image" src={item.file} alt="product" />
                                        <div className="cardsp py-1">
                                            <p>{item.product} <br /> <span className="price"><b>₦</b> {item.price}<br /><del>{item.Pprice}</del></span></p>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </section>
                </div>
                <div className="px-3">
                    <section className="new-product">
                        <div className="container-fluid card p-2">
                            <div className="title-box">
                                <h2>New Arrivals</h2>
                            </div>
                            <Carousel showDots={false} responsive={responsive}>
                                {files.map((item, index) => (
                                    <div className="cards scal" onClick={() => viewproduct(item._id)}>
                                        <img className="product--image" src={item.file} alt="product" />
                                        <div className="cardsp py-1">
                                            <p>{item.product} <br /> <span className="price"><b>₦</b> {item.price}<br /><del>{item.Pprice}</del></span></p>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
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