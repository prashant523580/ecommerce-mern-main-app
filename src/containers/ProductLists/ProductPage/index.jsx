import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { getProductPage } from "../../../actions";
import Card from "../../../components/ui/card/index.card";
import Carousel, { CarouselItem } from "../../../components/ui/carousel/carousel";
import ProductCarousel, { ProductCarouselItem } from "../../../components/ui/carousel/ProductCarousel";
import { generateImgUrl } from "../../../urlConfig";
import getParam from "../../../utils/getParam";


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
    },[])

    return (
        <>
            <Carousel>
                {
                    page.banners && page.banners.map((banner, ind) =>
                        <CarouselItem key={ind}>
                            <a href={`/${banner.navigateTo}`} >
                                <img src={banner.img} alt="" />
                            </a>
                        </CarouselItem>
                    )
                }
            </Carousel>

            <Card header={{

                leftHeader: products.length > 0 && products[0].category.name
            }
            } >
                     
                          {/* {
                              page.products &&   page.products.map((product,ind) => 
                
                              <div className="product">
                                  <div className=" product-img">

                                  <img src={product.img} alt={product.img} />
                                  </div>
                              </div>
                              )
                          } */}
                          {
                              products.map((product,ind) => 
                              <Link to={`/${product.slug}/${product._id}/p`} key={ind}>
                              <div className="product">
                                  <div className=" product-img">

                                  <img src={generateImgUrl(product.productPicture[0].img)} alt={product.name} />
                                  </div>
                                  <div className="product-details">
                                      <span>{product.name.split(' ',3)}</span>
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