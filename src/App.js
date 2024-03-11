import { useEffect, useState } from 'react';
import './App.css';
import CheckoutPage from './containers/CheckoutPage/CheckoutPage';
import LandingPage from './containers/LandingPage/LandingPage';
import LoginPage from './containers/LoginPage/LoginPage';
import ProductViewPage from './containers/ProductViewPage/ProductViewPage';
import ProductsPage from './containers/ProductsPage/ProductsPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import { Routes, Route, BrowserRouter } from "react-router-dom";

const defaultProduct = [{

  "id": 93,
  "title": "FREE FIRE T Shirt",
  "description": "quality and professional print - It doesn't just look high quality, it is high quality.",
  "price": "10.00",
  "rating": "4.52",
  "stock": 128,
  "brand": "FREE FIRE",
  "category": "mens-shirts",
  "thumbnail": "https://cdn.dummyjson.com/product-images/52/thumbnail.jpg",
  "images": [
    "https://cdn.dummyjson.com/product-images/52/1.png",
    "https://cdn.dummyjson.com/product-images/52/2.png",
    "https://cdn.dummyjson.com/product-images/52/3.jpg",
    "https://cdn.dummyjson.com/product-images/52/4.jpg",
    "https://cdn.dummyjson.com/product-images/52/thumbnail.jpg"
  ]
}]

