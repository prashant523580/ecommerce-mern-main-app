import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducer";
import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";
import cartReducer from "./cart.reducer";

const rootReducer = combineReducers({
    auth : authReducer,
    user : userReducer,
    category : categoryReducer,
    product:productReducer,
    cart: cartReducer
});
export default rootReducer;