import React from "react"
import "../../static/css/bootstrap.min.css"
import "../../static/css/templatemo-hexashop.css"
import logo from "../../static/images/white-logo.png"

const Footer = (props) => {
    const {changePage} = props;
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="first-item">
                            <div className="logo">
                                <img src={logo} alt="hexashop ecommerce templatemo" />
                            </div>
                            <ul>
                                <li><a href="#">16501 Collins Ave, Sunny Isles Beach, FL 33160, United States</a></li>
                                <li><a href="#">hexashop@company.com</a></li>
                                <li><a href="#">010-020-0340</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h4>Shopping &amp; Categories</h4>
                        <ul>
                            <li><a onClick={() => changePage("productsM")}>Men’s Shopping</a></li>
                            <li><a onClick={() => changePage("productsW")}>Women’s Shopping</a></li>
                            <li><a onClick={() => changePage("productsA")}>Accessory Shopping</a></li>
                            <li><a onClick={() => changePage("productsS")}>Shoe Shopping</a></li>

                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><a onClick={() => changePage("landing")}>Homepage</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Help</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <h4>Help &amp; Information</h4>
                        <ul>
                            <li><a href="#">Help</a></li>
                            <li><a href="#">FAQ's</a></li>
                            <li><a href="#">Shipping</a></li>
                            <li><a href="#">Tracking ID</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-12">
                        <div className="under-footer">
                            <p>Copyright © 2024 HexaShop Co., Ltd. All Rights Reserved.</p>

                            <ul>
                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                <li><a href="#"><i className="fa fa-behance"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer