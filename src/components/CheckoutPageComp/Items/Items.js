import React, { useEffect } from "react";
import "../../../static/css/bootstrap.min.css"
import "../../../static/css/templatemo-hexashop.css"


const Items = (props) => {
    const { basket, delivery, removeFromBasket, changeQuantity } = props;
    const [totalPrice, setTotalPrice] = React.useState(0);
    
    useEffect(() => {

        if (basket.length) {
            // Calculate total quantity by summing the quantities of all items in the basket
            const fullPrice = basket.reduce((total, item) => total + item.price * item.quantity, 0);
            setTotalPrice(fullPrice);}
        else if (!basket.length) {
            setTotalPrice(0);
        
        }
    }, [basket]);
    
    return (
        <div className="checkout-items">
            <nav>
                <h6>{basket ? basket.length : 0} {basket && basket.length === 1 ? "Item" : "Items"}</h6>
            </nav>
            <div className="item-body">
                {
                    basket.map((item, index) => {
                        return (
                            <div key={item.id} className="item">
                                <img src={item.thumbnail} />
                                <div className="item-content">
                                    <p><span><b>£{item.price * item.quantity}</b></span></p>
                                    <p><span>{item.description.length > 50 ? item.description.substring(0, 50).trim() + "..." : item.description}</span></p>
                                    <p>Details: {item.details}</p>
                                    <p><span>Qty: <b>{item.quantity}</b></span></p><p style={{display: "flex"}}><span className="quantity-btn" onClick={()=> changeQuantity(item.id,"-")} style={{cursor: "pointer"}}>-</span><span className="quantity-btn" onClick={()=> changeQuantity(item.id,"+")}  style={{marginLeft: "3%", cursor: "pointer"}}>+</span></p><span onClick={() => removeFromBasket(item.id)} style={{ color: "red", cursor: "pointer", margin: "0 0 0 3px" }} >x</span>
                                </div>
                            </div>
                        )

                    })
                }
            </div>

            <div className="checkout-cost">
                <p><span>Subtotal:</span><span> £{totalPrice}</span></p>
                <p><span>Delivery:</span><span> £{delivery}</span></p>
                <p><span><b>TOTAL TO PAY:</b><span> £{totalPrice + delivery}</span></span></p>
            </div>
            <button disabled className="btn btn-dark">Pay</button>
        </div>
    )
}

export default Items
