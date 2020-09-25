import React, { useEffect } from 'react'
import { useDrag, useMove, useGesture } from 'react-use-gesture'

import styles from './css/index.module.scss'

const Carousel = props => {
    const zoomDefault =  {
        zoomedIn: null,
        zoomIndex: null,
        zoomPower: 1,
        x: 0,
        y: 0,
        startX: null,
        startY: null,
    }
    // const [cursorPosition, setCursorPosition] = React.useState({
    //       isDown: null,
    //       startX: null,
    //       cursorMove: 0,
    //       transform: 0,
    //       prevTransform: props.initialTransform,
    //       currentSlide: props.index,
    //       zoom: {...zoomDefault},
    //       pinchStart: {
    //           x1: 0,
    //           x2: 0,
    //           y1: 0,
    //           y2: 0,
    //       }
    //     });

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
            // onClick={() => {
            //     slideTo(index)
            // }}
            key={`carouselDot-${index}`} 
            // className={`${styles.dot} ${index === cursorPosition.currentSlide ? styles.dot_active : ""}`}
            ></li>
        })
        return <ul className={styles.dotList}>{dots}</ul>
    }




    const renderImages = (data) => {
        return data.map((image, index) => {
        return (
            <div
            className={styles.slide}
            // ref={cursorPosition.currentSlide === image.index ? currentSlideRef : null }
            key={`${image}-${index}`}
            style={{width: `${100 / props.images.length}%`}}
            >                       
                <img 
                    draggable={false}
                    // ref={cursorPosition.currentSlide === image.index ? zoomRef : null}
                    // style={cursorPosition.zoom.zoomedIn ? 
                    //     {transform: 
                    //     `scale(${cursorPosition.zoom.zoomPower}) 
                    //     translate(${cursorPosition.zoom.x}%, 
                    //     ${cursorPosition.zoom.y}%)`} 
                    //     : {}}
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
        scale: 0,
        distance: 0
    })

    const dragEndHandler = (x) => {
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
                console.log(state)
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
            onPinch: state => {
                console.log(state.da[0])
            }


        }
    )

    useEffect(() => {
        slideTo(props.currentSlide)
      }, [props])

    return(
            <div 
                ref={containerRef}
                className={styles.container}
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
                setSlidePosition({
                    ...slidePosition,
                    hi: !slidePosition.hi
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
            <span style={{
                position: "absolute",
                right: 0,
                bottom: 0
            }}>{zoom.distance}</span>
            {dots(props.images)}
        </div>
    )
}

export default Carousel


  