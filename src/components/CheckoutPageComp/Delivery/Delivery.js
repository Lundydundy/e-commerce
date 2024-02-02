import React from "react";
import "../../../static/css/bootstrap.min.css"
import "../../../static/css/templatemo-hexashop.css"


const Delivery = (props) => {
    const { changeDelivery } = props;
    return (
        <div className="delivery">
            <h5>Delivery Address</h5>
            <div className="address">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="House/Apt Number" />
                <input type="text" placeholder="Building Number" />
                <input type="text" placeholder="Street" />
                <input type="text" placeholder="City" />
                <input type="text" placeholder="Province" />
                <input type="text" placeholder="Country" />
                <input type="text" placeholder="Postcode" />
            </div>
            <h5>Delivery Options</h5>
            <div className="delivery-options">
                <div><input onClick={() => changeDelivery(0)} name="option" type="radio" defaultChecked></input><span> Economy 1-2 Weeks <b>+£0.00</b></span></div>
                <div><input onClick={() => changeDelivery(2)} name="option" type="radio"></input><span> Standard 3-5 Business Days <b>+£2.00</b></span></div>
                <div><input onClick={() => changeDelivery(6)} name="option" type="radio"></input><span> Express 1-2 Business Days <b>+£6.00</b></span></div>
                <div><input onClick={() => changeDelivery(13)} name="option" type="radio"></input><span> International 2-5 Weeks <b>+£13.00</b></span></div>
                <button className="btn btn-dark">Confirm</button>
            </div>

        </div>
    )
}

export default Delivery