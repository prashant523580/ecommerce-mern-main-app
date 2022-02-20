import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../actions";
import Card from "../../components/ui/card/index.card";
import { generateImgUrl } from "../../urlConfig";

const OrderDetails = (props) => {
    const auth = useSelector(state => state.auth)
    const { orderDetails } = auth;
    const dispatch = useDispatch();
    const { oId } = props.match.params;
    useEffect(() => {
        const payload = { orderID: oId }
        dispatch(getOrderDetails(payload))
    }, []);
    const formateDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getFullYear()}- ${d.getMonth()}-${d.getDate()}`
        }
        return '';
    };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };
    // console.log(orderDetails)

    if (!(orderDetails && orderDetails.address)) {
        return null
    }
    return (
        <>
            <div className="page-container">
                <div className="row">
                    <div className="detail-container">
                        <div className="order-details">
                            <Card header={
                                {
                                    leftHeader: "delivery Addresss"
                                }
                            }>
                                <div className="order-detail">

                                    <div>Name : {orderDetails.address.name}</div>
                                    <div>Address : {orderDetails.address.address}</div>
                                    <div>Phone : {orderDetails.address.phone}</div>
                                    <div>City : {orderDetails.address.city}</div>
                                </div>
                                <div className="order-actions buttons">
                                    <button className="button">more action</button>
                                    <button className="button">download Invoice</button>
                                </div>

                            </Card>
                            <Card
                                header={{

                                    leftHeader: "items"
                                }
                                }
                            >
                                {
                                    orderDetails.items.map((item, ind) => (

                                        <div className="items" key={ind}>
                                            <div className="details">

                                                <div className="image-container">
                                                    <div className="img">

                                                    <img src={generateImgUrl(item.productId.productPicture[0].img)} alt="" />
                                                    </div>
                                                </div>
                                                <div className="item-details">
                                                    <div> {item.productId.name.split(" ",3)}</div>
                                                    <div> Payable price : {item.payablePrice}</div>

                                                </div>
                                            </div>
                                            <div className="item-track">
                                                {
                                                    orderDetails.orderStatus.map((status, ind) => (
                                                        <div key={ind} className={`status-container ${status.isCompleted ? "active" : ""}`}>
                                                            <div className={`point ${status.isCompleted ? "active" : ""}`}></div>
                                                            <div className="order-info">
                                                                <div className="status">{status.type}</div>
                                                                <div className="date">{formateDate(status.date)}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="delivery">
                                                {orderDetails.orderStatus[0].isCompleted &&
                                                 <div> 
                                                     <span>Deliverd on</span>
                                                     <span className="delivery-date">

                                                     {
                                                         ` ${formatDate2(orderDetails.orderStatus[0].date)}`
                                                         
                                                        }
                                                        </span>
                                                 </div> 
                                                }
                                            </div>
                                        </div>
                                    )
                                    )
                                }
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="row">

                </div>
            </div>
            
        </>
    )
}

export default OrderDetails;