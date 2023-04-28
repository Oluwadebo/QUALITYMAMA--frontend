import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Ordered = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid mt-5 pt-1 mb-4 p-0 m-0">
                <div className="">
                    <div className="px-2 new-product">
                        <div className="p-2 card">
                            <h5>Ordered product</h5>
                            <div className="row">
                                {/* {DisrecentlyViewed.map((item, index) => (
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
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Ordered