import React from 'react'
import { useEffect, useState } from "react";

const Footer = () => {
    const [privacy, setprivacy] = useState(false)
    const [Term, setTerm] = useState(false)
    const [Return, setReturn] = useState(false)
    let d = new Date();
    let year = d.getFullYear();
    const priv = () => {
        setprivacy(prev => true)
        setTerm(prev => false)
        setReturn(prev => false)
    }
    const Ter = () => {
        setprivacy(prev => false)
        setTerm(prev => true)
        setReturn(prev => false)
    }
    const Retur = () => {
        setprivacy(prev => false)
        setTerm(prev => false)
        setReturn(prev => true)
    }
    return (
        <>
            <div className="footer">
                <section className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 footer-image">
                                <div className="mb-3 mb-md-none">
                                    <h1 className="d-inline-flex align-items-center mb-2 text-decoration-none"><span className="fs-5" style={{ cursor: "pointer;" }}>Qualitymama</span></h1>
                                    <ul className="list-unstyled small">
                                        <li className="mb-2 text-light">Designed and built with all the love in the world by the <i>Stackcraft team</i> with the help of <b>God.</b>.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-4 col-md-3">
                                <h1>Useful Links</h1>
                                <p><span className='priv' onClick={priv} >Privacy Policy</span> <br />
                                    {privacy && (
                                        <span className='test'>We respect your privacy and are committed to protecting your personal information. We may collect contact and payment information to process orders and improve our services. We will not share your information with third parties except as necessary to provide services or as required by law. You may opt out of promotional emails and request deletion of personal information. Our full privacy policy can be found on our website. or <br /> please contact us at Stackcraft@gmail.com.
                                        </span>
                                    )}
                                </p>
                                <p><span className='priv' onClick={Ter} >Term of Use</span> <br />
                                    {Term && (
                                        <span className='test'>By using our ecommerce site, you agree to our terms of use. You must be 18 years or older to use our site. All content, including images, belongs to us or our partners. We are not liable for damages or losses caused by using our site or products. We reserve the right to change prices and products at any time. Please contact us with any concerns or questions.</span>
                                    )}
                                </p>
                                <p><span className='priv' onClick={Retur} >Return Policy</span> <br />
                                    {Return && (
                                        <span className='test'>We offer a 30-day return policy on all items purchased from our website. Items must be in their original packaging and unused condition. To initiate a return, please contact our customer support team. Shipping charges are non-refundable.</span>
                                    )}
                                </p>
                            </div>
                            <div className="col-4 col-md-3">
                                <h1>Companys</h1>
                                <p>About Us</p>
                                <p>Contact Us</p>
                            </div>
                            <div className="col-4 col-md-2 lni">
                                <h1>Follow Us On</h1>
                                <p><i className="fa fa-facebook"></i>Facebook</p>
                                <p><i className="fa fa-linkedin"></i>Linkedin</p>
                                <p><i className="fa fa-twitter"></i>Twitter</p>
                                <p><a href="https://wa.me/2348104495801" className='text-white'><i className="fa fa-whatsapp"></i> What's app </a></p>
                            </div>
                        </div>
                        <hr />
                        <p className="copyright text-center"> © {year} developed <i className="fa fa-heart"></i> by STACKCRAFT</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Footer