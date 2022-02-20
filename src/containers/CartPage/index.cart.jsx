import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteCartItem, getCartItems, isUserLoggedIn } from "../../actions";
import Card from "../../components/ui/card/index.card";
import CartItem from "./CartItem/index.cartitem";
import "./cart.css"
const CartPage = (props) => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();
    useEffect(() => {

        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate]);
    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];

        dispatch(addToCart({ _id, name, price, img }, -1));
    }
    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1));

    }
    const onRemoveCartItem = (id) => {
        dispatch(deleteCartItem({ productId: id }));
    }

    function Details({ defaultOpen = false, title, children }) {
        function handleKey({ key }) {
          [" ", "return"].includes(key) && setOpen(o => !o);
        }
        const [open, setOpen] = React.useState(defaultOpen);
        
        return (
          <details
            open={defaultOpen}
            onKeyDown={handleKey}
            onClick={() => setOpen(o => !o)}
          >
            <summary> {title}</summary>
            {open && children}
          </details>
        );
      }
      if(props.onlyCartItems){
          return(
              <>
                {
                        cartItems && Object.keys(cartItems).map((key, ind) =>
                        <CartItem
                        key={ind}
                        onQuantityIncre={onQuantityIncrement}
                        onQuantityDecre={onQuantityDecrement}
                        onRemoveCartItem={onRemoveCartItem}
                        cartItem={cartItems[key]}
                        />
                        )
                    }
              </>
          )
      }
    return (
        <>
            <div className="cart-page-container">
                <div className="cart-item left">
                    <div className="cart-header">
                        <h3>cart items</h3>
                        <select className="select-option" name="" id="">
                       

                            <option value="asc">low to high Price</option>
                        
                            <option value="desc">high to low Price</option>
                       
                        </select>
                    </div>
                    <div className="cart-item-body">
                    {
                        cartItems && Object.keys(cartItems).map((key, ind) =>
                        <CartItem
                        key={ind}
                        onQuantityIncre={onQuantityIncrement}
                        onQuantityDecre={onQuantityDecrement}
                        onRemoveCartItem={onRemoveCartItem}
                        cartItem={cartItems[key]}
                        />
                        )
                    }
                  
                    </div>
                    <div className="cart-footer">
                        <button onClick={() => 
                            props.history.push('/checkout')
                        } className='btn btn-warning'>order now</button>
                    </div>
                </div>
                <div className="cart-item right">
                    <div className="cart-quantity cart-header">
                        <h3>Total Quantity</h3>
                        <h4>

                            {
                                Object.keys(cart.cartItems).reduce((qty, key) => {

                                    return qty + cart.cartItems[key].qty;
                                }, 0
                                )
                            }
                        </h4>

                    </div>
                    <div className="cart-price">
                        <div className="items">
                            <div>

                            <h3> Cart Items </h3>
                            {Object.keys(cart.cartItems).map((key, ind) =>
                                // console.log(cart.cartItems[item].name)
                                // <details>
                                //     <summery>{cart.cartItems[key].name}</summery>

                                //     <h4>{cart.cartItems[key].price}</h4>

                                //     <h4>{cart.cartItems[key].qty}</h4>
                                // </details>
                                  <Details key={ind} title={cart.cartItems[key].name} defaultOpen={false}>
                                  <h4>Price: {cart.cartItems[key].price}</h4>
                                    <h4>quantity :{cart.cartItems[key].qty}</h4>
                                </Details>
                                )}
                                </div>
                                <div>
                                    <h3>total price</h3>
                                    <h4>
                                       rs &nbsp;
                                    
                                        {
                                            Object.keys(cart.cartItems).reduce((totalPrice,key) => {
                                                const {price,qty} = cart.cartItems[key];
                                                return  totalPrice + price *qty
                                                
                                                
                                            },0
                                            
                                            )
                                        }
                                    
                                    </h4>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default CartPage;