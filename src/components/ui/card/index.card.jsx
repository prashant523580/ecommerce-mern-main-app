import React from "react";
import "./style.css"

const Card = (props) => {
    return (
        <div className="card" {...props}>
           {props.header && 
            <div className="card-header">
               <div>
                    {props.header.leftHeader}
                   </div>
                   <div>
                    {props.header.rightHeader}   
                     </div>
            </div>
           }
            <div className="card-body">
                {props.children}


            </div>
            
        </div>
    )
}

export default Card;