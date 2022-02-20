
import axios from "../helpers/axios"
import store from "../store/index"
import { CartConstants } from "./constant";

const getCartItems = () => {
        return async dispatch =>{
            try{
                dispatch({type: CartConstants.ADD_TO_CART_REQUEST});
                const res = await axios.get(`/user/getcartitems`);

                if(res.status === 200){
                    const {cartItems} = res.data;
                    if(cartItems){
                        dispatch({
                            type:CartConstants.ADD_TO_CART_SUCCESS,
                            payload:{
                                cartItems
                            }
                        })
                    }
                }
            }catch(error){

                console.log(error.response);
            }
        }
}
export const addToCart = (product,newQnty =1) => {
    
    return async (dispatch) => {
      
        const {
            cart : {
                cartItems
            },
            auth
        } = store.getState();
       const qty = cartItems[product._id] 
       ? parseInt(cartItems[product._id].qty + newQnty) : 1;
        cartItems[product._id] = {
            ...product,qty,
        }
       if(auth.authenticate){
            dispatch({
                type: CartConstants.ADD_TO_CART_REQUEST
            })
            const payload = {
                cartItems :[

                    {
                        product: product._id,
                        quantity: qty,
                        
                        
                    }
                ]
                
            }
            
            const res = await axios.post(`/user/cart/addtocart`, payload);
            if(res.status === 201){
                dispatch(getCartItems());
            }
        }else{
            localStorage.setItem("cart",JSON.stringify(cartItems))
        }
        dispatch({
            type: CartConstants.ADD_TO_CART_SUCCESS,
            payload:{
                cartItems
            }
        })

    }
}
export const deleteCartItem = (payload) => {
  return  async dispatch => {  
    dispatch({
        type:CartConstants.REMOVE_CART_ITEM_REQUEST
    })
    const res = await axios.post("/user/cart/remove",{payload});
    if(res.status === 202){
        dispatch({
            type: CartConstants.REMOVE_CART_ITEM_SUCCESS

        });
        dispatch(getCartItems())
    }    else {
        const { error } = res.data;
        dispatch({
          type: CartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
  }  
}

export const updateCart = () => {
    return async dispatch => {
        const {auth} = store.getState();
        // let cartItems = localStorage.getItem("cart");
        // cartItems =  cartItems ? JSON.parse(cartItems) : null;
        let cartItems = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : null;
        if(auth.authenticate){
            localStorage.removeItem("cart");
            if(cartItems){
                const payload = {
                    cartItems : Object.keys(cartItems).map((key,ind) =>{
                        return {
                            quantity: cartItems[key].qty,
                            product:cartItems[key]._id
                        }
                    })
                };
                if(Object.keys(cartItems).length > 0){
                    const res = await axios.post("/user/cart/addtocart", payload);
                    if(res.status === 201){
                        dispatch(getCartItems());
                    }
                }
            }else{
                dispatch(getCartItems());
            }
        }else{
            if(cartItems){
                dispatch({
                    type:CartConstants.ADD_TO_CART_SUCCESS,
                    payload: {cartItems}
                });
            }
        }
    }
}
export {getCartItems}