import React, { useState } from "react";
import { useEffect } from "react";
import "./productCarousel.css";
import {useSwipeable} from "react-swipeable";
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { width } from "@mui/system";
export const ProductCarouselItem = ({ children, width }) => {
    return (
        <div className="slide" style={{ width: width }}>
            {children}
        </div>
    )
}

const ProductCarousel = ({children}) => {
   
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    const [activeIndex, setActiveIndex] = useState(0);
    const [pause,setPause] = useState(0);
   
    const updateProductActive = (currentActive) => {
        if (currentActive < 0) {
     
            currentActive = React.Children.count(children) - 1;
        } else if (currentActive >= React.Children.count(children)) {
            currentActive = 0;
           
        }
        setActiveIndex(currentActive);
    }
    useEffect(()=> {
        const interval = setInterval(() => {
            if(!pause){

                updateProductActive(activeIndex + 1)
            }
        },3000);
        return () => {
            if(interval){
                    clearInterval(interval)
                
            }
        }
    });
    const handlers = useSwipeable({
        onSwipedRight : () => updateProductActive(activeIndex +1),
        onSwipedLeft: ()=> updateProductActive(activeIndex -1)
    })
    return (
        <>
            <div className="product-carousel-container">

                <div className="carousel" 
                {...handlers}
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
                >
                   
                    <div className="inner" style={{ transform: `translateX(-${(activeIndex  ) * 100 }px)`,
                    //  width: (React.Children.count(children) - 1) * 100 + "px" 
                     }}>
                        {
                            React.Children.map(children, (child, index) => {
                                return React.cloneElement(child, { width: "600px" });
                            })
                        }
                    </div>
                <div className="buttons">
                    <button onClick={() => {
                        updateProductActive(activeIndex - 1)
                    }}>&#8249;</button>

                    <button
                        onClick={() => {
                            updateProductActive(activeIndex + 1)
                        }}
                    >&#8250;</button>
                </div>
                </div>
               
            </div>
        </>
    )
}

export default ProductCarousel;