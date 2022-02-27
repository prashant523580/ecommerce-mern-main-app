import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProductDetailsById } from "../../actions";
import { generateImgUrl } from "../../urlConfig";
import "./style.css";
import "./responsive.css";
import Carousel, { CarouselItem } from "../../components/ui/carousel/carousel";

const ProductDetailPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const {productDetails}= product;
    const [previewImg,setPreviewImg] = useState();
    // const cart = useSelector(state => state.cart);
    useEffect(() => {
        const { productId } = props.match.params;

        const payload = {
            params: {

                productId
            }
        }
        dispatch(getProductDetailsById(payload));
    }, [dispatch]);
    useEffect(() => {
        if(productDetails.productPicture){
            setPreviewImg(productDetails.productPicture[0].img);
            
        }

    },[productDetails])
    const addTOCart = () => {
        let {_id,name,price}= productDetails;
        let img = productDetails.productPicture[0].img;
        dispatch(addToCart({_id,name,price,img}));

        props.history.push("/cart")
    }
 
    const previewImgClick = (img) => {
        setPreviewImg(img)
    }
    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }
    const imageZoom =(e) => {
        console.log(e.target)
    }
    return (
        <>
            <div className="product-details-container">
                <div className="product-img-preview">
                    <div className="images">
                            { window.innerWidth >= 680 ? (
                        <div className="vertical-img-stack">
                            {

                                product.productDetails.productPicture.map((thumb, ind) => 
                                <div className="thumbnail" key={ind} onMouseEnter={ () =>previewImgClick(thumb.img)}>
                                        <img src={generateImgUrl(thumb.img)}  alt={thumb.img} />
                                    </div>
                                )
                            }
                        </div>
                                ) : (
                                    <Carousel>
                                        {
                                            product.productDetails.productPicture.map((thumb, ind) => 
                                        
                                                   <CarouselItem key={ind}>

                                                       <img onClick={imageZoom} src={generateImgUrl(thumb.img)}  alt={thumb.img} />
                                                   </CarouselItem> 
                                            )
                                     }
                                 </Carousel>)
                            }
                        {
                            window.innerWidth >= 680 ? (

                                <div className="picture-preview">
                            <div className="preview">
                                {/* <img src={generateImgUrl(product.productDetails.productPicture[0].img)} /> */}
                                <img src={generateImgUrl(previewImg)} alt={"current-product"} />
                            </div>
                        </div> 
                                )
                                : null
                            }
                            </div>
                    <div className="buttons">
                        <button onClick={addTOCart} className="btn"> {"add to cart"}</button>
                        <button className="btn" onClick={() => {
                            addTOCart()
                            props.history.push("/checkout")
                            
                        }}>buy</button>
                    </div>
                </div>
                <div className="product-description">
                    <div className="breed">
                        <ul>
                            <li>
                                <a href="#">home</a> &gt;
                            </li>
                            <li>
                                <a href="#">Mobiles</a> &gt;
                            </li>
                            <li>
                                <a href="#">Samsung</a> &gt;
                            </li>
                            <li>
                                <a href="#">{product.productDetails.name.split(" ",3)}</a>
                            </li>
                        </ul>
                    </div>
                    <div className="product-details">
                        <h3>{product.productDetails.name}</h3>
                        <div className="rating">
                            <div className="rating-count">
                                3.4★
                            </div>
                            <div className="rating-number">
                                72,234 Ratings & 8,140 Reviews
                            </div>
                        </div>
                        <div className="extra-offer">
                            Extra
                            4500 off{" "}
                        </div>
                        <div className="price-container">
                            <div className="price">Rs.{product.productDetails.price}</div>
                            <div className="discount">25% off</div>
                        </div>
                        <div className="available-offers">
                            <h4>Available Offer</h4>
                            <div className="offer">
                                <p>Bank Offer20% Instant discount of up to ₹200 on First time Dhani One Freedom Card Txn, TnC ApplicableT&C</p>
                                <p>Partner OfferSign up for Flipkart Pay Later and get Flipkart Gift Card worth ₹100*Know More</p>
                                <p>Special PriceGet extra 10% off (price inclusive of discount)</p>
                                <p>Bank Offer20% Instant discount of up to ₹200 on First time Dhani One Freedom Card Txn, TnC ApplicableT&C</p>
                                <p> + more offer</p>
                            </div>
                        </div>
                        <div className="description">
                            <h4>Description</h4>
                            <p>{product.productDetails.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailPage;