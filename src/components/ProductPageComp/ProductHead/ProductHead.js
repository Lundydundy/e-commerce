import React from "react";
import "../../../static/css/bootstrap.min.css"
import "../../../static/css/templatemo-hexashop.css"


const ProductHead = (props) => {

    const { page } = props;
    return (
        <div className="page-heading" id="top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="inner-content">
                            <h2>{page === "productsW" ? "Women" : (page === "productsA" ? "Accessories" : (page === "productsS" ? "Shoes" : ( page === "productsM" ? "Men" : "All")))}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductHead
