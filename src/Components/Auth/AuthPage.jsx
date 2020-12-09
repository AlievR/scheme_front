import React, { useState, useEffect } from 'react'
import '../Auth/Auth.css'
import { useHttp } from '../../hooks/http.hook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AuthPage() {

    const [form, setForm] = useState({
        email:'', password: ''
    })
    const [signIn, setSignIn] = useState(false)
    const [signUp, setsignUp] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false);

    const { request, error, clearError } = useHttp()




    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handlerSignUp = () => {
        setsignUp(false)
        setSignIn(true)
    }

    const handlerSignIn = () => {

        setSignIn(false)
        setsignUp(true)
    }
 


    const handlerClickSignUp = async () => {
        try {  
            console.log('wdwdwd')
            console.log({...form})
            const data = await request('http://localhost:5000/api/auth/registration', 'POST', {...form})
            toast.success(data.message)
        } catch (error) {
            toast.error(error)
        }
    }


    return (
        <div className="AuthPage">
            <div className={(signIn === true)
                ? 'container__auth right-panel-active'
                : 'container__auth'}>
                <div className="form-container sign-up-container">
                    <form className="form__auth">
                        <h1 className="authForm__title">Create Account</h1>
                        <span className="authFotm__suptitle">or use your email for registration</span>
                        <input
                            className="authForm__input"
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            value={form.email}
                            placeholder="Email" />
                        <input
                            className="authForm__input"
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            value={form.password}
                            placeholder="Password" />
                        <button 
                        className="authForm__button"
                        onClick={handlerClickSignUp} 
                        >Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form className="form__auth">
                        <h1 className="authForm__title">Sign in</h1>
                        <span className="authFotm__suptitle">or use your account</span>
                        <input
                            className="authForm__input"
                            type="email"
                            name="email"
                            placeholder="Email" />
                        <input
                            className="authForm__input"
                            type="password"
                            name="password"
                            placeholder="Password" />
                        <button className="authForm__button">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="authForm__title">Welcome Back!</h1>
                            <p className="authForm__text">To keep connected with us please login with your personal info</p>
                            <button
                                className="authForm__button ghost"
                                onClick={handlerSignIn}
                            >Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button
                                className="authForm__button ghost"
                                onClick={handlerSignUp}>
                                Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuthPage
