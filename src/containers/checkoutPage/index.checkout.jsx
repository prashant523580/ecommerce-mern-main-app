import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../actions";
import { login, getAddress,addOrder } from "../../actions/auth.action";
import Card from "../../components/ui/card/index.card";
import CartPage from "../CartPage/index.cart";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddressForm from "./AddressForm";
import HandCash from "../../img/handcash.png";
import EsewaImg from "../../img/esewa.png";
import "./style.css";
const CheckoutStep = (props) => {
    return (
        <>
            <div className="checkout">
                <div onClick={props.onClick} className={`checkout-header ${props.active && "active"}`}>
                    <div className="step-number">{props.step}</div>
                    <div className="title">{props.title}</div>
                </div>
                <div className="checkout-body">
                    {props.body}
                </div>
                <div className="checkout-footer">
                    {props.footer && props.footer}
                </div>
            </div>
        </>
    )
}
const Address = ({ index, adr, selectAddress, onAddressSubmit, enableAddressEditForm, confirmDeliveryAddress }) => {
    return (
        <>
            {
                !adr.edit ? (



                    <div className="address">
                        <input name="address" id={`address-${index}`} type="radio" onClick={() => selectAddress(adr)} />
                        <label htmlFor={`address-${index}`}>
                            <span> {adr.name}</span>
                            <span> {adr.phone} </span>
                            <span> {adr.city}</span>
                            <span> {adr.address}</span>
                        </label>
                        <div className="buttons">
                            {adr.selected &&
                                <>

                                    <button className="button" onClick={() => enableAddressEditForm(adr)}>edit</button>
                                    <button className="button" onClick={() => confirmDeliveryAddress(adr)}>delivery here</button>
                                </>
                            }

                        </div>

                    </div>
                ) :
                    (
                        <AddressForm
                            withoutLayout={true}
                            onSubmitForm={onAddressSubmit}
                            initialData={adr}
                            onCancle={() => { }}
                        />
                    )

            }
        </>
    )
}
const CheckoutPage = (props) => {
    const auth = useSelector(state => state.auth);
    const [userlogin, setUserLogin] = useState({
        email_user: "",
        password: ""
    });
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState();
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [orderSummery, setOrderSummery] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentOption,setPaymentOption] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const [paymentBtn,setPaymentBtn] = useState();
    const[paymentType,setPaymentType] = useState();


    const cart = useSelector(state => state.cart);
    const { address } = auth;
    const dispatch = useDispatch();

    const inputEvent = (e) => {
        const { name, value } = e.target;

        setUserLogin((pre) => {
            return { ...pre, [name]: value };
        })
    }
    useEffect(() => {
        // if(auth.authenticate){

        auth.authenticate && dispatch(getAddress());
        auth.authenticate && dispatch(getCartItems())
        // }
    }, [auth.authenticate]);
    useEffect(() => {
        let addresss = address.map((adr) => ({
            ...adr, selected: false, edit: false
        }))
        setAddresses(addresss)
    }, [auth.address])
    const submitLoginUser = (e) => {
        e.preventDefault();
        dispatch(login(userlogin));
    }
    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr);
        console.log(addr)
        setConfirmAddress(true);
        setOrderSummery(true);
    }
    const selectAddress = (addr) => {
        // setSelectedAddress(adr);
        const updateaddress = addresses.map((adr) =>
            adr._id === addr._id ?
                { ...adr, selected: true } : { ...adr, selected: false }
        )
        setAddresses(updateaddress);
    }
    const enableAddressEditForm = (addr) => {
        const updatedAddress = addresses.map((adr) =>
            adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        )
        setAddresses(updatedAddress)
    }
    const confirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummery(true);
        setOrderConfirmation(true)
    }
    const userConfirmationOrder = ()=> {
        setOrderConfirmation(true);
        setOrderSummery(false);
        setPaymentOption(true);
    }
    const submitConfirmOrder = () => {
        
        const totalAmt = Object.keys(cart.cartItems).reduce((totalPrice,key) => {
            return totalPrice + cart.cartItems[key].qty * cart.cartItems[key].price
        },0);
        const items = Object.keys(cart.cartItems).map((key) => ({
            productId: key,
            payablePrice : cart.cartItems[key].price,
            purchasedQuantity: cart.cartItems[key].qty
        }));
console.log(items)
        const payload = {
            addressId: selectedAddress._id,
            totalAmt,
            items,
            paymentStatus:"pending",
            paymentType: paymentType
        }
        dispatch(addOrder(payload));
    }
    const submitPaymentType = (e) => {
        setPaymentType(e.currentTarget.dataset.val)
        setPaymentBtn(true)
    }
    return (
        <>
            <div className="page-container">
                <div className="checkout-container">
                    <CheckoutStep
                        title={auth.authenticate ? "profile" : "signin"}
                        step={"1"}
                        active={auth.authenticate}
                        body={
                            auth.authenticate ? (
                                <div className="loggedin-id">
                                    <div>

                                        {auth.user.name}
                                    </div>
                                    <div> {auth.user.email}</div>
                                    <div>    {auth.user.phone}</div>
                                </div>
                            ) :
                                (
                                    <form onSubmit={submitLoginUser}>
                                        <div className="form-group">
                                            <input onChange={inputEvent} type="text" className="form-control" name="email_user" placeholder="email/username/phone" />
                                            <input onChange={inputEvent} type="password" className="form-control" name="password" placeholder="password" />
                                        </div>
                                        <div className="form-group buttons">
                                            <button className="form-btn">signin</button>
                                        </div>
                                    </form>
                                )
                        }
                    />
                    <CheckoutStep
                        title="address"
                        step="2"
                        active={confirmAddress && auth.authenticate}
                        body={
                            <>
                                <div className="address-container">

                                    <div className="address-body">
                                        {confirmAddress ? (
                                            <div>
                                                <div>
                                                    <span>Name: {selectedAddress.name} </span>

                                                    <span>Address :{selectedAddress.address} </span>
                                                </div>
                                                <div>

                                                    <span>Phone : {selectedAddress.phone} </span>
                                                    <span>City : {selectedAddress.city} </span>
                                                    <span> Address Type :{selectedAddress.addressType}</span>
                                                </div>
                                            </div>) : (

                                            addresses && addresses.map((adr, ind) => (

                                                <Address
                                                    key={ind}
                                                    adr={adr}
                                                    onAddressSubmit={onAddressSubmit}
                                                    selectAddress={selectAddress}
                                                    index={ind}
                                                    enableAddressEditForm={enableAddressEditForm}
                                                    confirmDeliveryAddress={confirmDeliveryAddress}
                                                />
                                            )
                                            )

                                        )}
                                    </div>
                                </div>
                            </>
                        }
                    />
                    {confirmAddress ? null : newAddress ?
                        (
                            <AddressForm step={'+'} title="add address" onSubmitForm={onAddressSubmit} />
                        ) : auth.authenticate ? (
                            <CheckoutStep
                                step="+"
                                title={"add new address"}
                                active={false}
                                onClick={() => setNewAddress(true)}
                            />
                        ) : null
                    }
                    <CheckoutStep
                    title={'order summery'}
                    step="3"
                    active={orderSummery || orderConfirmation}
                    body={
                        orderSummery ? <CartPage onlyCartItems={true}/> : 
                        orderConfirmation ?(
                            <div> 
                                {Object.keys(cart.cartItems).length} 
                            items
                            </div>
                        ) : null
                    }
                    
                    />
                    <CheckoutStep
                    step="4"
                    title={"confirm order"}
                    active={orderConfirmation}
                        body={
                            
                            orderSummery && 
                            
                                <div className="payment-option">
                                <div className="confirm">order confirmation email will be sent to: <span className="confirm-mail">{auth.user.email}</span> </div>
                                <button className="confirm-btn" onClick={userConfirmationOrder}> continue </button>
                                </div>
                        
                        }
                    />
                    <CheckoutStep
                    title={"payment options"}
                    step="5"
                    active={paymentOption}
                    body={
                        paymentOption && <>
                                <div className="payment-option card">
                                    <div className="option" onClick={submitPaymentType} data-val="cod"> <img width={30} height={30} src={HandCash}/> cash on delivery</div>
                                   <div>or</div>
                                    <div className="options">
                                        <div className="option" data-val="esewa" onClick={submitPaymentType}>
                                            <label htmlFor="esewa">Esewa</label>
                                            <img src={EsewaImg} id="esewa"  width={80} height={40}/></div>
                                        {/* <div className="option paypal">paypal</div> */}
                                        <div className="option cards" data-val="card" onClick={submitPaymentType}>  card <CreditCardIcon id="card"/> </div>
                                    </div>
                                  {
                                      
                                      paymentBtn &&
                                      <button className="confirm-btn" onClick={submitConfirmOrder}>confirm order</button>
                                  }  
                                </div>
                        </>
                    }
                    />
                </div>

            </div>
        </>
    )
}

export default CheckoutPage;