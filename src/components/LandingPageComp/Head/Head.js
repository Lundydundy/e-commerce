import React from "react";
import "../../../static/css/bootstrap.min.css"
import "../../../static/css/templatemo-hexashop.css"
import leftBanner from "../../../static/images/left-banner-image.jpg"
import bannerRight1 from "../../../static/images/baner-right-image-01.jpg"
import bannerRight2 from "../../../static/images/baner-right-image-02.jpg"
import bannerRight3 from "../../../static/images/baner-right-image-03.jpg"
import bannerRight4 from "../../../static/images/baner-right-image-04.jpg"



const Head = (props) => {

    const {changePage} = props;
    return (
        <div className="main-banner" id="top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="left-content">
                            <div className="thumb">
                                <div className="inner-content">
                                    <h4>We Are Hexashop</h4>
                                    <span>The only online store you'll ever need</span>
                                    <div className="main-border-button">
                                        <a href="#" onClick={()=>changePage("products")}>Purchase Now!</a>
                                    </div>
                                </div>
                                <img src={leftBanner} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="right-content">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="right-first-image">
                                        <div className="thumb">
                                            <div className="inner-content">
                                                <h4>Women</h4>
                                                <span>Best Clothes For Women</span>
                                            </div>
                                            <div className="hover-content">
                                                <div className="inner">
                                                    <h4>Women</h4>
                                                    <p>Find your seasonal style with these amazing brands.</p>
                                                    <div className="main-border-button">
                                                        <a href="#" onClick={()=>changePage("productsW")}>Discover More</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <img src={bannerRight1}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="right-first-image">
                                        <div className="thumb">
                                            <div className="inner-content">
                                                <h4>Men</h4>
                                                <span>Best Clothes For Men</span>
                                            </div>
                                            <div className="hover-content">
                                                <div className="inner">
                                                    <h4>Men</h4>
                                                    <p>Find your perfect match, shirt, tie or pants.</p>
                                                    <div className="main-border-button">
                                                        <a href="#" onClick={()=>changePage("productsM")}>Discover More</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <img src={bannerRight2}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="right-first-image">
                                        <div className="thumb">
                                            <div className="inner-content">
                                                <h4>Shoes</h4>
                                                <span>Best Quality Shoes Around</span>
                                            </div>
                                            <div className="hover-content">
                                                <div className="inner">
                                                    <h4>Shoes</h4>
                                                    <p>Fashionable styles for you are only a click away.</p>
                                                    <div className="main-border-button">
                                                        <a href="#" onClick={()=>changePage("productsS")}>Discover More</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <img src={bannerRight3}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="right-first-image">
                                        <div className="thumb">
                                            <div className="inner-content">
                                                <h4>Accessories</h4>
                                                <span>Best Trend Accessories</span>
                                            </div>
                                            <div className="hover-content">
                                                <div className="inner">
                                                    <h4>Accessories</h4>
                                                    <p>Mix, match and style with these beautiful accessories</p>
                                                    <div className="main-border-button">
                                                        <a onClick={()=>changePage("productsA")} href="#">Discover More</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <img src={bannerRight4}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Head