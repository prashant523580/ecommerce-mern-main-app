import axios from "../helpers/axios"
// import { api } from "../urlConfig";
import { authConstants, userConstants } from "./constant"
export const UserSignup = (user) => {
    // console.log(user)
    return async (dispatch)=> {
        dispatch({type:userConstants.USER_REGISTER_REQUEST});

        // const res = await fetch(api+"/admin/signup",{
        //     method:"post",
        //     headers:{
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({...user})
        // });
        try{

            const res = await axios.post("/signup",{
                ...user
            });
            if(res.status === 201){
                const {message,token,user} = res.data;
                localStorage.setItem('token',token);
                localStorage.setItem("user", JSON.stringify(user))
                dispatch({
                    type: userConstants.USER_REGISTER_SUCCESS,
                    payload:{
                        token,
                        message,user
                    }
                })
                dispatch({type: authConstants.LOGIN_SUCCESS,
                    payload:{
                        token,
                        user
                    }
                })
            }
        }catch(err){
            console.log(err.response.data.error)
            dispatch({
                type:userConstants.USER_REGISTER_FAILURE,
                payload:{error: err.response.data.error}
            })
        }
        }
    }