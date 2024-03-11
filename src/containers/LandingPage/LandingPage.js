import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import Head from "../../components/LandingPageComp/Head/Head";
import MenLatest from "../../components/LandingPageComp/MenLatest/MenLatest";
import WomenLatest from "../../components/LandingPageComp/WomenLatest/WomenLatest";
import KidLatest from "../../components/LandingPageComp/KidLatest/KidLatest";
import Social from "../../components/LandingPageComp/Social/Social";
import Subscribe from "../../components/LandingPageComp/Subscribe/Subscribe";
import Footer from "../../components/Footer/Footer";
import {useState, useEffect} from "react";


const LandingPage = (props) => {

    const {setBasket, addToBasket, changeQuantity ,changeProduct, changePage, page, signIn, changeUser, user, basket, removeFromBasket, handleLogOut} = props;
    const [products, setProducts] = useState([]);


    useEffect(() =>{
      fetch('https://e-commerce-1-nxh1.onrender.com/', {
        method: 'get',
        credentials: 'include', 
      })
      .then(response => response.json())
      .then(data => {
        
  
          setProducts(data);
        }
        
      )
    }, [])

    return(
        <div>
            <Navigation changeQuantity={changeQuantity} removeFromBasket={removeFromBasket} basket={basket} signIn={signIn} changePage={changePage} page={page} changeUser={changeUser} handleLogOut={handleLogOut} user={user}/>
            <Head changePage={changePage}/>
            <WomenLatest changePage={changePage}  products={products.filter((product) => product.category.includes("womens-dresses"))} changeProduct={changeProduct} />
            <MenLatest changePage={changePage} products={products.filter((product) => product.category.includes("mens-shirt"))} changeProduct={changeProduct}/>
            <KidLatest changePage={changePage} products={products.filter((product) => product.category.includes("bag" || "glass") || product.description.includes("bag" || "glass"))} changeProduct={changeProduct}/>
            <Social />
            <Subscribe />
            <Footer changePage={changePage}/>
        </div>
    )
}

export default LandingPage;