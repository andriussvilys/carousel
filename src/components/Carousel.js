import React, { useEffect } from 'react'
import { useDrag, useMove, useGesture } from 'react-use-gesture'

import styles from './css/index.module.scss'

const Carousel = props => {
    const zoomDefault =  {
        zoom: false,
        scale: 1,
        distance: 0,
        origin: 0
    }

    const zoomRef = React.useRef(null)
    const currentSlideRef = React.useRef(null)

    const slideTo = (index) => {
        const newTransfrom = -((100 / props.images.length) * index)
        setSlidePosition({
            ...slidePosition,
            currentSlide: index,
            currentTransform: newTransfrom,
            prevTransform: newTransfrom,
            zoom: {...zoomDefault}
        })
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




    const renderImages = (data) => {
        return data.map((image, index) => {
        return (
            <div
            className={`${styles.slide} ${zoom.zoom ? styles.showOverflow : ""}`}
            // ref={cursorPosition.currentSlide === image.index ? currentSlideRef : null }
            key={`${image}-${index}`}
            // style={{width: `${100 / props.images.length}%`}}
            style={slidePosition.currentSlide === image.index ? 
                {width: `${100 / props.images.length}%`, 
                transform: `scale(${zoom.scale})`} : 
                {width: `${100 / props.images.length}%`}}
            >                       
                <img 
                    draggable={false}
                    ref={slidePosition.currentSlide === image.index ? zoomRef : null}
                    // style={slidePosition.currentSlide === image.index ? {transform: `scale(${zoom.scale})`} : {}}
                        // {transform: 
                        // `scale(${zoom.scale}) 
                        // translate(${zoom.zoom.x}%, 
                        // ${zoom.zoom.y}%)
                        // `} 
                        // : {}}
                    src={image.src}
                    alt={image.src}
                />
            </div>
        )
        })
    }
          
    const containerRef = React.useRef()
    const [slidePosition, setSlidePosition] = React.useState({
        currentSlide: props.currentSlide,
        prevTransform: props.initialTransform,
        currentTransform: props.initialTransform
    })
    const [zoom, setZoom] = React.useState({
        zoom: false,
        scale: 1,
        distance: 0,
        origin: 0
    })

    const dragEndHandler = (x) => {
        if(zoom.zoom){
            console.log("zoom")
            return}
        const direction = x < 0 ? 1 : -1

        var positionFix = slidePosition.currentTransform;
        var slideCount = props.images.length;
        var slideWidth = 100 / slideCount;
        var index = null

        if (positionFix > 0) {
          positionFix = 0;
          index = 0;
        } 
        if (positionFix < slideWidth - 100) {
            positionFix = (slideWidth - 100);
            index = slideCount - 1;
        } 
        else {
        index = slidePosition.currentSlide + direction;
        // console.log({currentSlide: slidePosition.currentSlide, next: index, direction, x})
            if(index < 0){index = 0}
            if(index > slideCount - 1){index = slideCount -1 }
            positionFix = -((index) * (100 / slideCount));
        }
        return setSlidePosition({
            ...slidePosition, 
            currentSlide: index,
            // prevTransform: slidePosition.currentTransform,
            prevTransform: positionFix,
            currentTransform: positionFix,
        })
    }

    const bind = useGesture(
        {
            onDragEnd: (state) => dragEndHandler(state.movement[0]),
            // onDrag: ({movement: [mx, my]}) => {
            onDrag: (state) => {
                if(zoom.zoom){
                    console.log("zoom")
                    return}
                // console.log(state)
                // state.event.stopPropagation()
                  const containerWidth = containerRef.current.clientWidth;
                  const slideCount = props.images.length
                  let  transform = slidePosition.prevTransform + ((state.movement[0] * 100 / containerWidth) / slideCount)

                //   transform = transform.toFixed(2)
                //   console.log({transform})
                //   console.log({...slidePosition})
                  return setSlidePosition({ 
                    ...slidePosition,  
                    currentTransform: transform,
                    })
            },
            onPinchStart: state => {
                setZoom({
                    ...zoom,
                    zoom: true
                })
            },
            onPinch: state => {
                // console.log(state.da[0])
                const pinchDistance = state.da[0]
                const containerHeight = containerRef.current.clientHeight;
                const maxHeight = window.innerHeight
                const imgToWindowRatio = maxHeight / zoomRef.current.clientHeight
                const maxZoom = zoomRef.clientHeight
                let scale = pinchDistance / 100
                let zoomStatus = true
                if(scale <= 1){
                    scale = 1
                    zoomStatus = false
                }
                setZoom({
                    ...zoom,
                    zoom: zoomStatus,
                    distance: state.da[0],
                    scale
                })
            }


        }
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

    return(
            <div 
                ref={containerRef}
                className={`${styles.container} ${zoom.zoom ? styles.showOverflow : ""}`}
            >
            <div 
                {...bind()}
                id="slideContainer"
                className={styles.slideContainer}
                style={{
                    width: `${100 * props.images.length}%`,
                    // transform: `translateX(${-cursorPosition.transform}%)`
                    transform: `translateX(${slidePosition.currentTransform}%)`
                }}
            >
                {renderImages(props.images)}
            </div>
            <button 
            className={styles.button_zoom}
            onClick={() => {
                let newScale = zoom.scale + 1
                let newZoom = true
                newScale = newScale > 3 ? 1 : newScale
                newZoom = newScale === 1 ? false : true
                setZoom({
                    zoom: newZoom,
                    scale: newScale
                })
                // let zoomedIn = null
                // const countZoom = () => {
                //     let zoomPower = cursorPosition.zoom.zoomPower + 1
                //     zoomedIn = true
                //     if(zoomPower > 3){
                //         zoomPower = 1
                //         zoomedIn = false
                //     }
                //     return {zoomPower, zoomedIn}
                // }
                // const zoom = countZoom()
                // setCursorPosition({
                //     ...cursorPosition, 
                //     zoom: {
                //         ...cursorPosition.zoom,
                //         zoomedIn: zoom.zoomedIn,
                //         zoomPower: zoom.zoomPower,
                //         zoomIndex: cursorPosition.currentSlide,
                //         y: 0,
                //         x: 0
                //     }
                // })
            }}>enlarge</button>
            <div
            style={{
                position: "fixed",
                right: 0,
                bottom: 0,
                background: "white",
                border: "2px solid",
                padding: "15px"
            }}>
                <p >distance: {zoom.distance}</p>
                <p>origin: {zoom.origin}</p>
                <p>scale: {zoom.scale}</p>
                <p>zoom: {zoom.zoom ? "true" : "false"}</p>
            </div>
            {/* {dots(props.images)} */}
        </div>
    )
}

export default Carousel


  