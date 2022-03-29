import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { getProductPage } from "../../../actions";
import Card from "../../../components/ui/card/index.card";
import Carousel, { CarouselItem } from "../../../components/ui/carousel/carousel";
import { generateImgUrl } from "../../../urlConfig";
import getParam from "../../../utils/getParam";


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page,products } = product;
    // console.log(products)
    useEffect(() => {
        const param = getParam(props.location.search);
        const payload = {
            param
        }

        dispatch(getProductPage(payload));
    },[props])

    return (
        <>
            <Carousel>
                {
                    page.banners && page.banners.map((banner, ind) =>
                        <CarouselItem key={ind}>
                            <Link to={`/${banner.navigateTo}`} >
                                <img src={banner.img} alt={banner.img} />
                            </Link>
                        </CarouselItem>
                    )
                }
            </Carousel>

            <Card header={{
                leftHeader : products.length > 0 && products[0].category.name
            }
            } >
                          {
                              products.map((product,ind) => 
                              <Link className="product-link" to={`/${product.slug}/${product._id}/p`} key={ind}>
                              <div className="product">
                                  <div className=" product-img">

                                         <img src={generateImgUrl(product.productPicture[0].img)} alt={product.name} />
                                  </div>
                                  <div className="product-details">
                                      <div className="product-name">{product.name}</div>
                                      <div className="product-price">Rs {product.price}</div>
                                  </div>
                                  <div className="card-btns">
                                                <button className="btn">add to cart</button>
                                                <button className="btn"><FavoriteBorderIcon/></button>
                                         </div>
                              </div>
                              </Link>
                              )
                          }
</Card>
</>
    )
}

export default ProductPage;