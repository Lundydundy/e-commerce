import React from "react";
import Navigation from "../../components/Navigation/Navigation"
import Footer from "../../components/Footer/Footer";
import "../../static/css/bootstrap.min.css"
import "../../static/css/templatemo-hexashop.css"
import Carousel from "react-multi-carousel";

const ProductViewPage = ({changeQuantity, changeUser, product, changePage, page, signIn, user, addToBasket, basket, removeFromBasket, handleLogOut }) => {

    const [quantity, setQuantity] = React.useState(1);
    const [details, setDetails] = React.useState("");
    
    const handleClick = (setting) => {
        setting === "add" ? setQuantity(quantity + 1) : (quantity > 0 ? setQuantity(quantity - 1) : setQuantity(0));
    }

    const handleInput = (e) => {
        console.log(e.target.value);
        setDetails(e.target.value);
    }
    
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
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

    return (
        <div>
            <Navigation changeQuantity={changeQuantity} removeFromBasket={removeFromBasket} signIn={signIn} changePage={changePage} page={page} user={user} basket={basket} handleLogOut={handleLogOut} changeUser={changeUser}/>
            <section className="section" id="product">
                <div className="container">
                    <div className="row">
                        <div style={{padding: "0 0 10px 0"}} className="col-lg-8">
                            <Carousel responsive={responsive} infinite={true}>
                                {product.images.map((image, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={image} alt="" />
                                        </div>
                                    )
                                })}
                            </ Carousel>
                        </div>
                        <div className="col-lg-4">
                            <div className="right-content">
                                <h4>{product.title}</h4>
                                <span className="price">${product.price}</span>
                                <ul className="stars">
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                    <li><i className="fa fa-star"></i></li>
                                </ul>
                                <span>{product.description}</span>
                                <span><textarea onChange={handleInput} placeholder="Add details eg color, size, etc" style={{width: "100%", minHeight:"100px"}}/></span>
                              
                                <div className="quantity-content">
                                    <div className="left-content">
                                        <h6>No. of Orders</h6>
                                    </div>
                                    <div className="right-content">
                                        <div className="quantity buttons_added">
                                            <input onClick={() => handleClick("minus")} type="button" value="-" className="minus" /><input style={{cursor: "pointer"}} readOnly={true} type="number" step="1" min="0"
                                                max="" name="quantity" value={quantity} title="Qty" className="input-text qty text"
                                                size="4" pattern="" inputMode="" ></input><input onClick={() => handleClick("add")} type="button" value="+" className="plus" />
                                        </div>
                                    </div>
                                </div>
                                <div className="total">
                                    <h4>Total: ${product.price * Math.round(quantity, 2)}</h4>
                                    <div onClick={quantity > 0 ? () => addToBasket(product, parseInt(quantity), details) : null} className="main-border-button"><a href="#">Add To Cart</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ProductViewPage