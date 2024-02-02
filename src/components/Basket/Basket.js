import React, { useEffect } from "react";
import "../../static/css/bootstrap.min.css"
import "../../static/css/templatemo-hexashop.css"


const Basket = (props) => {
    const { view, basket, changePage, removeFromBasket, changeQuantity } = props;
    const [totalPrice, setTotalPrice] = React.useState(0);

    useEffect(() => {
        if (basket.length) {
            // Calculate total quantity by summing the quantities of all items in the basket
            const fullPrice = basket.reduce((total, item) => total + item.price * item.quantity, 0);
            setTotalPrice(fullPrice);
        } else if (!basket.length) {
            setTotalPrice(0);
        }

    }, [basket]);

    return (
        <div style={{ position: "absolute", width: "60%", marginLeft: "-40%", display: view, minWidth: "400px" }} className="checkout-items basket">
            <nav style={{ display: "flex", justifyContent: "left", alignItems: "center", padding: "5px" }}>
                <h6 style={{ marginLeft: "5%" }}>{basket ? basket.length : 0} {basket && basket.length === 1 ? "Item" : "Items"}</h6>
            </nav>
            <div className="item-body">
                {basket.length ? basket.filter((item) => item.id).map((item) => {
                    return (
                        <div key={item.id} className="item">
                            <img src={item.thumbnail} />
                            <div className="item-content">
                                <p><span><b>£{item.price * item.quantity}</b></span></p>
                                <p><span>{item.description.length > 50 ? item.description.substring(0, 50).trim() + "..." : item.description}</span></p>
                                <p><span>Qty: <b>{item.quantity}</b></span></p>
                                <span><p style={{display: "flex"}}><span className="quantity-btn" onClick={() => changeQuantity(item.id, "-")} style={{ cursor: "pointer" }}>-</span><span className="quantity-btn" onClick={() => changeQuantity(item.id, "+")} style={{ marginLeft: "3%", cursor: "pointer" }}>+</span></p>
                                <p onClick={() => removeFromBasket(item.id)} style={{ color: "red", cursor: "pointer" }} >x</p></span>
                            </div>
                        </div>
                    )
                }) : null}
            </div>

            <div className="checkout-cost">
                <p><span><b>TOTAL TO PAY:</b><span> £{totalPrice}</span></span></p>
            </div>
            <button onClick={() => changePage("checkout")} className="btn btn-dark">Checkout</button>
        </div>
    )
}

export default Basket
