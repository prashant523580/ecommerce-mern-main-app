import axios from "../helpers/axios";
import { CategoryConstants } from "./constant";

export const getAllCategory = () => {
    return async dispatch => {
        try{

            const res = await axios.get(`/category/getcategory`);
            dispatch({
                type:CategoryConstants.GET_CATEGORY_REQUEST
            })
            if(res.status === 200){
                const categoryList = res.data;
                dispatch({
                    type: CategoryConstants.GET_CATEGORY_SUCCESS,
                    payload: {
                        categories : categoryList
                    }
                })
            }else{
                dispatch({
                    type: CategoryConstants.GET_CATEGORY_FAILURE,
                    payload: {
                        error : res.data.error
                    }
                })
            }
        }catch(err){
            console.log(err)
        }
        }
    }

export const addCategory = (form) => {
    console.log(form)
    return async dispatch => {
        dispatch({type: CategoryConstants.ADD_CATEGORY_REQUEST})
        const res = await axios.post(`/category/create`,form);
        console.log(res)
        if(res.status === 201){
            dispatch({
                type : CategoryConstants.ADD_CATEGORY_SUCCESS,
                payload: {
                 category: res.data.category
                }
                })
        }else{
            dispatch({
                type : CategoryConstants.ADD_CATEGORY_FAILURE,
                payload:{
                    error : res.data.error
                } 
            })
            
        }

    }
}