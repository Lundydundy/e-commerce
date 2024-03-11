import React, { useState } from "react";
import "../../static/css/bootstrap.min.css"
import "../../static/css/templatemo-hexashop.css"
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

const LoginPage = (props) => {
    const {changeQuantity, setBasket, changePage, page, changeUser, basket, addToBasket, prevPage, removeFromBasket, signIn } = props;
    const [error, setError] = useState('');

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const changeEmail = (event) => {
        setLogin({
            ...login,
            email: event.target.value
        })
        console.log(event.target.value)

    }

    const changePassword = (event) => {
        setLogin({
            ...login,
            password: event.target.value
        })
        console.log(event.target.value)

    }

    const handleLogin = async() => {
        fetch("https://e-commerce-q5ug.onrender.com/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: login.email,
                password: login.password
            }),
            credentials: 'include'
        })
            .then(response => response.json())
            .then( async response => {
                console.log("login response login page:", response);
                if (response.user) {
                   await changeUser(response.user);
                    console.log("user loginpage:", response);
                    // changeUser(response)
                }
                if(response.user.basket.length > 0){

                    response.user.basket.forEach((item) => {
                        addToBasket(item, item.quantity, item.details)
                    })
                } 
                else {
                    setError('Failed to login. Please check your input.');
                }
               
                setError('');
                changePage(prevPage);
            })
    }

    return (
        <div className="login-page">
            <Navigation changeQuantity={changeQuantity} signIn={signIn} removeFromBasket={removeFromBasket} basket={basket} changePage={changePage} page={page} />
            <div className="login-container">
                <div className="login">
                    <h1>Login</h1>
                    <div className="login-input">
                        <input name="email" onChange={changeEmail} placeholder="username/ email" />
                        <input name="password" onChange={changePassword} placeholder="password" type="password" />
                        <button onClick={handleLogin} className="btn btn-dark">Login</button>
                        <p>Not a memeber? <a onClick={() => changePage("register")} >Register</a></p>
                        <p style={{ color: "red" }}>{error}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginPage