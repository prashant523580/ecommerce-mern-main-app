import axios from "../helpers/axios";
import { authConstants, CategoryConstants,
      productsConstants
    } from "./constant"
export const getInitialData = () => {

    return async dispatch => { 
        const res = await axios.get("/initialdata");
        if(res.status === 200){
            const {categories,products,order } = res.data;
            dispatch({
                type : CategoryConstants.GET_CATEGORY_SUCCESS,
                payload:{
                    categories
                }
            });
            dispatch({
                type: productsConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: {
                    products
                }
            })

               
            
        }
    }
}