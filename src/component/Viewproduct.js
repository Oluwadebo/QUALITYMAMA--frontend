import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Footer from './Footer'
import axios from 'axios';
import { baseUrl } from "./endpoint";
import Navbar from './Navbar'

const Viewproduct = () => {
    const navigate = useNavigate();
    const customer = localStorage.customer;
    const ViewproductId = localStorage.Viewproduct;
    const [product, setproduct] = useState([])
    useEffect(() => {
        if (ViewproductId) {
            axios.post(`${baseUrl}Viewproduct`, { ViewproductId }).then((data) => {
                if (data) {
                    setproduct(data.data.result);
                }
            })
        } else {
            navigate("/")
        }
    }, [])
    // const addtocart = (val) => {
    //     if (customer) {
    //         // console.log(val);
    //     } else {
    //         navigate("/Registration")
    //     }
    // }

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-5 pt-1 mb-4 p-0 m-0">
                <div className="">
                    <section className="single-product">
                        <div className="container">
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
                                        <div className="title-box">
                                            <h2 className='text-white'>Details</h2>
                                        </div>
                                        <h2>{item.product}</h2>
                                        <p>Product Code: {item._id}</p>
                                        <h5 className='float'>{item.description}</h5>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <p className="price">{item.price}</p>
                                        <p><b>Availability:</b> In Stock</p>
                                        {/* <button type="button" className="btn btn-primary" onClick={() => addtocart(item._id)}>Add to Cart</button> */}
                                        <button type="submit" className="default-btn btn-bg-two"><a href={item.Link}>Add to Cart</a></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Viewproduct