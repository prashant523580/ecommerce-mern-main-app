import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Card from "../../components/ui/card/index.card";
import { generateImgUrl } from "../../urlConfig";
import "./style.css"
const OrderPage = (props) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const  [order,setOrder] = useState(auth.orders);
    useEffect(() => {
        dispatch(getOrders());
    },[dispatch]);
    useEffect(() => {

        setOrder(auth.orders)
    },[auth.orders])
    
    
    return (
        <>
            <div className="page-container">
                <div className="row orders">

                    {order.map((ord, ind) =>
                        <Card
                            key={ind}
                            header={
                                {

                                    leftHeader: `Payment status:${ord.paymentStatus}`,
                                    rightHeader: `order ID:${ord._id}`
                                }
                            }
                        >
                            {

                           ord.items.map((item, ind) => {
                               console.log(item)
                                    return (
                                        // <NavLink key={ind} title="click to view order details" to={`/orderDetails/${ord._id}`}>
                                        //     <div className="img-container">
                                        //         <img src={generateImgUrl(item.productId.productPicture[0].img)} alt={item.productId.name} />
                                        //     </div>
                                        //     <div className="order-details">

                                        //         <div className="product-name"> <p>
                                        //             {item.productId.name.split(" ", 3)}
                                        //         </p>

                                        //         </div>
                                        //         <div className="product-price">price {item.payablePrice}</div>
                                        //     </div>
                                        // </NavLink>
                                        <Link key={ind} title="click to view order details" to={`/orderDetails/${ord._id}`}>

                                        <div className="product">
                                        <div className=" product-img">
                    
                                        <img src={generateImgUrl(item.productId.productPicture[0].img)} alt={item.productId.name} />
                                        </div>
                                        <div className="product-details">
                                            <div className='product-name'>{item.productId.name.split(' ',3)}</div>
                                            <div className='product-price'>Rs.{item.payablePrice}</div>
                                        </div>
                                    </div>
                                        </Link>
                                    )
                                }
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