import React, { useEffect, useState } from 'react'
import { useGesture } from 'react-use-gesture'

import styles from './css/index.module.scss'

const Carousel = props => {
    const containerRef = React.useRef()
    const slideContainerRef = React.useRef()
    const zoomRef = React.useRef(null)
    const [mobile, setMobile] = useState(window.document.body.getBoundingClientRect().width > 720 ? false : true)
    function checkDocumentSize() {
        setMobile(window.document.body.getBoundingClientRect().width > 720 ? false : true);
    }
    
    window.onresize = checkDocumentSize;
    
    const [slidePosition, setSlidePosition] = useState({
        smooth: true,
        currentSlide: props.currentSlide,
        prevTransform: props.initialTransform,
        currentTransform: props.initialTransform
    })
    const zoomDefault =  {
        pinch: null,
        zoom: null,
        smooth: false,
        scale: 1,
        distance: 0,
        origin: {
            x: 0,
            y: 0
        },
        dotOrigin: {
            x: 0,
            y: 0
        },
        initialOrigin: null,
        position: {
            x: 0,
            y: 0
        },
        pinchDistance: 0,
    }
    const [zoom, setZoom] = useState({...zoomDefault})
    

    const slideTo = (index) => {
        let slideToIndex = index;
        if(slideToIndex < 0){
            slideToIndex = props.images.length - 1; 
        }
        else if(slideToIndex > props.images.length - 1){
            slideToIndex = 0;
        }
        const newTransfrom = -((100 / props.images.length) * slideToIndex)
        let delay = zoom.zoom ? 250 : 0
        if(zoom.zoom){
            setZoom({...zoomDefault})
        }
        setTimeout(() => {            
            setSlidePosition({
                ...slidePosition,
                currentSlide: slideToIndex,
                currentTransform: newTransfrom,
                prevTransform: newTransfrom,
            })
        }, delay);
    }

    const dots = (imageList) => {
        if(!imageList || imageList.length < 0){return}
        const dots = imageList.map((image, index) => {
            return <li 
            onClick={() => {
                slideTo(index)
            }}
            key={`carouselDot-${index}`} 
            className={`${styles.dot} ${index === slidePosition.currentSlide ? styles.dot_active : ""}`}
            ></li>
        })
        return <ul className={styles.dotList}>{dots}</ul>
    }
    const arrowNext = () => {
        if(mobile)return
        return <div 
            className={styles.arrowNext}
            onClick={() => {
                slideTo(slidePosition.currentSlide + 1)
            }}
        ></div>
    }
    const arrowPrev = () => {
        if(mobile)return
        return <div 
            className={styles.arrowPrev}
            onClick={() => {
                slideTo(slidePosition.currentSlide - 1)
            }}
        ></div>
    }

    const renderImages = (data) => {
        return data.map((image, index) => {
        return (
            <div
            id={`SLIDE-${index}`}
            className={`${styles.slide} ${zoom.pinch ? styles.showOverflow : ""}`}
            key={`${image}-${index}`}
            style={{width: `${100 / props.images.length}%`}}
            >                    
                <img 
                    style={slidePosition.currentSlide === index ? 
                        {transform: `scale(${zoom.scale}) translate(${zoom.position.x}%, ${zoom.position.y}%)`,
                         transformOrigin: `${zoom.origin.x}% ${zoom.origin.y}%`
                        } : {}}
                    className={`${zoom.smooth && slidePosition.currentSlide === index ? styles.smoothSlide : ""}`}
                    ref={slidePosition.currentSlide === index ? zoomRef : null}
                    src={image.src}
                    alt={image.src}
<<<<<<< HEAD
                    // onTouchStart={(e) => {
                    //     console.log("TOUCH")
                    //     e.preventDefault()
                    // }}
                    onTouchEnd={e => {
                        e.preventDefault()
                    }}
                    onMouseDown={(e) => {
                        // e.preventDefault()
                        // console.log(e)
                        // console.log(e.touches)
                        // console.log(e.type)
                        // if(e.touches && e.touches.length > 0){
                        //     console.log(e.touches)
                        //     alert("touches")
                        //     return
                        // }
                        // alert(e.type)
                        let newScale = zoom.scale + 1
                        let newZoom = true
                        newScale = newScale > 3 ? 1 : newScale
                        newZoom = newScale === 1 ? false : true
                        const position = newScale === 1 ? {x: 0, y: 0} : zoom.position
                        setZoom({
                            ...zoom,
                            zoom: newZoom,
                            scale: newScale,
                            smooth: true,
                            position
                        })
                    }}
=======
>>>>>>> refactor
                />
            </div>
        )
        })
    }

    const moveStartHandeler = (state) => {
    }
    const moveHandler = (state, options) => {
        if(zoom.zoom){
        return}
          const containerWidth = containerRef.current.clientWidth;
          const slideCount = props.images.length
          const slideWidth = 100 / slideCount
          let  transform = slidePosition.prevTransform + ((state.movement[0] * options.direction * options.moveSpeed * 100 / containerWidth) / slideCount)

        if(transform > slideWidth/3){
            return
        }
        if(transform < -100 + (slideWidth/3)*2){
            return
        }
        var index = Math.abs(Math.round(transform/slideWidth))
        index = index > slideCount - 1 ? slideCount - 1 : index

          return setSlidePosition({ 
            ...slidePosition,  
            currentSlide: index,
            currentTransform: transform,
            smooth: false
            })
    }
    const moveEndHandler = (state) => {
        if(zoom.zoom){
        return}

        var positionFix = slidePosition.currentTransform;
        var slideCount = props.images.length;
        var slideWidth = 100 / slideCount;
        positionFix = positionFix > 0 ? 0 : positionFix
        const index = slidePosition.currentSlide

        positionFix = (0 - (slideWidth * index))

        return setSlidePosition({
            ...slidePosition, 
            prevTransform: positionFix,
            currentTransform: positionFix,
            distance: null,
            smooth: true
        })
    }
    const zoomPanHandler = (state) => {
        const {x, y} = {
            x: zoom.origin.x + (state.delta[0]/10)*zoom.scale, 
            y: zoom.origin.y + (state.delta[1]/10)*zoom.scale
        }
        setZoom({
            ...zoom,
            smooth: false,
            origin: {x, y}
        })
    }
    const genericOptions = {
        domTarget: slideContainerRef,
        filterTaps: true,
        eventOptions: {
            passive: false
        }
    }
    const bind = useGesture(
        {
            onDragStart: (state) => {
                moveStartHandeler()
            },
            onDrag: (state) => {
                if(state.event.touches && state.event.touches.length > 1){return}
                if(state.tap){
                    if(state.event.touches)return
                    console.log(state)
                    const targetRect = containerRef.current.getBoundingClientRect()
                    const clientPosition = {x: state.initial[0], y: state.initial[1]}
                    const targetOffset = {x: targetRect.x, y: targetRect.y}
                    const imageRect = zoomRef.current.getBoundingClientRect();
                    const imageOffset = {x: imageRect.x  - targetOffset.x, y: imageRect.y - targetOffset.y}
                    const cursorOnImage = {
                        x: ((clientPosition.x - targetOffset.x - imageOffset.x)*100)/imageRect.width, 
                        y: ((clientPosition.y - targetOffset.y - imageOffset.y)*100)/imageRect.height
                    }
                    const dotOrigin = {
                        x: clientPosition.x - targetOffset.x, 
                        y: clientPosition.y - targetOffset.y
                    }
                    console.log({...imageOffset})
                    const scale = zoom.scale == 1 ? 2 : 1;
                    const zoomStatus = scale > 1 ? true : false;
                    setZoom({...zoom, 
                        smooth: true,
                        origin: cursorOnImage, 
                        dotOrigin, scale, 
                        zoom:zoomStatus})
                }
                else{
                    moveHandler(state, {moveSpeed: 2, direction: 1})
                }
            },
            onDragEnd: (state) => moveEndHandler(state),
            onPinch: state => {
                const targetRect = containerRef.current.getBoundingClientRect()
                const currentImg = zoomRef.current.getBoundingClientRect()
                const imgOffset = {x: currentImg.x - targetRect.x, y: currentImg.y - targetRect.y}

                let dotOrigin = zoom.dotOrigin;

                let initialOrigin = zoom.initialOrigin
                dotOrigin = {
                    x: (state.origin[0] - targetRect.x), 
                    y: (state.origin[1] - targetRect.y),
                }
                if(!zoom.initialOrigin){
                    initialOrigin = {
                        x: ((dotOrigin.x - imgOffset.x)*100)/currentImg.width, 
                        y: ((dotOrigin.y - imgOffset.y)*100)/currentImg.height,
                    };
                    let origin = initialOrigin
                    return setZoom({...zoom, initialOrigin, dotOrigin, origin, smooth: false})
                }
                else{
                    const pinchDistance = state.da[0]
                    let scale = pinchDistance / 100
                    const difference = {x: dotOrigin.x - zoom.dotOrigin.x, y: dotOrigin.y - zoom.dotOrigin.y}
                    let position = {x: 0, y: 0}
                    position = {
                        x: zoom.position.x + (((difference.x)*100)/currentImg.width),
                        y: zoom.position.y + (((difference.y)*100)/currentImg.height),
                    }
                    setZoom({...zoom, 
                        position: position,
                        dotOrigin,
                        scale
                    })
                }
            },
            onPinchEnd: state => {
                setZoom({...zoomDefault, smooth: true})
            },
            onWheelStart: state => {
                moveStartHandeler()
            },
            onWheel: (state) => {
                if(state.direction[0] != 0){
                    state.event.preventDefault()
                }
                moveHandler(state, {moveSpeed: 1.5, direction: -1})
            },
            onWheelEnd: state => {
                moveEndHandler(state)
            },
            onMove: state => {
                if(!zoom.zoom)return
                zoomPanHandler(state)
            },
        },
        {...genericOptions},
    )

    useEffect(() => {
        if(zoom.zoom){
            document.querySelector(".App").style.overflow = "hidden"
        }
        else{
            document.querySelector(".App").style.overflow = "unset"
        }
      }, [zoom])

    useEffect(() => {
        slideTo(props.currentSlide)
      }, [props])

      useEffect(bind, [bind])
    return(
            <div 
                id="container_main"
                ref={containerRef}
                className={`${styles.container} ${zoom.pinch ? styles.showOverflow : ""}`}
            >
                <div
                    style={{
                        height: "10px",
                        width: "10px",
                        borderRadius: "10px",
                        backgroundColor: "red",
                        position: "absolute",
                        zIndex: 999,
                        top: zoom.dotOrigin.y,
                        left: zoom.dotOrigin.x
                    }}
                >
                </div>
            {arrowPrev()}
            <div 
                // {...bind()}
                id={"slideContainer"}
                className={`${styles.slideContainer} ${slidePosition.smooth ? styles.smoothSlide : ""} ${zoom.pinch ? styles.showOverflow : ""}`}
                ref={slideContainerRef}
                style={{
                    width: `${100 * props.images.length}%`,
                    transform: `translateX(${slidePosition.currentTransform}%)`
                }}
            >
                {renderImages(props.images)}
            </div>
            {arrowNext()}
            {/* <div
            style={{
                position: "fixed",
                right: 0,
                bottom: 0,
                background: "white",
                border: "2px solid",
                padding: "15px",
                zIndex: 999
            }}>
                <p>mobile: {mobile ? "TRUE" : "FALSE"}</p>
            </div> */}
            <div className={styles.dotContainer}>
                {dots(props.images)}
            </div>
        </div>
    )
}

export default Carousel