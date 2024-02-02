import React from "react";
import "../../../static/css/bootstrap.min.css"
import "../../../static/css/templatemo-hexashop.css"
import logo from "../../../static/images/logo.png"


const CheckoutNav = (props) => {

  const {changePage} = props;
    return (
        <nav>
          <div className="header-container">
            <a  className="logo">
              <img onClick={()=>changePage("landing")} src={logo} alt="Logo" />
            </a>
            <h2>Checkout</h2>
          </div>
        </nav>
    );
  };

  export default CheckoutNav