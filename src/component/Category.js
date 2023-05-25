import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { responsive } from "./Data";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import { baseUrl } from "./endpoint";
import Navbar from './Navbar'
import Footer from './Footer'

const Category = () => {
    const navigate = useNavigate();
    const Params = useParams()
    let va = Params;
    let cat = va.selectedOption
    const customer = localStorage.customer;
    const ViewproductId = localStorage.Viewproduct;
    const [files, setfiles] = useState([])
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [Error, setError] = useState("")


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
        if (va.selectedOption) {
            axios.get(`${baseUrl}goods`).then((data) => {
                if (data) {
                    let bof = data.data.result;
                    let seen = bof.filter(bof => bof.selectedOption == cat);
                    if (seen != "") {
                        setfiles(seen);                        
                    }else{
                        setError("No Product for this Categories")
                    }
                }
            })
        }
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


    return (
        <>
            <Navbar />
            <div className="container-fluid mt-5 pt-1 mb-4 p-0 m-0">
                <div className="">
                    <div className="px-2 newsproduct">
                        <div className="container-fluid card p-2 mb-2">
                            <div className="title"><h4>{cat}</h4></div>
                            <div className="row">
                                <center>
                                    <p>{Error}</p>
                                </center>
                                {files.map((item, index) => (
                                    <div className="col-3">
                                        <div className="cards scal" onClick={() => viewproduct(item._id)}>
                                            <img className="product--image" src={item.file} alt="product image" />
                                            <div className="cardsp py-1">
                                                <p>{item.product} <br /> <span className="price"><b>₦</b> {item.price}<br /><del>{item.Pprice}</del></span></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Category