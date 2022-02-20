import axios from "../helpers/axios"
import { productsConstants } from "./constant";

export const getAllProduct = () => {
    return async dispatch => {
        dispatch({
            type: productsConstants.GET_ALL_PRODUCTS_REQUEST
        })
        const res = await axios.post("/product/getproduct");
        // console.log(res)
        if (res.status === 200) {
            const { products,page } = res.data;
            dispatch({
                type: productsConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products,page }
            })
        } else {
            dispatch({
                type: productsConstants.GET_ALL_PRODUCTS_FAILURE,
                error: res.data.error
            })
        }
    }
}
export const getProductBySlug = (slug) => {

    return async (dispatch) => {
        const res = await axios.get(`/product/slug/${slug}`);
        if (res.status === 200) {
            dispatch({
                type: productsConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload: {
                    products: res.data.currentProducts,
                    productsByPrice: res.data.productByPrice

                }
            })
        }
    }
}
export const getProductPage = (payload) => {

    return async (dispatch) => {
        const { cid, type } = payload.param;
        // console.log(cid,type)
        dispatch({
            type: productsConstants.GET_PRODUCT_PAGE_REQUEST
        });
        const res = await axios.get(`/page/${cid}/${type}`);
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: productsConstants.GET_PRODUCT_PAGE_SUCCESS,
                payload: {
                    page: res.data.page,
                    products : res.data.products
                }
            })
        } else {
            dispatch({
                type: productsConstants.GET_ALL_PRODUCTS_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}
export const getProductDetailsById = (payload) => {

    return async dispatch => {
        dispatch({
            type: productsConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST
        })
        let res;
        try{
            const {productId} = payload.params;
            console.log(productId)
             res = await axios.get(`/product/${productId}`);
             console.log(res)
             dispatch({
                 type: productsConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                 payload: {
                     productDetails: res.data.product
                 }
             })
        }catch(err){
            console.log(err)
            // dispatch
        }
    }
}
