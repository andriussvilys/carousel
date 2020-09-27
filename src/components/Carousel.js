import React, { useEffect } from 'react'
import { useDrag, useMove, useGesture } from 'react-use-gesture'

import styles from './css/index.module.scss'

const Carousel = props => {
    const zoomRef = React.useRef(null)
    const currentSlideRef = React.useRef(null)

    const slideTo = (index) => {
        const newTransfrom = -((100 / props.images.length) * index)
        setZoom({...zoomDefault})
        setSlidePosition({
            ...slidePosition,
            currentSlide: index,
            currentTransform: newTransfrom,
            prevTransform: newTransfrom,
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
            className={`${styles.slide} ${zoom.pinch ? styles.showOverflow : ""} ${zoom.smooth ? styles.smoothSlide : ""}`}
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
                    style={zoom.zoom ? 
                        {transform: 
                        `translate(${zoom.position.x}%, 
                        ${zoom.position.y}%)`} 
                        : {}}
                    className={`${zoom.smooth ? styles.smoothSlide : ""}`}
                    ref={slidePosition.currentSlide === image.index ? zoomRef : null}
                    src={image.src}
                    alt={image.src}
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
        smooth: null,
        scale: 1,
        distance: 0,
        origin: 0,
        position: {
            x: 0,
            y: 0
        }
    }
    const [zoom, setZoom] = React.useState({...zoomDefault})

    const moveStartHandeler = (state) => {
        console.log("START MOVE")
        // setSlidePosition({
        //     ...slidePosition,
        //     smooth: false
        // })
    }
    const moveHandler = (state, options) => {
        console.log("MOVE")
        if(zoom.zoom){
            console.log("zoom")
        return}
          const containerWidth = containerRef.current.clientWidth;
          const slideCount = props.images.length
          const slideWidth = 100 / slideCount
          let  transform = slidePosition.prevTransform + ((state.movement[0] * options.direction * options.moveSpeed * 100 / containerWidth) / slideCount)

        // if(transform > 0){
        //     transform = -100 + slideWidth
        // }
        // if(transform < -100 + slideWidth){
        //     transform = 0
        // }
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
            console.log("zoom")
        return}

        var positionFix = slidePosition.currentTransform;
        var slideCount = props.images.length;
        var slideWidth = 100 / slideCount;
        positionFix = positionFix > 0 ? 0 : positionFix
        // var index = Math.abs(Math.round(positionFix/slideWidth))
        // index = index > props.images.length - 1 ? props.images.length - 1 : index
        const index = slidePosition.currentSlide

        positionFix = (0 - (slideWidth * index))

        return setSlidePosition({
            ...slidePosition, 
            // currentSlide: index,
            // prevTransform: slidePosition.currentTransform,
            prevTransform: positionFix,
            currentTransform: positionFix,
            distance: null,
            smooth: true
        })
    }
    const zoomHandler = (state) => {
        if(!zoom.zoom || zoom.pinch){
            return
        }
        const container = containerRef.current
        const slideContainer = slideContainerRef.current
        const zoomedImage = zoomRef.current
        const slideCount = props.images.length
        const containerRect = container.getBoundingClientRect()
        const containerOffset = {
            x: containerRect.x,
            y: containerRect.y
        }
        const transform = {
            x: state.xy[0] - containerOffset.x,
            y: state.xy[1] - containerOffset.y
        }

        const offset = {y: container.getBoundingClientRect().y, x: container.getBoundingClientRect().x, top: container.getBoundingClientRect().top}

        const imgToSlideHeightRatio = zoomedImage.clientHeight * 100 / slideContainer.clientHeight
        const imgToSlideWidthRatio = zoomedImage.clientWidth * 100 / (slideContainer.clientWidth / slideCount)
        
        const visibleSectionY = imgToSlideHeightRatio / zoom.scale
        const marginY = ((100 - visibleSectionY) / 2) + 10
        const middleGuideY = slideContainer.clientHeight / 2
        let y = state.event.touches ? state.event.touches[0].clientY - offset.y : state.event.clientY - offset.y;
        let moveY = y - middleGuideY
        let panY = (moveY * marginY / middleGuideY).toFixed(2)

        // console.log({panY, y, middleGuideY, offsetY: offset.y, offsetTop: offset.top})

        const visibleSectionX = imgToSlideWidthRatio / zoom.scale
        const marginX = ((100 - visibleSectionX) / 2) + 10
        const middleGuideX = (slideContainer.clientWidth / slideCount) / 2
        let x = state.event.touches ? state.event.touches[0].clientX - offset.x : state.event.clientX - offset.x
        let moveX = state.xy[0] - middleGuideX
        let panX = (moveX * marginX / middleGuideX).toFixed(2)

        console.log({panX, panY, X: state.xy[0]})
        setZoom({
            ...zoom,
            smooth: null,
            position: {
                x: panX,
                y: panY
            }
        })
        // console.log(state)
    }



    const genericOptions = {
        filterTaps: true,
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
                    pinch: true,
                    distance: state.da[0],
                    scale
                })
            },
            onPinchEnd: state => {
                setZoom({...zoomDefault})
            },
            onWheelStart: () => {
                moveStartHandeler()
            },
            onWheel: (state) => {
                moveHandler(state, {moveSpeed: 1.5, direction: -1})
            },
            onWheelEnd: state => {
                moveEndHandler(state)
            },
            onMove: state => {
                zoomHandler(state)
            },
            // onMoveEnd: state => {
            //     setZoom({
            //         ...zoom,
            //         position: {
            //             x: 0,
            //             y: 0
            //         }
            //     })
            // }
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
        console.log("props change")
        slideTo(props.currentSlide)
      }, [props])

      useEffect(bind, [bind])
    // useEffect(() => {
    //     slideTo(props.currentSlide)
    //   }, [props])

    return(
            <div 
                ref={containerRef}
                className={`${styles.container} ${zoom.pinch ? styles.showOverflow : ""}`}
            >
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
            <button 
            className={styles.button_zoom}
            onClick={() => {
                let newScale = zoom.scale + 1
                let newZoom = true
                newScale = newScale > 3 ? 1 : newScale
                newZoom = newScale === 1 ? false : true
                setZoom({
                    ...zoom,
                    zoom: newZoom,
                    scale: newScale,
                    smooth: true
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
                <p>scale: {zoom.scale}</p>
                <p>zoom: {zoom.zoom ? "true" : "false"}</p>
                <p>postion: </p>
                <p>x: {zoom.position.x} | y: {zoom.position.y}</p>
            </div>
            {dots(props.images)}
        </div>
    )
}

export default Carousel


  