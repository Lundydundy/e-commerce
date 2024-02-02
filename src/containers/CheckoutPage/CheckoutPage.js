import React from "react";
import "../../static/css/bootstrap.min.css"
import "../../static/css/templatemo-hexashop.css"
import CheckoutNav from "../../components/CheckoutPageComp/CheckoutNav/CheckoutNav";
import Items from "../../components/CheckoutPageComp/Items/Items";
import Delivery from "../../components/CheckoutPageComp/Delivery/Delivery";


const CheckoutPage = (props) => {
    const {changeQuantity, basket, changePage, removeFromBasket} = props;

    const [delivery, setDelivery] = React.useState(0);

    const changeDelivery = (delivery) => {
        setDelivery(delivery);
    }
    return (
        <div className="checkout-page">
            <CheckoutNav changePage={changePage}/>
            <div className="container">
                <Delivery changeDelivery={changeDelivery}/>
                <Items changeQuantity={changeQuantity} removeFromBasket={removeFromBasket} delivery={delivery} changePage={changePage} basket={basket}/>
            </div>
        </div>
    );
};

export default CheckoutPage;