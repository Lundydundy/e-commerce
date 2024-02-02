import React, { useEffect, useState } from "react";
import "../../../static/css/bootstrap.min.css"
import "../../../static/css/templatemo-hexashop.css"
import men1 from "../../../static/images/men-01.jpg"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "tachyons"

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


const Products = (props) => {
    const { products, changeProduct } = props;
    const productKeys = Object.keys(products);

    console.log("products:", products[productKeys[0]])

    return (
        <section className="section" id="products">
            {
                productKeys.map((product, i) => {
                    return (
                        <div key={i}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-heading">
                                            <h2>{product.split("-").join(" ").toUpperCase()}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <Carousel responsive={responsive} infinite={true}>
                                    { products[product].map((item) => {
                                        return (
                                            <div key={item.id} className="item grow pointer" onClick={() => changeProduct(item.id, "productView")}>
                                                <div className="thumb">

                                                    <img src={item.thumbnail} alt="" />
                                                </div>
                                                <div className="down-content">
                                                    <h4>{item.title}</h4>
                                                    <span>${item.price}</span>
                                                    <ul className="stars">
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><i className="fa fa-star"></i></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Carousel>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}


// 


//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//         </ Carousel>
//     </div>

//     <div className="container">
//         <div className="row">
//             <div className="col-lg-12">
//                 <div className="section-heading">
//                     <h2>Pants</h2>
//                 </div>
//             </div>
//         </div>
//     </div>
//     <div className="container">
//         <Carousel responsive={responsive} infinite={true}>

//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//         </ Carousel>
//     </div>
//     <div className="container">
//         <div className="row">
//             <div className="col-lg-12">
//                 <div className="section-heading">
//                     <h2>Shoes</h2>
//                 </div>
//             </div>
//         </div>
//     </div>
//     <div className="container">
//         <Carousel responsive={responsive} infinite={true}>
//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="item grow">
//                 <div className="thumb">

//                     <img src={men1} alt="" />
//                 </div>
//                 <div className="down-content">
//                     <h4>classNameic Spring</h4>
//                     <span>$120.00</span>
//                     <ul className="stars">
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                         <li><i className="fa fa-star"></i></li>
//                     </ul>
//                 </div>
//             </div>
//         </ Carousel>
//     </div>

// </section >


export default Products