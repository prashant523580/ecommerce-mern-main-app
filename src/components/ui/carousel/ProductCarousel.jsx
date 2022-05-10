import React, { useEffect, useState } from "react";
import "./productCarousel.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const ProductCarousel = (props) =>{
    const {children, show} = props
    
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    
    const [touchPosition, setTouchPosition] = useState(null)
    
    useEffect(() => {
        function resizeWindow(){
            let clientX = window.pageXOffset;
            // console.log(clientX)
            // console.log(window.innerWidth)
        }
        window.addEventListener("resize",resizeWindow)
    })
    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }
    return(
        <>  <div className="product-carousel-container">
        <div className="carousel-wrapper">
            {/* You can alwas change the content of the button to other things */}
            {
                currentIndex > 0 &&
                <button onClick={prev} className="left-arrow">
                    <ArrowBackIosNewIcon/>
                </button>
            }
            <div
                className="carousel-content-wrapper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <div
                    className={`carousel-content show-${show}`}
                    style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                >
                    {children}
                </div>
            </div>
            {/* You can alwas change the content of the button to other things */}
            {
                currentIndex < (length - show) &&
                <button onClick={next} className="right-arrow">
                    <ArrowForwardIosIcon/>
                </button>
            }
        </div>
    </div>

        </>
    )
} 
export default ProductCarousel;