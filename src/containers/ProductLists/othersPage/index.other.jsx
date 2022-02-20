import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductBySlug } from "../../../actions";
import { generateImgUrl } from "../../../urlConfig";

const OtherStore = (props) => {

    let dispatch = useDispatch();
    let products = useSelector(state => state.product);
    // let productByPrice = useSelector(state => state.productsByPrice);
    useEffect(() => {
        const { match } = props;

        dispatch(getProductBySlug(match.params.slug))
        // console.log(Object.keys(products.productsByPrice))
    }, []);

    return (
        <>
            <div className="container">

                <div className="card">
                    <div className="card-header">

                    </div>
                    <div className="card-body" >
                        {
                            products.products.map((product, ind) => {
                                return (

                                    <Link to={`/${product.slug}/${product._id}/p`} key={ind} className="product" >

                                        <div className="product-img">
                                            <img src={`${generateImgUrl(product.productPicture[0].img)}`} alt="" />
                                        </div>

                                        <div className="product-details">
                                            <p> {product.name}</p>
                                            <p><span>rating</span> <span></span></p>
                                            <p>rs{product.price}</p>
                                        </div>
                                    </Link>

                                )
                            })
                        }

                    </div>
                </div>

                )
                  
                
            </div>
        </>
    )
}

export default OtherStore;