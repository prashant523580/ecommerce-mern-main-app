import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions/auth.action";
const AddressForm = (props) => {
    const { initialData } = props;
    const dispatch = useDispatch();
    const [address, setAddress] = useState({
        name: initialData ? initialData.name : "",
        phone:initialData ? initialData.phone :"",
        address:initialData ? initialData.address:"",
        city: initialData ? initialData.city :"",
        pinCode:initialData ? initialData.pinCode: "",
        addressType:initialData ? initialData.addressType: ""
    });
    const [id,setId] = useState(initialData ? initialData._id :  "");
    console.log(id);
    const [submitFlag,setSubmitFlag] = useState(false);
    const auth = useSelector(state => state.auth);
    const inputEvent = (e) =>{
        const {name,value} = e.target;
        setAddress((preval) => {
            return {...preval,
                    [name]  : value
                }
        })
    }
    useEffect(() => {
        if(submitFlag){
            let _address= {}
            if(id){
                _address ={
                    _id:id,
                    name: address.name,
                    phone: address.phone,
                    pinCode: address.pinCode,
                    address: address.address,
                    city: address.city,
                    addressType: address.addressType
                }
            }else{
                _address = auth.address.slice(auth.address.length-1)[0];
            }
            console.log(_address);
            props.onSubmitForm(_address )
        }
    },[auth.address])
    const submitUserAddress = (e) => {
            e.preventDefault();
            if(address.address === ""){
                return
            }
            const payload = {
                address
            }
            if(id){
                payload.address._id = id
            }
            console.log(payload);
            dispatch(addAddress(payload))
            setSubmitFlag(true)
    }
    
    const renderAddressForm = () => {
        return(
            <div className="address-form">
                <div className="form" >
                    <div className="form-group">
                        <input value={address.name} onChange={inputEvent} type="text" className="form-control" name="name" placeholder="full name" />
                        <input value={address.phone} onChange={inputEvent} type="text" className="form-control" name="phone" placeholder="phone number" />
                    </div>
                    <div className="form-group">
                        <input onChange={inputEvent} value={address.pinCode} type="text" className="form-control" name="pinCode" placeholder="pinCode" />
                        <input onChange={inputEvent} value={address.address} type="text" className="form-control" name="address" placeholder="addresss" />
                    </div>
                    <div className="form-group">
                        <input onChange={inputEvent} value={address.city} type="text" className="form-control" name="city" placeholder="city" />
                        <div className="address-type">
                            <label htmlFor="" style={{textTransform:"capitalize"}}>address type :</label>
                            <div className="form-group">

                            <input onChange={inputEvent} name="addressType" value={"home"} type="radio" id="home" />
                            <label htmlFor="home">home</label>
                            </div>
                            <div className="form-group">

                            <input onChange={inputEvent} type="radio" id="work" name="addressType" value={"work"}  />
                            <label htmlFor="work">work</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button onClick={submitUserAddress} className="btn btn-warning">add address</button>
                    </div>
                </div>
            </div>
        )
    }

    if(props.withoutLayout){
        return <div>{renderAddressForm()}</div>
    }
    return (
        <>
            <div className="checkout">
                <div className={`checkout-header ${props.active && "active"}`}>
                    <div className="step-number">{props.step}</div>
                    <div className="title">{props.title}</div>
                </div>
                <div className="checkout-body">
                    {renderAddressForm()}
                </div>
                <div className="checkout-footer">
                  
                </div>
            </div>
        </>
    )
}

export default AddressForm;