import React from "react";

import './style.css';
import ProductStore from "./ProductStore";
import   getParam from "../../utils/getParam";
import ProductPage from "./ProductPage";
import OtherStore from "./othersPage/index.other"
// import { useParams } from "react-router-dom";
const ProductLists = (props) => {
    const params = getParam()
    const renderProduct = () => {
        const params  = getParam(props.location.search);
        let content = null;
        switch(params.type){
            case "store":
                content = <ProductStore {...props} />
                break;
            case "page" :
                content = <ProductPage {...props}/>
                break;
                case "product" :
                    content = <OtherStore {...props}/>
                    break;
            default : 
                content = <OtherStore {...props}/>
                break;
        }
        return content;
    }
    return (
        <>
                {renderProduct()}
        </>
    )
}

export default ProductLists;