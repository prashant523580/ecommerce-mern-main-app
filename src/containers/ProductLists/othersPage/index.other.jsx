import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductBySlug } from "../../../actions";
import { generateImgUrl } from "../../../urlConfig";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const OtherStore = (props) => {

    let dispatch = useDispatch();
    let products = useSelector(state => state.product);
    // let productByPrice = useSelector(state => state.productsByPrice);
    useEffect(() => {
        const { match } = props;

        dispatch(getProductBySlug(match.params.slug))
        // console.log(Object.keys(products.productsByPrice))
    }, [props]);

    return (
        <>
            <div className="container">

                <div className="card">
                    <div className="card-header">
                        <h2>All</h2>
                    </div>
                    <div className="card-body" >
                        {
                            products.products.map((product, ind) => {
                                return (

                                    <Link to={`/${product.slug}/${product._id}/p`} key={ind} className="product" >

                                        <div className="product-img">
                                            <img src={`${generateImgUrl(product.productPicture[0].img)}`} alt={product.name} />
                                        </div>

                                        <div className="product-details">
                                            <p> {product.name}</p>
                                            <p><span>rating</span> <span></span></p>
                                            <p>rs{product.price}</p>
                                        </div>
                                        <div className="card-btns">
                                                <button className="btn">add to cart</button>
                                                <button className="btn"><FavoriteBorderIcon/></button>
                                         </div>
                                    </Link>

                                )
                            })
                        }

                    </div>
                </div>

                
                  
                
            </div>
        </>
    )
}

export default OtherStore;