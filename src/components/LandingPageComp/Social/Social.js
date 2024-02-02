import React from "react"
import "../../../static/css/bootstrap.min.css"
import "../../../static/css/templatemo-hexashop.css"
import insta1 from "../../../static/images/instagram-01.jpg"
import insta2 from "../../../static/images/instagram-02.jpg"
import insta3 from "../../../static/images/instagram-03.jpg"
import insta4 from "../../../static/images/instagram-04.jpg"
import insta5 from "../../../static/images/instagram-05.jpg"
import insta6 from "../../../static/images/instagram-06.jpg"
import IconInstagram from "../../InstagramIcon/InstagramIcon"


const Social = () => {
    return(
        <section className="section" id="social">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-heading">
                        <h2>Social Media</h2>
                        <span>Details to details is what makes Hexashop different from the other themes.</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row images">
                <div className="col-2">
                    <div className="thumb">
                        <div className="icon">
                            <a href="http://instagram.com">
                                <h6>Fashion</h6>
                                <i><IconInstagram  /></i>
                            </a>
                        </div>
                        <img src={insta1} alt=""/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="thumb">
                        <div className="icon">
                            <a href="http://instagram.com">
                                <h6>New</h6>
                                <i><IconInstagram  /></i>
                            </a>
                        </div>
                        <img src={insta2} alt=""/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="thumb">
                        <div className="icon">
                            <a href="http://instagram.com">
                                <h6>Brand</h6>
                                <i><IconInstagram  /></i>
                            </a>
                        </div>
                        <img src={insta3} alt=""/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="thumb">
                        <div className="icon">
                            <a href="http://instagram.com">
                                <h6>Makeup</h6>
                                <i><IconInstagram  /></i>
                            </a>
                        </div>
                        <img src={insta4} alt=""/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="thumb">
                        <div className="icon">
                            <a href="http://instagram.com">
                                <h6>Leather</h6>
                                <i><IconInstagram  /></i>
                            </a>
                        </div>
                        <img src={insta5} alt=""/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="thumb">
                        <div className="icon">
                            <a href="http://instagram.com">
                                <h6>Bag</h6>
                                <i><IconInstagram  /></i>
                            </a>
                        </div>
                        <img src={insta6} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Social