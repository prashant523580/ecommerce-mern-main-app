import { applyMiddleware, createStore } from "redux";
// import {configureStore} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
// const store = configureStore(rootReducer);
export default store