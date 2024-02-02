import React from "react";
import "../../../static/css/bootstrap.min.css"
import "../../../static/css/templatemo-hexashop.css"
import women1 from "../../../static/images/women-01.jpg"
import women2 from "../../../static/images/women-02.jpg"
import women3 from "../../../static/images/women-03.jpg"
import women4 from "../../../static/images/women-04.jpg"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "tachyons";


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


const WomenLatest = (props) => {

    const { products, changeProduct } = props;
    return (
        <section className="section" id="women">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-heading">
                            <h2>Women's Latest</h2>
                            <span>Latest fashionable brands for all your needs.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="women-item-carousel">
                            <div className="owl-women-item owl-carousel">
                                <Carousel responsive={responsive} infinite={true}>
                                    {products.map((product) => {
                                        return (
                                            <a key={product.id} onClick={() => changeProduct(product.id, "productView")} >
                                                <div className="item grow pointer">
                                                    <div className="thumb">
                                                        <img src={product.thumbnail} alt="" />
                                                    </div>
                                                    <div className="down-content">
                                                        <h4>{product.title}</h4>
                                                        <span>${product.price}</span>
                                                        <ul className="stars">
                                                            <li><i className="fa fa-star"></i></li>
                                                            <li><i className="fa fa-star"></i></li>
                                                            <li><i className="fa fa-star"></i></li>
                                                            <li><i className="fa fa-star"></i></li>
                                                            <li><i className="fa fa-star"></i></li>
                                                        </ul>
                                                    </div>
                                                </div></a>)
                                    })}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default WomenLatest