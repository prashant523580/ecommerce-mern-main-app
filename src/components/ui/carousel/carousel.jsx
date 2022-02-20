import React, { useState } from "react";
import { useEffect } from "react";
import "./carousel.css";
import {useSwipeable} from "react-swipeable";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
export const CarouselItem = ({ children, width }) => {
    return (
        <div className="slide" style={{ width: width }}>
            {children}
        </div>
    )
}
const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [pause,setPause] = useState(0);
   
    const updateActive = (currentActive) => {
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

                updateActive(activeIndex + 1)
            }
        },5000);
        return () => {
            if(interval){
                    clearInterval(interval)
                
            }
        }
    });
    const handlers = useSwipeable({
        onSwipedRight : () => updateActive(activeIndex-1),
        onSwipedLeft: ()=> updateActive(activeIndex +1)
    })
    return (
        <>
            <div className="carousel-container">

                <div className="carousel" 
                {...handlers}
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
                >
                   
                    <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)`,
                    //  width: (React.Children.count(children) - 1) * 100 + "" 
                     }}>
                        {
                            React.Children.map(children, (child, index) => {
                                return React.cloneElement(child, { width: "100%" });
                            })
                        }
                    </div>
                <div className="buttons">
                    <button onClick={() => {
                        updateActive(activeIndex - 1)
                    }}>&#8249;</button>
                    {/* {
                        React.Children.map(children, (child, index) => {
                            return (
                                <button
                                className={`${activeIndex=== index ? "active" : ""}`}
                                onClick={() => {
                                    updateActive(index)
                                }}>
                                    {index + 1}
                                </button>
                            )
                        })
                    } */}
                    
                        <button
                        onClick={() => {
                            updateActive(activeIndex + 1)
                        }}
                        >&#8250;</button>
                    
                </div>
                </div>
            </div>
        </>
    )
}

export default Carousel;