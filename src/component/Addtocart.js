import React from 'react'
import { useEffect, useState } from "react";
import Footer from './Footer'
import axios from 'axios';
import { baseUrl } from "./endpoint";
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const Addtocart = () => {
    const customer = localStorage.customer;
    const customerId = localStorage.customerId;
    const ViewproductId = localStorage.Viewproduct;
    const cart = localStorage.admin;
    const navigate = useNavigate();
    const [addtocart, setaddtocart] = useState([]);
    const [first, setfirst] = useState(true);
    const [car, setcar] = useState();
    const [dis, setdis] = useState(false)
    const [copied, setCopied] = useState(false);
    const [ifo, setifo] = useState([])
    const [admin, setadmin] = useState([]);
    const [Location, setLocation] = useState("");
    const [ERR, setERR] = useState(false)
    const [addtocartmes, setaddtocartmes] = useState(false)
    const [DisrecentlyViewed, setDisRecentlyViewed] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [Disrecently, setDisrecently] = useState(false)


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
                                    if (da == "") {
                                        setaddtocartmes(prev => false);
                                    } else {
                                        setaddtocartmes(prev => true);
                                    }
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

    }, [addtocart])
    useEffect(() => {
        const viewedProducts = JSON.parse(localStorage.getItem('RecentlyviewedProducts')) || [];
        setRecentlyViewed(viewedProducts);
        axios.post(`${baseUrl}Recentlyviewed`, viewedProducts).then((data) => {
            if (data) {
                setDisRecentlyViewed(data.data.products);
                setDisrecently(prev => true)
            }
        })
    }, [])


    const total = addtocart.forEach((val, index) => {
        sum = sum + parseFloat(val.price)
    });
    const handleSelectChange = (e) => {
        let selectedOpt = document.getElementById("selectOptions");
        setLocation(selectedOpt.value);
    };
    const display = () => {
        if (sum > 0) {
            if (Location != "") {
                setdis(prev => true)
                setERR(prev => false)
                setTimeout(() => {
                    setdis(prev => false)
                }, 60500);
            } else {
                setERR(prev => true)
            }
        }
    }
    const mailler = () => {
        if (customer) {
            const Name = ifo.Name
            const email = ifo.email
            const id = ifo._id
            let ordered = addtocart.map((val) => {
                let price = (val.price);
                let product = (val.product);
                let information = (val.information);
                let income = { price, product, information }
                return (income)
            });
            const allinfor = { Name, email, ordered, Location, id };
            axios.post(`${baseUrl}mail`, allinfor).then((data) => {
                if (data) {
                    let mes = data.data.message
                    if (mes == "Mailed send") {
                        axios.post(`${baseUrl}removecart`, { id }).then((data) => {
                            if (data) {
                                console.log(data);
                            }
                        })
                    }
                }
            })
        }
    }
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
                // window.location.reload()
            }
        })
    };
    const viewproduct = (val) => {
        if (val) {
            localStorage.Viewproduct = val
            const updatedRecentlyViewedProducts = [val, ...recentlyViewed.filter((id) => id !== val)].slice(0, 6);
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
                    <section className="new-product">
                        <div className="container-fluid">
                            {!addtocartmes && (
                                <div className="">
                                    <div className="card py-5">
                                        <center>
                                            <i className='fa fs-5 fa-shopping-basket'></i>
                                            <h5>Your cart is empty!</h5>
                                            <p>Browse our categories and discover our best deals!</p>
                                            <button type="button" className="default-btn btn-bg-two">
                                                <Link to="/" className='cart stye'>START SHOPPING</Link>
                                            </button>
                                        </center>
                                    </div>
                                    <div className="card my-2">
                                        <div className="p-2">
                                            <h5>Recently Viewed</h5>
                                            <div className="row">
                                                {DisrecentlyViewed.map((item, index) => (
                                                    <div className="col-lg-2 col-md-3 my-3 mt-md-0 scal">
                                                        <div className="producttop">
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
                                    </div>
                                </div>
                            )}
                            {addtocartmes && (
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <h4 className='card p-2'>Cart ({car})</h4>
                                            {!first && (
                                                <div className="row p-2">
                                                    {addtocart.map((item, index) => (
                                                        <div className="col-12 scal">
                                                            <div className="card mb-1">
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <div className="produ p-1">
                                                                            <div className="imgBx">
                                                                                <img src={item.file} className="h-100" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-7 col-6 pt-3">
                                                                        <h4 className='px-2'>{item.product}</h4>
                                                                        <h6 className='px-2'>{item.information}</h6>
                                                                    </div>
                                                                    <div className="col-md-3 col-6">
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
                                                    <div className="col-5">
                                                        <h5>Subtotal</h5>
                                                    </div>
                                                    <div className="col-7">
                                                        <h4 style={{ float: 'right', }}><b>₦</b> {sum}</h4>
                                                    </div>
                                                </div>
                                                <p>Delivery fees not included yet.</p>
                                                <label for="locations">Select your location:</label>
                                                {ERR && (
                                                    <p>
                                                        <b className="text-danger"><marquee className="card">Please Select your location</marquee></b>
                                                    </p>
                                                )}
                                                <select id="selectOptions" className="select" value={Location} onChange={(e) => handleSelectChange(e)}>
                                                    <option value="">Select your location</option>
                                                    <option value="Stadium">Stadium</option>
                                                    <option value="Sabo">Sabo</option>
                                                    <option value="Lautech">Lautech</option>
                                                    <option value="Under-G gate">Under-G gate</option>
                                                    <option value="Under-G">Under-G</option>
                                                    <option value="Lautech main gate">Lautech main gate</option>
                                                    <option value="Yoacco">Yoacco</option>
                                                    <option value="Akowonjo">Akowonjo</option>
                                                    <option value="Adenike">Adenike</option>
                                                </select>
                                            </div>
                                            <div className="card p-2">
                                                <button type="button" className="default-btn btn-bg-two" onClick={display}>CHECKOUT (₦ {sum})</button>
                                                {dis && (
                                                    <div className="card mt-1 p-1">
                                                        <h4>1664848694 <span style={{ float: 'right', }}><button className='butt mx-1' onClick={handleClick}>
                                                            {copied ? 'Copied!' : <i class="fa fa-copy"></i>}
                                                        </button></span> <br /> ACCESS BANK <br /> OGUNWE DEBO</h4>
                                                        <p>
                                                            <b className="text-danger"><marquee className="card">Please click on the button below, (only) after payment to Confirm transaction</marquee></b>
                                                        </p>
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