import React from "react";
import "../../static/css/bootstrap.min.css"
import "../../static/css/templatemo-hexashop.css"
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import ProductHead from "../../components/ProductPageComp/ProductHead/ProductHead";
import Products from "../../components/ProductPageComp/Products/Products";

const ProductsPage = (props) => {

    const {changeQuantity, changeProduct, changePage, page, signIn, user, basket, changeUser, removeFromBasket, products, handleLogOut } = props;
   
    

    return (
        <div className="products-page">
            <Navigation changeQuantity={changeQuantity} removeFromBasket={removeFromBasket} basket={basket} signIn={signIn} changePage={changePage} page={page} user={user} changeUser={changeUser} handleLogOut={handleLogOut} />
            <ProductHead page={page}/>
            <Products changeProduct={changeProduct} products={products}/>
            <Footer changePage={changePage} />
        </div>
    )
}

export default ProductsPage