function App() {

  const [user, setUser] = useState({
    id: null,
  
  })

  const [basket, setBasket] = useState([])

  const [signIn, setSignIn] = useState(false)

  const [page, setPage] = useState("landing")

  const [prevPage, setPrevPage] = useState("landing")

  const [product, setProduct] = useState(defaultProduct)

  const [products, setProducts] = useState([defaultProduct])


  
  const checkAuth = async () => {
    try {
      console.log("fetching")
      const response = await fetch('https://e-commerce-1-nxh1.onrender.com/auth', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
      if (response) {
        
        const data = await response.json();
        console.log("data", data)
        if (data.user) {
          console.log("user")
          setUser(data.user);
          setSignIn(true);
          setBasket(data.user.basket);
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      // Handle the error as needed
    }
  }

  const changePage = async (newPage) => {
    setPrevPage(page)
   
    if (newPage === "productsW" || newPage === "productsM" || newPage === "productsA" || newPage === "productsS" || newPage === "products") {
      fetch(`https://e-commerce-1-nxh1.onrender.com//products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: newPage,
        }),
      })
        .then(res => res.json())
        .then(items => {
          const categoryItems = items.reduce((acc, item) => {
            if (!acc[item.category]) {
              acc[item.category] = [item]
              return acc
            } else {
              acc[item.category].push(item)
              return acc
            }
          }, {})
          console.log("cat:", categoryItems)

          setProducts(categoryItems)

        })

    }
    
    
    setPage(newPage);

    document.body.scrollTo({
      top: 0,
      behavior: 'instant',
    });  
    
  }

  const changeUser = (user) => {
    
      setUser(user)
      setSignIn(true)
    
  }

  const handleLogOut = async() => {
   
      try {
        const response = await fetch('https://e-commerce-1-nxh1.onrender.com/logout', {
          method: 'POST',
          credentials: 'include', // Include credentials (cookies)
          headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify({
            id: user.id,
          }),
        });

        const data = await response.json();

        if (data.success) {
          console.log("Logout successful")
        } else {
          console.log("Logout unsuccessful")
        }
      } catch (error) {
        console.error('Logout error:', error);
        // Handle error
      }

      setUser({
        id: null
      })
      setBasket([])
      setSignIn(false)
  }

  const changeProduct = (newProduct, page) => {
    fetch(`https://e-commerce-1-nxh1.onrender.com/product/${newProduct}`, {
      method: 'get',
      credentials: 'include', 
    })
      .then((res) => res.json())
      .then((data) => {
        setPage(page)
        setProduct(data)
        
        document.body.scrollTo({
          top: 0,
          behavior: 'instant',
        });
      })
  }

  const addToBasket = (product, newQuantity, details) => {
    const parsedQuantity = parseInt(newQuantity);

    console.log("Parsed Quantity:", parsedQuantity);

    const basketItem = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: Math.round(product.price, 2),
      quantity: parsedQuantity,
      details: details,
      thumbnail: product.thumbnail
    }

    console.log("Basket Item Quantity:", basketItem.quantity);

    setBasket((prevBasket) => {
      const existingItemIndex = prevBasket.findIndex(item => item.id === basketItem.id);

      if (existingItemIndex !== -1) {
        const updatedBasket = [...prevBasket];
        console.log("Existing Item Quantity Before Update:", updatedBasket[existingItemIndex].quantity);
        updatedBasket[existingItemIndex].quantity += parsedQuantity;
        console.log("Existing Item Quantity After Update:", updatedBasket[existingItemIndex].quantity);
        
        fetch(`https://e-commerce-1-nxh1.onrender.com/addbasket`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user : user,
            basket: updatedBasket.map((item) => [item.id, item.quantity, item.details])
          }),
          credentials: 'include', 
        }).then((res) => res.json())
        .then(console.log)
        return updatedBasket;
      } 
      else {
        console.log("user_id",user.id)
        const updatedBasket = [...prevBasket, basketItem];        
        console.log("Item not in Basket. Adding to Basket.");
        fetch(`https://e-commerce-1-nxh1.onrender.com/addbasket`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user : user,
            basket: updatedBasket.map((item) => [item.id, item.quantity, item.details])
          }),
          credentials: 'include', 
  
        }).then((res) => res.json())
        .then(console.log)
        return updatedBasket;
      }
    });
  }

  const removeFromBasket = (id) => {
    const updatedBasket = basket.filter((item) => item.id !== id);
    setBasket(updatedBasket)
    fetch(`https://e-commerce-1-nxh1.onrender.com/addbasket`, {
      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user : user,    
            basket: updatedBasket.map((item) => [item.id, item.quantity, item.details])
          }),
          credentials: 'include', 
    }
    
    )
    .then((res) => res.json())
    .then(console.log)
  }

  const changeQuantity = (id, newQuantity) => {
    const updatedBasket = basket.map((item) => {
      if (item.id === id) {
        if(newQuantity === "+"){
          return {
         ...item,
            quantity: item.quantity + 1
          }
        } else{

          return {
         ...item,
            quantity: (item.quantity - 1 === 0 ? 1 : item.quantity - 1)
          }
        }
      } else {
        return item
      }
    })
    setBasket(updatedBasket)
    fetch(`https://e-commerce-1-nxh1.onrender.com/addbasket`, {
      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user : user,
            
            basket: updatedBasket.map((item) => [item.id, item.quantity])
          }),
          credentials: 'include', 
    }
    
    )
  .then((res) => res.json())
  }

  useEffect(() => {
    console.log("Component is mounting");
    checkAuth();
  }, []);


  if (page === "landing") {
    return (
      <div className="App">
        <LandingPage changeQuantity={changeQuantity} setBasket={setBasket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} basket={basket} signIn={signIn} changeProduct={changeProduct} changePage={changePage} page={page} changeUser={changeUser} handleLogOut={handleLogOut} user={user} prevPage={prevPage}/>
      </div>
    );
  } else if (page === "login") {
    return (
      <div className="App">

        <LoginPage changeQuantity={changeQuantity} setBasket={setBasket} removeFromBasket={removeFromBasket} prevPage={prevPage} addToBasket={addToBasket} basket={basket} signIn={signIn} changeUser={changeUser} handleLogOut={handleLogOut} changePage={changePage} page={page} user={user} />

      </div>
    )
  } else if (page === "register") {
    return (
      <div className="App">

        <RegisterPage changeQuantity={changeQuantity} removeFromBasket={removeFromBasket} prevPage={prevPage} basket={basket} signIn={signIn} changePage={changePage} page={page} handleLogOut={handleLogOut} changeUser={changeUser} user={user} />

      </div>
    )
  } else if (page === "products" || page === "productsM" || page === "productsW" || page === "productsA" | page === "productsS") {

    return (
      <div className="App">

        <ProductsPage changeQuantity={changeQuantity} changeProduct={changeProduct} products={products} removeFromBasket={removeFromBasket} basket={basket} signIn={signIn} changePage={changePage} handleLogOut={handleLogOut} page={page} user={user} changeUser={changeUser} />

      </div>

    )
  } else if (page === "productView") {

    return (
      <div className="App">

        <ProductViewPage changeQuantity={changeQuantity} removeFromBasket={removeFromBasket} changeUser={changeUser} basket={basket} signIn={signIn} product={product[0]} changePage={changePage} handleLogOut={handleLogOut} page={page} user={user} addToBasket={addToBasket} />

      </div>
    )
  } else if (page === "checkout") {
    return (
      <div className="App">

        <CheckoutPage changeQuantity={changeQuantity} removeFromBasket={removeFromBasket} basket={basket} changePage={changePage} />

      </div>
    )
  }
}

export default App;
