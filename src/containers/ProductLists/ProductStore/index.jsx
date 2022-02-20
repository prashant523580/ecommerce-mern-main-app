import React, { useEffect,useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useHref, Link } from "react-router-dom";
import { getProductBySlug } from "../../../actions";
import { generateImgUrl } from "../../../urlConfig";

import './style.css';
const ProductStore = (props) => {
    let [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under20k: 20000,
        under30k: 30000,
        under60k: 60000,
        above60k: "...."
    });
    let dispatch = useDispatch();
    let products = useSelector(state => state.product);
    // let productByPrice = useSelector(state => state.productsByPrice);
    useEffect(() => {
    const {match} = props;
    
        dispatch(getProductBySlug(match.params.slug))
        // console.log(Object.keys(products.productsByPrice))
    }, []);
   
    return (
        <>
            <div className="container">
                {
                    Object.keys(products.productsByPrice).map((key, ind) => {
                        return (
                            <div className="card" key={ind}>
                                <div className="card-header">
                                    <h1> {priceRange[key]} </h1>
                                    <button>view all</button>
                                </div>
                                <div className="card-body" >
                                        {
                                           products.productsByPrice[key].map((product, ind) => {
                                                return (
                                                    
                                                        <Link to={`/${product.slug}/${product._id}/p`} key={ind} className="product" >

                                                            <div className="product-img">
                                                             <img src={`${generateImgUrl(product.productPicture[0].img)}`} alt="" />
                                                            </div>

                                                            <div className="product-details">
                                                                <p> {product.name}</p>
                                                                <p><span>rating</span> <span></span></p>
                                                                <p>{product.price}</p>
                                                            </div>
                                                        </Link>
                                                    
                                                )
                                            })
                                        }
                                   
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </>
    )
}

export default ProductStore;