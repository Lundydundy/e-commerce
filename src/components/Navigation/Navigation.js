import React, { useEffect, useState } from "react";
import logo from "../../static/images/logo.png"
import Basket from "../Basket/Basket";
import "../../static/css/bootstrap.min.css"
import "../../static/css/templatemo-hexashop.css"


const Navigation = (props) => {

    const { changeQuantity, changePage, page, signIn, changeUser, user, basket, removeFromBasket, handleLogOut } = props;

    const [basketView, setBasketView] = useState("none");
    const [menuDisplay, setMenuDisplay] = useState("none")
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [scrollHeight, setScrollHeight] = useState(window.scrollY)
    
    const handleClick = () => {
        basketView === "none" ? setBasketView("flex") : setBasketView("none")
    }

    const handleMenuClick = () => {
        menuDisplay === "none" ? setMenuDisplay("flex") : setMenuDisplay("none")
    }

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
        setScrollHeight(document.body.scrollTop)
    }

    useEffect(() => {
        document.body.addEventListener("scroll", handleResize)   
        window.addEventListener("resize", handleResize) 
    }, [])

    console.log(user, windowWidth, scrollHeight)
    return (
        <header style={ scrollHeight > 100 && scrollHeight < 700 ? {opacity: "0"} : {opacity: "100%"}} className={scrollHeight > 700 && (page === "landing" || page === "products" || page === "productsA" || page === "productsM" || page === "productsW" || page === "productsS") ? "header-area header-sticky fixed fade-in" : "header-area header-sticky"}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="main-nav">
                            <a onClick={() => changePage("landing")} className="logo">
                                <img src={logo} />
                            </a>
                            <ul style={ windowWidth > 991 ? {display: "flex"} : {display: menuDisplay} } className="nav">
                                <li onClick={() => changePage("landing")} className="scroll-to-section"><a className={page === "landing" ? "active" : ""}>Home</a></li>
                                <li onClick={() => {changePage("productsM"); setMenuDisplay("none")}} className="scroll-to-section"><a className={page === "productsM" ? "active" : ""}>Men's</a></li>
                                <li onClick={() => {changePage("productsW"); setMenuDisplay("none")}} className="scroll-to-section"><a className={page === "productsW" ? "active" : ""}>Women's</a></li>
                                <li onClick={() => {changePage("productsA"); setMenuDisplay("none")}} className="scroll-to-section"><a className={page === "productsK" ? "active" : ""}>Accessories</a></li>
                                <li onClick={() => {changePage("productsS"); setMenuDisplay("none")}} className="scroll-to-section"><a className={page === "productsK" ? "active" : ""}>Shoes</a></li>
                                {signIn === true ? <li onClick={() => handleLogOut()}><a>Logout</a></li> : 
                                <li onClick={() => changePage("login")}><a className={page === "login" ? "active" : ""}>Login</a></li>}

                                <li className="basket" >
                                    <a>
                                        <svg onClick={windowWidth < 991 ? ()=>changePage("checkout") : handleClick } className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9V4a3 3 0 0 0-6 0v5m9.92 10H2.08a1 1 0 0 1-1-1.077L2 6h14l.917 11.923A1 1 0 0 1 15.92 19Z" />
                                        </svg>
                                    </a>
                                    <Basket changeQuantity={changeQuantity} removeFromBasket={removeFromBasket} changePage={changePage} basket={basket} view={basketView} />
                                </li>
                                {signIn === true ? 
                                <li className="submenu">
                                    <a href="#">{user.username}</a>
                                    <ul>
                                        <li><a href="about.html">Account</a></li>
                                        <li onClick={() => changePage("products")}><a>Products</a></li>
                                        <li><a href="contact.html">Contact Us</a></li>
                                    </ul>
                                </li> : ""}

                            </ul>
                            <a onClick={handleMenuClick} className='menu-trigger'>
                                <span>Menu</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Navigation