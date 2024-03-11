import React, { useState } from "react";
import "../../static/css/bootstrap.min.css"
import "../../static/css/templatemo-hexashop.css"
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

const RegisterPage = (props) => {

    const {changeQuantity, changePage, page, changeUser, signIn, basket, prevPage, removeFromBasket} = props;
    
    const [register, setRegister] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: ''
    })
    const [error, setError] = useState("")

    const changeFirstName = (event) => {
        setRegister({
         ...register,
            first_name: event.target.value
        })
        console.log(event.target.value)

    }

    const changeLastName = (event) => {
        setRegister({
            ...register,
            last_name: event.target.value
        })
        console.log(event.target.value)
    }

    const changeEmail = (event) => {
        setRegister({
            ...register,
            email: event.target.value
        })
        console.log(event.target.value)

    }
    const changeUsername = (event) => {
        setRegister({
            ...register,
            username: event.target.value
        })
        console.log(event.target.value)

    }

    const changePassword = (event) => {
        setRegister({
            ...register,
            password: event.target.value
        })
        console.log(event.target.value)

    }

    const handleRegister = () => {
        fetch("https://e-commerce-q5ug.onrender.com/register" , {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                first_name: register.first_name,
                last_name: register.last_name,
                email: register.email,
                username: register.username,
                password: register.password
            })
        })
        .then(response => response.json())
        .then(async user => {
            console.log("user:", user);
            if (user.id) {
                setError("");
                console.log("user register:", user);
                await changeUser(user)
                changePage("landing");

                if(basket.length > 0) {
                    fetch("https://e-commerce-q5ug.onrender.com/addbasket", {
                        method: 'post',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            user: user,
                            basket: basket.map((item) => [item.id, item.quantity, item.details])
                        })
                    })
                    .then(response => response.json())
                    .then(console.log)
                }

                // throw new Error('Failed to register. Please check your input.');
            } else{
                setError(user);
            }
        })
    
        .catch(err => {
            console.log("catch:", err.message);
            // Handle the error, show a message to the user, etc.
        });
    };

    return (
        <div className="login-page">
            <Navigation changeQuantity={changeQuantity} removeFromBasket={removeFromBasket} basket={basket} changePage={changePage} page={page} signIn={signIn}/>
            <div className="login-container">
                <div className="login">
                    <h1>Register</h1>
                    <div className="login-input">
                        <input onChange={changeFirstName} name="first_name" placeholder="first name" />
                        <input onChange={changeLastName} name="last_name" placeholder="last name" />
                        <input onChange={changeEmail} name="email" placeholder="email" />
                        <input onChange={changeUsername} name="username" placeholder="username" />
                        <input onChange={changePassword} name="password" placeholder="password" type="password" />
                        <button onClick={handleRegister} className="btn btn-dark">Register</button>
                        <p>Already a memeber? <a onClick={() => changePage("login")}>Login</a></p>
                        <p style={{color: "red"}}>{error}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default RegisterPage