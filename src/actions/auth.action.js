// import axios from "axios"
import axios from "../helpers/axios"
import { authConstants, CartConstants ,userConstants } from "./constant"

export const login = (user) => {

    return async (dispatch)=> {
        try{

            dispatch({type:authConstants.LOGIN_REQUEST});
            
            const res= await axios.post("/signin",{...user});
            if(res.status === 200){
                const {user,token} = await res.data;
                //console.log(user)
                localStorage.setItem('token-',token);
                localStorage.setItem("user-", JSON.stringify(user))
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload:{
                        token,
                        user
                    }
                })
            }else{
                if(res.status === 422){
                    dispatch({
                        type:authConstants.LOGIN_FAILURE,
                        payload:{error: res.data.error}
                    })
                }
            }
        }catch(err){
           // console.log(err.response)
            if(err.response.status === 422){
                dispatch({
                    type:authConstants.LOGIN_FAILURE,
                    payload:{error: err.response.data.error}
                })
            }
        }
        }
    }

export const isUserLoggedIn =()=> {
    return async dispatch => {
        const token = localStorage.getItem("token-");
        if(token){
            let user = localStorage.getItem("user-");
            if(user.length > 0){


                user = JSON.parse(user);
            }
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload :{
                    token,user
                }
            })
        }else{
            dispatch({
                type:authConstants.LOGOUT_SUCCESS,
                // payload:{error: "login first"
            })
        }
    }
}
export const signout = ()=> {
    return async dispatch => {
        dispatch({type: authConstants.LOGOUT_REQUEST})
       
     

            localStorage.removeItem("user-");
            localStorage.removeItem("token-")
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            });
            dispatch({
                type:CartConstants.RESET_CART
            })
        }
    
}

export const addAddress = (payload) => {
    return async dispatch => {
            // try{
                console.log(payload)
                dispatch({type:authConstants.ADD_ADDRESS_REQUEST})
                let res = await axios.post("/user/address/create", {payload});
                if(res.status === 201){
                    const {address} = res.data.address;
                  //  console.log(address)
                    dispatch({
                        type: authConstants.ADD_ADDRESS_SUCCESS,
                        payload:{address}
                    })
                }else{
                    const {error} = res.data;
                    dispatch({
                        type:authConstants.ADD_ADDRESS_FAILURE,
                        payload:{error}
                    })
                }
            // }catch{

            // }
    }
}
export const getAddress = () => {
    return async dispatch => {
        dispatch({
            type:authConstants.GET_ADDRESS_REQUEST
        })
        let res = await axios.get("/user/address");
  
        if(res.status === 200){
            const {address} = res.data.userAddress;
            dispatch({
                type:authConstants.GET_ADDRESS_SUCCESS,
                payload:{address}
            })
        }

    }
}
export const addOrder = (payload) => {
    // console.log(payload)
    return async dispatch => {
        dispatch({type:authConstants.ADD_ORDER_REQUEST});
        const res = await axios.post("/user/addOrder",payload);
       // console.log(res)
        if(res.status === 201){
            const {order} = res.data;
            dispatch({
                type:CartConstants.RESET_CART
            })
            dispatch({
                type:authConstants.ADD_ORDER_SUCCESS,
                payload: {order}
            })

        }
    }
}


export const getOrders = () => {
    return async dispatch => {
        dispatch({type: authConstants.GET_ORDER_REQUEST});

        let res = await axios.get("/user/getOrders");
        // console.log(res)
        if(res.status === 200) {
            const {order} = res.data;
            dispatch({
                type: authConstants.GET_ORDER_SUCCESS,
                payload: {
                    order
                }
            })
        }
    }
}

export const getOrderDetails = (payload) =>{
    return async dispatch =>{
        // console.log(payload);
        dispatch({type: authConstants.GET_ORDER_DETAILS_REQUEST});
        let res = await axios.post("/user/getOrder", payload);
        if(res.status === 200){
            const {order} = res.data;
            dispatch({type: authConstants.GET_ORDER_DETAILS_SUCCESS,
            payload: {order}})
        }else{
            const {error} = res.data;
            dispatch({type:authConstants.GET_ORDER_DETAILS_FAILURE,
            payload:{error}})
        }
        // console.log(res)
    }
} 




export const userGoogleLogin = (tokenId ) => {

    return async dispatch => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        })
        try{
            let res = await axios.post("googleLogin", tokenId);
            if(res.status === 201){
             const {user,token} = res.data;
             localStorage.setItem('token-',token);
                localStorage.setItem("user-", JSON.stringify(user))
             dispatch({
                 type : userConstants.USER_REGISTER_SUCCESS,
                 payload:{
                     user,token
                 }
             })
             dispatch({
                 type : authConstants.LOGIN_SUCCESS,
                 payload:{
                     user,token
                 }
             })
            }
            if(res.status === 200){
                const {user,token} = res.data;
                localStorage.setItem('token-',token);
                localStorage.setItem("user-", JSON.stringify(user))
                dispatch({
                    type : authConstants.LOGIN_SUCCESS,
                    payload:{
                        user,token
                    }
                })
            }
        }catch(err){
            console.log(err)
        }
    }
}
