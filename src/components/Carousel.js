import React, { useEffect } from 'react'
import { useGesture } from 'react-use-gesture'

import styles from './css/index.module.scss'

const Carousel = props => {
    const zoomRef = React.useRef(null)

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
        return <div 
            className={styles.arrowNext}
            onClick={() => {
                slideTo(slidePosition.currentSlide + 1)
            }}
        ></div>
    }
    const arrowPrev = () => {
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
            className={`${styles.slide} ${zoom.pinch ? styles.showOverflow : ""}`}
            // className={`${styles.slide} ${zoom.pinch ? styles.showOverflow : ""} 
            // ${zoom.smooth ? styles.smoothSlide : ""}`}
            key={`${image}-${index}`}
            style={{width: `${100 / props.images.length}%`}}
            >                    
                <img 
                    style={slidePosition.currentSlide === index ? 
                        {transform: `scale(${zoom.scale}) translate(${zoom.position.x}%, ${zoom.position.y}%)`} : {}}
                    className={`${zoom.smooth && slidePosition.currentSlide === index ? styles.smoothSlide : ""}`}
                    ref={slidePosition.currentSlide === index ? zoomRef : null}
                    src={image.src}
                    alt={image.src}
                    onClick={(e) => {
                        if(e.touches && e.touches.length > 0){
                            return
                        }
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
                />
            </div>
        )
        })
    }
          
    const containerRef = React.useRef()
    const slideContainerRef = React.useRef()
    const [slidePosition, setSlidePosition] = React.useState({
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
        position: {
            x: 0,
            y: 0
        }
    }
    const [zoom, setZoom] = React.useState({...zoomDefault})

    const moveStartHandeler = (state) => {
    }
    const moveHandler = (state, options) => {
        if(zoom.zoom){
        return}
          const containerWidth = containerRef.current.clientWidth;
          const slideCount = props.images.length
          const slideWidth = 100 / slideCount
          let  transform = slidePosition.prevTransform + ((state.movement[0] * options.direction * options.moveSpeed * 100 / containerWidth) / slideCount)

        if(transform > 0){
            transform = 0
        }
        if(transform < -100 + slideWidth){
            transform = -100 + slideWidth
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
    const calcZoomPan = (cursorX, cursorY) => {
        const container = containerRef.current
        const slideContainer = slideContainerRef.current
        const zoomedImage = zoomRef.current

        const offset = {y: container.getBoundingClientRect().y, x: container.getBoundingClientRect().x, top: container.getBoundingClientRect().top}

        const imgToSlideHeightRatio = zoomedImage.clientHeight * 100 / slideContainer.clientHeight
        
        const visibleSectionY = imgToSlideHeightRatio / zoom.scale
        const marginY = ((100 - visibleSectionY) / 2) + 10
        const middleGuideY = slideContainer.clientHeight / 2
        let y = cursorY - offset.y
        let moveY = y - middleGuideY
        let panY = (moveY * marginY / middleGuideY)

        const middleGuideX = (slideContainer.clientWidth / 2) / props.images.length
        let cursorPositionX = (cursorX - offset.x) - middleGuideX

        const imageWidth = zoomedImage.clientWidth * zoom.scale;
        const panX = (cursorPositionX * 100) / imageWidth
        return {x: panX, y: panY}
    }
    const zoomPanHandler = (state) => {
        const {x, y} = calcZoomPan(state.xy[0], state.xy[1])
        setZoom({
            ...zoom,
            smooth: false,
            position: {
                x, y
            }
        })
    }
    const genericOptions = {
        // filterTaps: true,
        domTarget: slideContainerRef,
        eventOptions: {
            passive: false
        }
        // threshold: 10
    }
    const bind = useGesture(
        {
            onDragStart: () => {
                moveStartHandeler()
            },
            onDrag: (state) => {
                if(state.event.touches && state.event.touches.length > 1){return}
                moveHandler(state, {moveSpeed: 2, direction: 1})
            },
            onDragEnd: (state) => moveEndHandler(state),
            onPinchStart: state => {
                setZoom({
                    ...zoom,
                    zoom: true
                })
            },
            onPinch: state => {
                const pinchDistance = state.da[0]
                let scale = pinchDistance / 100
                let zoomStatus = true
                if(scale <= 1){
                    scale = 1
                    zoomStatus = false
                }
                const {x, y} = calcZoomPan(state.origin[0], state.origin[1])
                setZoom({
                    ...zoom,
                    zoom: zoomStatus,
                    pinch: true,
                    distance: state.da[0],
                    scale,
                    origin: {
                        x, y
                    },
                    position: {
                        x, y
                    }
                })
            },
            onPinchEnd: state => {
                setZoom({...zoomDefault})
            },
            onWheelStart: () => {
                moveStartHandeler()
            },
            onWheel: (state) => {
                state.event.preventDefault()
                moveHandler(state, {moveSpeed: 1.5, direction: -1})
            },
            onWheelEnd: state => {
                moveEndHandler(state)
            },
            onMove: state => {
                if(!zoom.zoom || zoom.pinch)return
                zoomPanHandler(state)
            },
        },
        {...genericOptions},
    )

    useEffect(() => {
        if(zoom.pinch){
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
                ref={containerRef}
                className={`${styles.container} ${zoom.pinch ? styles.showOverflow : ""}`}
            >
            {arrowPrev()}
            <div 
                // {...bind()}
                id={"slideContainer"}
                className={`${styles.slideContainer} ${slidePosition.smooth ? styles.smoothSlide : ""} ${zoom.pinch ? styles.showOverflow : ""}`}
                ref={slideContainerRef}
                style={{
                    width: `${100 * props.images.length}%`,
                    // transform: `translateX(${-cursorPosition.transform}%)`
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
                padding: "15px"
            }}>
                <p >distance: {zoom.distance}</p>
                <p>scale: {zoom.scale}</p>
                <p>zoom: {zoom.zoom ? "true" : "false"}</p>
                <p>origin: </p>
                <p>x: {zoom.origin.x} | y: {zoom.origin.y}</p>
            </div> */}
            {dots(props.images)}
        </div>
    )
}

export default Carousel