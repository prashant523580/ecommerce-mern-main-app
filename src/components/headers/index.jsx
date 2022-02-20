import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./style.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getCartItems, login, signout, UserSignup } from "../../actions"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Dropdown, Modal } from './nav-header/index.nav';
import { getNativeSelectUtilityClasses } from '@mui/material';
import { authConstants } from '../../actions/constant';
import loginImg from "../../img/Login-illustration.svg";
import googleIcon from "../../img/IOS_Google_icon.png";
const Header = () => {
    const [loginModal, setLoginModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        username: "",
        email_user: ""

    });
    const [errorMessage, setErrorMessage] = useState({
        fullnameError: "",
        phoneError: "",
        emailError: "",
        passwordError: "",
        usernameError: ""
    })
    const auth = useSelector(state => state.auth);
    const current_user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        setError(auth.error || current_user.error);
        setErrorModal(true);

        setTimeout(() => {

            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: ""
                }
            })
            setErrorMessage({
                fullnameError: "",
                phoneError: "",
                emailError: "",
                passwordError: "",
                usernameError: ""
            })
        }, 3000);
    }, [auth.error, current_user.error]);
    useEffect(() => {
    }, [auth.authenticate]);
    const showErrorModal = () => {

        return (
            <>
                <Modal
                    onClick={() => setErrorModal(false)}
                    visible={errorModal}
                    title={"error"} classname={"error"} children={
                        <p > {error}</p>
                    } />
            </>
        )
    }
    const InputEvent = (e) => {
        const { name, value } = e.target;
        // console.log(name,value)
        setUser((preval) => {
            return { ...preval, [name]: value }
        })
    }
    const errorMsg = {
        fullnameError: "fill user name",
        passwordError: "fill password",
        emailError: "fill password",
        phoneError: "fill phone number",

    }

    const submitSignup = (e) => {
        e.preventDefault();
        if (user.username === "") {
            setErrorMessage((preval) => {
                return { ...preval, usernameError: errorMsg.fullnameError }
            });
            return
        } else if (user.email === "") {

        }
        dispatch(UserSignup(user));
        setLoginModal(false);
    }
    const submitLogin = (e) => {
        e.preventDefault();

        dispatch(login(user));

        setLoginModal(false);
    }
    useEffect(() => {
        if (auth.authenticate) {

            setLoginModal(false);
        }
    }, [auth.authenticate])
    const logout = () => {
        dispatch(signout());
    }
    const modal = () => {
        return (
            <>
                <Modal visible={loginModal} onClick={() => setLoginModal(false)}>
                    {/* <div className="info"> */}
                    <div className="content">
                        <div className='toggle-form'>
                            <div className='toggle-buttons'>

                            <h4 style={signupModal ? { backgroundColor: "black" } : { backgroundColor: "transparent" }} onClick={() => setSignupModal(true)}>sign up</h4>
                            <h4 style={!signupModal ? { backgroundColor: "black" } : { backgroundColor: "transparent" }} onClick={() => setSignupModal(false)}>sign in</h4>
                            </div>
                        </div>
                        <div className="content-body">
                            <img src={loginImg} />
                        </div>
                        <div className="link-form">
                            {signupModal ? <>
                                <p >already signup ? <span onClick={() => {
                                    setSignupModal(false)

                                }}> signin here.</span>  </p>

                            </>
                                : <p
                                > not a member ? <span onClick={() => {
                                    setSignupModal(true)
                                }}> signup here.</span></p>}
                        </div>
                    </div>
                    {/* </div> */}
                    <form action="" onSubmit={signupModal ? submitSignup : submitLogin}>
                        {
                            signupModal && <>

                                <div className="form-group">
                                    <label htmlFor="">full name</label>
                                    <input autoComplete='off' name='name' value={user.name} onChange={InputEvent} type="text" placeholder='fullname' className='input-control' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">username {errorMessage.usernameError &&
                                        <div className="error"> {errorMessage.usernameError} </div>
                                    }
                                    </label>
                                    <input autoComplete='off' name='username' value={user.username} onChange={InputEvent} type="text" placeholder='username' className='input-control' />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">phone number</label>
                                    <input autoComplete='off' name='phone' value={user.phone} onChange={InputEvent} type="text" placeholder='phone number' className='input-control' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">email</label>
                                    <input autoComplete='off' name="email" value={user.email} onChange={InputEvent} type="email" className='input-control' placeholder='Xyz@example.com' />
                                </div>
                            </>
                        }
                        {!signupModal &&
                            <div className="form-group">
                                <label htmlFor="">email/username</label>
                                <input autoComplete='off' name="email_user" value={user.email_user} onChange={InputEvent} type="email" className='input-control' placeholder='Xyz@example.com' />
                            </div>
                        }
                        <div className="form-group">
                            <label htmlFor="">password</label>
                            <input autoComplete='false' name='password' value={user.password} onChange={InputEvent} type="password" placeholder='password' className='input-control' />
                        </div>

                        <div style={{ textAlign: "center", padding: "5px" }}>or</div>
                        <hr />
                        <div className="form-group">
                            <div className='social-media'>
                                <div>

                                    <button >
                                        <FacebookOutlinedIcon />
                                    </button>
                                    <button >
                                        <img width={'30px'} height={"30px"} src={googleIcon}/>
                                    </button>
                                </div>
                                <div>

                                    <button>
                                        <FacebookOutlinedIcon />
                                    </button>
                                    <button >
                                        <FacebookOutlinedIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="form-group buttons">
                            <button className="form-btn" onClick={() => setLoginModal(false)}>cancle</button>
                            <button className="form-btn">{signupModal ? "sign up" : "login"}</button>
                        </div>
                    </form>
                </Modal>
            </>
        )
    }
    const renderNonLoginMenu = () => {
        return (
            <Dropdown
                menu={
                    <>
                        <a>
                            More
                        </a>
                        <ArrowDropDownIcon />
                    </>
                }
                menus={[
                    { label: "shop zone", href: "", icon: null },
                    {
                        label: "order",
                        href: '/account/orders',
                        icon: null,
                        onClick: () => {
                            setLoginModal(true);
                        }
                    }
                ]}
                setFormMenu={
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}>
                        <a onClick={() => {
                            setSignupModal(false);
                            setLoginModal(true);
                        }}> login </a> &nbsp;&nbsp;&nbsp;
                        <a onClick={() => {
                            setLoginModal(true);
                            setSignupModal(true)
                        }}> sign up</a>
                    </div>
                }
            />


        )
    }
    const renderLoginMenu = () => {
        return (
            <Dropdown
                menu={<>
                    <a> profile</a>
                    <ArrowDropDownIcon />
                </>
                }
                menus={[
                    { label: "account"  , href: "/account", icon: null },
                    {
                        label: "Orders",
                        href: `/account/orders`,
                        icon: null,
                    },
                    { label: "Wishlist", href: "", icon: null },
                    { label: "My Chats", href: "", icon: null },
                    { label: "Rewards", href: "", icon: null },
                    { label: "Notifications", href: "", icon: null },
                    { label: "Logout", icon: 'null', onClick: logout }
                ]}
            />
        )
    }
    return (
        <div className='main-header'>
            <div className="head logo">
                <NavLink className={'icon'} to='/'>logo</NavLink>
            </div>
            <div className="head location"> <LocationOnIcon/>Nepal</div>
            <div className="head search-box">
                <input type="text" className='search' />
                <button className='btn'><SearchIcon /></button>
            </div>
            <div className="head account">
                {
                    auth.authenticate ? renderLoginMenu() : renderNonLoginMenu()
                }
                {/* <span onClick={() => setLoginModal(true)}>
                    login
                </span>  */}
            </div>

            <div className="head cart-page">
                <a href="/cart"> <div> {Object.keys(cart.cartItems).length}</div> <ShoppingCartOutlinedIcon /></a>
            </div>
            {error ? showErrorModal() : null}
            {modal()}
        </div>
    )
}

export default Header
