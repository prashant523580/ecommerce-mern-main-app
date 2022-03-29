import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProduct } from '../../actions';
import Card from '../../components/ui/card/index.card';
import Carousel, { CarouselItem } from '../../components/ui/carousel/carousel';
import ProductCarousel from '../../components/ui/carousel/ProductCarousel';
import { generateImgUrl } from '../../urlConfig';
// import "./style.scss";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function HomePage(props) {
    const productPage = useSelector(state => state.product);
    const { products, page, category } = productPage;
    const [screenWidth,setScreenWidth] = useState(0);
    // const [categories, setCategories] = useState(category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProduct());
    }, []);


    

    const productCategory = (category) => {

        // console.log(header) 
        let categories = [];

        if (products.length > 0) {
            products.filter((product) => {
                //    console.log(product.category.name)
                if (product.category.name === category) {
                    //    console.log(product)
                    categories.push(product)
                }
            });
        }
        // console.log(categories)
        let currentCategoryProduct = categories.map((product, ind) => {
            return (
                <Link to={`/${product.slug}/${product._id}/p`} key={ind} >
                    <div className="product">
                        <div className=" product-img">

                            <img src={generateImgUrl(product.productPicture[0].img)} alt={product.productPicture[0].img} />
                        </div>
                        <div className="product-details">
                            <div className='product-name'>{product.name}</div>
                            <div className='product-price'>Rs.{product.price}</div>
                        </div>
                        <div className="card-btns">
                            <button className="btn">add to cart</button>
                            <button className="btn"><FavoriteBorderIcon/> </button>
                        </div>
                    </div>
                </Link>

            )
        })

        // console.log(currentCategoryProduct)
        return currentCategoryProduct;

    }

    // const getProductByCategory = (products) => {

    //     //    console.log(productCategory(header[1],products));

    //     let header = products.reduce((values, product) => {
    //         if (!values.includes(product.category.name)) {
    //             values.push(product.category.name)
    //         }
    //         return values
    //     }, []);
    //     setCategories(productCategory(header[1]));

    // }

    return (
        <>
            <div className="page-container">

                <Carousel>
                    <CarouselItem><img src={page[1]} alt="carousel1" /></CarouselItem>
                    <CarouselItem><img src={page[0]} alt="carousel1" /></CarouselItem>
                    <CarouselItem><img src={page[2]} alt="carousel1" /></CarouselItem>
                    <CarouselItem><img src={page[5]} alt="carousel1" /></CarouselItem>
                    <CarouselItem><img src={page[4]} alt="carousel1" /></CarouselItem>
                    <CarouselItem><img src={page[2]} alt="carousel1" /></CarouselItem>
                    <CarouselItem><img src={page[3]} alt="carousel1" /></CarouselItem>

                </Carousel>
                {
                    category.length > 0 && category.map((cate, ind) => {
                        return (

                            <Card key={ind} header={{

                                leftHeader: cate
                            }
                            } >
                            {/* <ProductCarousel show={ 5}> */}
                                <ProductCarousel show={ window.innerWidth < 680  ? ( (window.innerWidth < 460) ? 2: 3) : 5}>

                                    {productCategory(cate)}
                                </ProductCarousel>



                            </Card>
                        )
                    })
                }
            </div>
        </>
    )
}

export default HomePage;
