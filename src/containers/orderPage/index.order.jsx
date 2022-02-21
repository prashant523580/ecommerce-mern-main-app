import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Card from "../../components/ui/card/index.card";
import { generateImgUrl } from "../../urlConfig";
import "./style.css"
const OrderPage = (props) =>{
    const auth = useSelector(state => state.auth);
    const [orders,setOrders] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
    },[])
    // useEffect(() => {
    //     setOrders(auth.orders);
   
    // },[auth.orders]);
    if(auth.orders.length > 0){

        console.log(auth.orders)
    }
    return(
        <>
            <div className="page-container">
                <div className="row orders">
                    
                    {auth.orders.length > 0 && auth.orders.map((ord,ind) => 
                        <Card
                         key={ind}
                        header={
                            {

                                leftHeader:"Payment",
                                rightHeader:ord.paymentStatus
                            }
                        }
                        >
                            {
                               ord.items.length > 0 && ord.items.map((item,ind) =>
                                
                            <Link key={ind} title="click to view order details" to={`/orderDetails/${ord._id}`}>
                                <div className="img-container">
                                    <img src={item && generateImgUrl(item.productId.productPicture[0].img)} alt={item.productId.name} />    
                                </div> 
                                <div className="order-details">
                                    
                                    <div className="product-name"> <p>
                                        {item.productId.name.split(" ",3)}
                                        </p>

                                        </div>
                                    <div className="product-price"> price{ord.items[0].payablePrice}</div>
                                </div>
                            </Link>
                                )
                        }
                        </Card>
                    )}
                </div>
                <div className="row">

                </div>

            </div>
        </>
    )
}

export default OrderPage;