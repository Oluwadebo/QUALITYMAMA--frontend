import React from 'react'
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import logo from "./asset/logo.png"
import axios from 'axios';
import { baseUrl } from "./endpoint";

const Navbar = () => {
    const navigate = useNavigate();
    const [top, settop] = useState("")
    const [dis, setdis] = useState(false)
    const [searchInput, setSearchInput] = useState('');
    const [files, setfiles] = useState([])
    const [first, setfirst] = useState(false)
    const [car, setcar] = useState();
    const [tru, settru] = useState(false)
    const customer = localStorage.customer;
    const customerId = localStorage.customerId;

    // const [filteredProducts, setfilteredProducts] = useState([])

    const scrollup = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        if (customer) {
            setfirst(prev => true)
        }
        axios.get(`${baseUrl}goods`).then((data) => {
            if (data) {
                setfiles(data.data.result);
            }
        })
        axios.post(`${baseUrl}getaddtocart`, { id: customerId }).then((data) => {
            if (data) {
                const da = data.data.result;
                setcar(da.length);
                if (da.length > 0) {
                    settru(prev => true)
                }
            }
        })
    }, [])

    const handleSearch = () => {
        const filteredProduct = files.filter((val) =>
            val.product.toLowerCase().includes(searchInput.toLowerCase())
        );
        console.log(filteredProduct);
        // setfilteredProducts(filteredProduct)
        settop(filteredProduct.map((val, index) => {
            return (val.file)
        }));
        setdis(prev => true)
    }

    const logout = () => {
        localStorage.removeItem('customer')
        localStorage.removeItem('Admin')
        localStorage.removeItem('adminId')
        navigate("/Registration")
    }
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-light fixed-top coles">
                    <div className="container-fluid">
                        <a className="navbar-brand">
                            <img src={logo} alt="amaricanexpress" className="logo" />
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarText"
                            aria-controls="navbarText"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <input type="text" className="form-control sty d-none d-lg-block cash" placeholder='search' onChange={(e) => setSearchInput(e.target.value)} />
                                <span className="input-group-text d-none d-lg-block" onClick={handleSearch}><i className="fa fa-search"></i></span>
                            </ul>
                            <div className="col-12 col-md-8 text-md-end">
                                <Link
                                    to="/"
                                    className='cart stye'
                                >
                                    <span>
                                        <i className="fa fs-5 fa-dashboard mx-md-4 mx-3"> Home</i>
                                    </span>
                                </Link>
                                <Link
                                    to="/Addtocart"
                                    className='cart stye'
                                >
                                    <span>
                                        <i className="fa fs-5 fa-shopping-basket mx-md-4 mx-3 position-relative">  <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
                                            {tru && (
                                                <div className="">
                                                    {car}
                                                </div>
                                            )}
                                        </span> <span> Cart</span></i>
                                    </span>
                                </Link>
                                {/* <Link
                                    to="/Ordered"
                                    className='cart stye'
                                >
                                    <span>
                                        <i className="fa fs-5 fa-orders mx-md-4 mx-3"> Orders</i>
                                    </span>
                                </Link> */}
                                {/* <Link
                                    to="/Admin"
                                    className='cart stye'
                                >
                                    <span>
                                        <i className="fa fs-5 fa-address-card mx-md-4 mx-3"> Admin </i>
                                    </span>
                                </Link> */}
                                {!first && (
                                    <span>
                                        <i className="fa fs-5 fa-sign-in mx-md-4 mx-3 my-3 my-md-0 stye" onClick={logout}> Log In </i>
                                    </span>
                                )}
                                {first && (
                                    <span>
                                        <i className="fa fs-5 fa-sign-out mx-md-4 mx-3 my-3 my-md-0 stye" onClick={logout}> Log Out </i>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="">
                    <button onClick={scrollup} className="fa fa-angle-up scr"></button>
                </div>
            </div>
        </>
    )
}

export default Navbar