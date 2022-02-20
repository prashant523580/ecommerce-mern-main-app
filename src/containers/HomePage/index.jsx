import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProduct } from '../../actions';
import Card from '../../components/ui/card/index.card';
import Carousel, { CarouselItem } from '../../components/ui/carousel/carousel';
import { generateImgUrl } from '../../urlConfig';
// import "./style.scss";

function HomePage(props) {
    const productPage = useSelector(state => state.product);
    const { products, page, category } = productPage;
    const [carouselImg, setCarouselImg] = useState();
    const [categories, setCategories] = useState(category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProduct());

    }, []);
    const productCategory = (category) => {

        // console.log(header) 
        let categories = [];

        products.filter((product) => {
            if (product.category.name === category) {
                // return product
                categories.push(product)
            }
        });
        let currentCategoryProduct =  categories.map((product,ind) => {
            return(
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
        })

        // console.log(currentCategoryProduct)
        return currentCategoryProduct;

    }

    const getProductByCategory = (products) => {

        //    console.log(productCategory(header[1],products));

        let header = products.reduce((values, product) => {
            if (!values.includes(product.category.name)) {
                values.push(product.category.name)
            }
            return values
        }, []);
        setCategories(productCategory(header[1]));

    }
    useEffect(() => {
        getProductByCategory(products)
        // console.log(category)
        // console.log(categories)
    }, [products])
    return (
        <>
            <div className="page-container">

                <Carousel>
                    {

                        //    page.length > 0 &&  page.map((banner,ind) => 
                        //    {
                        //         // return <CarouselItem key={ind}><img src={banner}/></CarouselItem>
                        // })


                    }

                    <CarouselItem><img src={page[5]} /></CarouselItem>
                    <CarouselItem><img src={page[0]} /></CarouselItem>
                    <CarouselItem><img src={page[2]} /></CarouselItem>
                    <CarouselItem><img src={page[6]} /></CarouselItem>
                    <CarouselItem><img src={page[8]} /></CarouselItem>

                </Carousel>
                {
                    category.map((cate, ind) => {
                        return (

            <Card key={ind} header={{

                leftHeader: cate
            }
            } >
                     
                         
                          
                            {productCategory(cate)}
                          
                     
                  
</Card>
                            // <section key={ind}>
                                
                            //     <div className="head">
                            //         <div className="category">
                            //             {cate}
                            //         </div>
                            //     </div>
                            //     <div className="body">
                            //         <div className="name">{productCategory(cate)}</div>
                            //     </div>
                            // </section>
                        )
                    })


                }
            </div>
        </>
    )
}

export default HomePage;
