import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Footer from './Footer'
import axios from 'axios';
import { baseUrl } from "./endpoint";
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./Data";

const Viewproduct = () => {
    const navigate = useNavigate();
    const Params = useParams()
    let va = Params;
    const customer = localStorage.customer;
    const ViewproductId = localStorage.Viewproduct;
    const storedData = localStorage.myData;
    const [product, setproduct] = useState([])
    const [customers, setcustomers] = useState([])
    const customerId = localStorage.customerId;
    const [message, setmessage] = useState("")
    const [messdiv, setmessdiv] = useState(false)
    const [Disrecently, setDisrecently] = useState(false)
    const [files, setfiles] = useState([])
    const [viewed, setviewed] = useState([])
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [DisrecentlyViewed, setDisRecentlyViewed] = useState([]);
    const [information, setinformation] = useState("");
    const [Additionalinformation, setAdditionalinformation] = useState(false)

    useEffect(() => {
        if (ViewproductId) {
            setAdditionalinformation(prev => false)
            axios.post(`${baseUrl}Viewproduct`, { ViewproductId }).then((data) => {
                if (data) {
                    setproduct(data.data.result);
                    let res = data.data.result[0].selectedOption
                    if (res === "infomation") {
                        setAdditionalinformation(prev => true)
                    }
                    const viewedProducts = JSON.parse(localStorage.getItem('RecentlyviewedProducts')) || [];
                    setRecentlyViewed(viewedProducts);
                    axios.post(`${baseUrl}Recentlyviewed`, viewedProducts).then((data) => {
                        if (data) {
                            setDisRecentlyViewed(data.data.products);
                            setDisrecently(prev => true)
                        }
                    })
                    const Similarity = data.data.result[0].selectedOption;
                    axios.post(`${baseUrl}Similarity`, { Similarity }).then((data) => {
                        if (data) {
                            setfiles(data.data.result);
                        }
                    })
                }
            })
        } else {
            if (va.id) {
                localStorage.Viewproduct = va.id;
                let vad = va.id
                const updatedRecentlyViewedProducts = [vad, ...recentlyViewed.filter((id) => id !== vad)].slice(0, 9);
                localStorage.setItem('RecentlyviewedProducts', JSON.stringify(updatedRecentlyViewedProducts));
                setRecentlyViewed(updatedRecentlyViewedProducts);
                window.location.reload()
            } else {
                navigate("/")
            }
        }
    }, [ViewproductId])

    const addtocart = (val) => {
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
                            setcustomers(data.data.result[0]);
                            localStorage.customerId = data.data.result[0]._id
                            axios.post(`${baseUrl}addtocart`, { val, customerId, information }).then((data) => {
                                if (data) {
                                    let mess = data.data.message;
                                    if (mess == "add-to-cart successfuly") {
                                        setmessage(mess)
                                        setmessdiv(prev => true)
                                        setTimeout(() => {
                                            setmessdiv(prev => false)
                                            setmessage("")
                                        }, 5000);
                                    }
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
    }

    const viewproduct = (val) => {
        if (val) {
            localStorage.Viewproduct = val
            const updatedRecentlyViewedProducts = [val, ...recentlyViewed.filter((id) => id !== val)].slice(0, 6);
            localStorage.setItem('RecentlyviewedProducts', JSON.stringify(updatedRecentlyViewedProducts));
            setRecentlyViewed(updatedRecentlyViewedProducts);
            navigate(`/Viewproduct/${val}`)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-5 pt-1 mb-4 p-0 m-0">
                <div className="">
                    <section className="single-product">
                        <div className="container-fluid px-2">
                            <div className="card p-2">
                                {product.map((item, index) => (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="product-top">
                                                <div className="imgBx">
                                                    <img src={item.file} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="title-box mt-2 mt-md-0">
                                                <h5 className='text-white'>Details</h5>
                                            </div>
                                            <h5>{item.product}</h5>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i> <br /><hr />
                                            <h5 className='float'> {item.description}</h5>
                                            <p><span className="price"> <b>₦</b> {item.price} </span><br />
                                                <span className="prices"><del>{item.Pprice}</del></span></p>
                                            {Additionalinformation && (
                                                <div className="">
                                                    <h5 className="float">Additional information</h5>
                                                    <textarea rows="1" className='Cart-input' placeholder="Size,length,colour,e.t.c" onChange={(e) => setinformation(e.target.value)}></textarea><br />
                                                </div>
                                            )}
                                            {messdiv && (
                                                <div className="alert alert-info text-center" role="alert">{message}</div>
                                            )}
                                            <button type="button" className="default-btn btn-bg-two" onClick={() => addtocart(item._id)}>Add to Cart</button>
                                            {/* <button type="submit" className="default-btn btn-bg-two"><a href={item.Link}>Add to Cart</a></button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <div className="px-2 newsproduct">
                        <div className="container-fluid card p-2 mb-2">
                            <div className="title-box">
                                <h2 className='text-white'>Similar</h2>
                            </div>
                            <Carousel showDots={false} responsive={responsive}>
                                {files.map((item, index) => (
                                    <div className="cards scal" onClick={() => viewproduct(item._id)}>
                                        <img className="product--image" src={item.file} alt="product image" />
                                        <div className="cardsp py-1">
                                            <p>{item.product} <br /> <span className="price"><b>₦</b> {item.price}<br /><del>{item.Pprice}</del></span></p>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        {Disrecently && (
                            <div className="card">
                                <div className="p-2">
                                    <div className="title-box">
                                        <h5 className='text-white pt-1'>Recently Viewed</h5>
                                    </div>
                                    <Carousel showDots={false} responsive={responsive}>
                                        {DisrecentlyViewed.map((item, index) => (
                                            <div className="cards scal" onClick={() => viewproduct(item._id)}>
                                                <img className="product--image" src={item.file} alt="product image" />
                                                <div className="cardsp py-1">
                                                    <p>{item.product} <br /> <span className="price"><b>₦</b> {item.price}<br /><del>{item.Pprice}</del></span></p>
                                                </div>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Viewproduct