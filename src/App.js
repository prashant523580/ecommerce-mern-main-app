import React, { useEffect } from "react";
import logo from './logo.svg';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { getAllCategory, getAllProduct, getCartItems, getInitialData, isUserLoggedIn, updateCart } from "./actions"
import HomePage from "./containers/HomePage/index";
import Header from "./components/headers/index";
import Menu from "./components/Menu/index";
import Footer from "./components/footers";
import { Route,Switch} from 'react-router-dom';
import ProductLists from "./containers/ProductLists/index";
import ProductDetailPage from "./containers/ProductDetails/index.productDetails";
import CartPage from "./containers/CartPage/index.cart";
import CheckoutPage from "./containers/checkoutPage/index.checkout";
import OrderPage from "./containers/orderPage/index.order";
import OrderDetails from "./containers/orderPage/orderDetails";
function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);
  // const category = useSelector(state => state.category);
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllProduct());
    // dispatch(getInitialData());  
  },[])

  useEffect(()=> {
    if(!auth.authenticate)(
      dispatch(isUserLoggedIn())
    )
  },[auth.authenticate])
  useEffect(() => {
    if(auth.authenticate){
      dispatch(updateCart());
    }
  },[auth.authenticate])
  return (
    <>

      <Header />
      <Menu />
      <Switch>
          <Route exact path={"/"} component={HomePage} />
          <Route exact path="/cart" component={CartPage}/>
          <Route exact path="/checkout" component={CheckoutPage}/>
          <Route exact path="/account/orders" component={OrderPage}/>
          <Route exact path="/orderDetails/:oId" component={OrderDetails}/>
          <Route exact path={"/:productSlug/:productId/p"} component={ProductDetailPage}/>
          <Route exact  path={"/:slug"} component={ProductLists} />
        
      </Switch>
      <Footer />
    
        
    </>
  );
}

export default App;
