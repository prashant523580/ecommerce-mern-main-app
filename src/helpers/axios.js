import axios from "axios";
import { authConstants } from "../actions/constant";
import store from "../store";
import { api } from "../urlConfig";
// import store from "../store/index";
const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
        baseURL: api,
        headers:{
                "Content-Type": "application/json",
                "Authorization" : token ? token : ""
        },
});


axiosInstance.interceptors.response.use(
        (res) => {
          return res;
        },
        (error) => {
          // console.log(error.response);
          const status = error.response ? error.response.status : 500;
          if (status && status == 500) {
            localStorage.clear();
            store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
          }
          return Promise.reject(error);
        }
      );
      
export default axiosInstance;
