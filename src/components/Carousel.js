import React, { useEffect } from 'react'
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
    const [cursorPosition, setCursorPosition] = React.useState({
          isDown: null,
          startX: null,
          transform: 0,
          prevTransform: props.initialTransform,
          currentSlide: props.index,
          direction: null,
          zoom: {...zoomDefault}
        });

    const slideTo = (index) => {
        const newTransfrom = (100 / props.images.length) * index
        setCursorPosition({
            ...cursorPosition,
            currentSlide: index,
            transform: newTransfrom,
            prevTransform: newTransfrom,
            zoom: {...zoomDefault}
        })
    }

    const dots = (imageList) => {
        if(!imageList || imageList.length < 0){return}

        console.log("imagesList")
        console.log(imageList)
        const dots = imageList.map((image, index) => {
            return <li 
            onClick={() => {
                slideTo(index)
            }}
            key={`carouselDot-${index}`} 
            className={`${styles.dot} ${index === cursorPosition.currentSlide ? styles.dot_active : ""}`}></li>
        })
        return <ul className={styles.dotList}>{dots}</ul>
    }

    const zoomRef = React.useRef(null)
    const currentSlideRef = React.useRef(null)

        const startHandle = (e) => {
            e.preventDefault();
            const container = document.querySelector(`.${styles.container}`)
            document.querySelector(`.${styles.slideContainer}`).classList.remove("smoothSlide");
            const left = e.touches ? e.touches[0].pageX: e.pageX;

            setCursorPosition({
                ...cursorPosition,
                isDown: true,
                startX: left - container.offsetLeft
            })
          };

        const moveHandle = (e) => {
            if(e.touches && e.touches.length > 1){
                return setCursorPosition({
                    ...cursorPosition,
                    zoom: {
                        ...cursorPosition.zoom,
                        zoomPower: {
                            zoomedIn: true,
                            zoomPower: Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY)
                        }
                    }
                })
                
            }
            if(cursorPosition.zoom.zoomedIn){
                e.preventDefault()
                if(window.innerWidth < 720){
                    document.querySelector("body").classList.add(styles.disableBodyScroll)
                }
            //   const slideContainer = document.querySelector(`.${styles.slideContainer}`)
            const slideContainer = currentSlideRef.current
            const zoomedImage = zoomRef.current
              const container = document.querySelector(`.${styles.container}`)
              const offset = {y: container.getBoundingClientRect().y, x: container.getBoundingClientRect().x, top: container.getBoundingClientRect().top}

              
              const imgToSlideHeightRatio = zoomedImage.clientHeight * 100 / slideContainer.clientHeight
              const imgToSlideWidthRatio = zoomedImage.clientWidth * 100 / slideContainer.clientWidth
              
              const visibleSectionY = imgToSlideHeightRatio / cursorPosition.zoom.zoomPower
              const marginY = ((100 - visibleSectionY) / 2) + 10
              const middleGuideY = slideContainer.clientHeight / 2
              let y = e.touches ? e.touches[0].clientY - offset.y : e.clientY - offset.y;
              let moveY = y - middleGuideY
              let panY = (moveY * marginY / middleGuideY).toFixed(2)

              const visibleSectionX = imgToSlideWidthRatio / cursorPosition.zoom.zoomPower
              const marginX = ((100 - visibleSectionX) / 2)
              const middleGuideX = slideContainer.clientWidth / 2
              let x = e.touches ? e.touches[0].clientX - offset.x : e.clientX - offset.x
              let moveX = x - middleGuideX
              let panX = (moveX * marginX / middleGuideX).toFixed(2)

                return setCursorPosition({
                    ...cursorPosition, 
                    zoom:{...cursorPosition.zoom, 
                        y:panY, 
                        x: panX
                    }
                })
            }
            if(!cursorPosition.isDown)return
              e.preventDefault();
              var slideContainer = document.querySelector(`.${styles.slideContainer}`);
              
              const x = e.touches ? e.touches[0].pageX: e.pageX
              var walk = 100 * (cursorPosition.startX - x) / slideContainer.clientWidth;
              var transform = walk + cursorPosition.prevTransform;

              var direction = walk > 0 ? 1: -1;
              setCursorPosition({
                ...cursorPosition,
                transform: transform,
                direction: direction
              })
          };

          var endHandle = () => {
              if(cursorPosition.zoom.zoomedIn){ return document.querySelector("body").classList.remove(styles.disableBodyScroll) }
              if(!cursorPosition.isDown)return
            document.querySelector(`.${styles.slideContainer}`).classList.add("smoothSlide");
            var positionFix = cursorPosition.transform;
            
            var index = null;
            var slideCount = props.images.length;
            
            var slideWidth = 100 / slideCount;
            if (positionFix > 0) {
              positionFix = 0;
              index = 0;
            } 
            if (positionFix < slideWidth - 100) {
                positionFix = slideWidth - 100;
                index = slideCount - 1;
            } 
            else {
            index = cursorPosition.currentSlide + cursorPosition.direction;
                if(index < 0){index = 0}
                if(index > slideCount - 1){index = slideCount -1 }
                positionFix = (index) * (100 / slideCount);
            }
            setCursorPosition({
            ...cursorPosition,
            isDown: false,
            transform: positionFix,
            prevTransform: positionFix,
            currentSlide: index
            })
          };

        const renderImages = (data) => {
            return data.map((image, index) => {
            return (
                <div
                className={styles.slide}
                ref={cursorPosition.currentSlide === image.index ? currentSlideRef : null }
                key={`${image}-${index}`}
                style={{width: `${100 / props.images.length}%`}}
                >
                    <img 
                        className={`
                        ${cursorPosition.currentSlide === image.index ? styles.slideInView : ""}
                        `}
                        ref={cursorPosition.zoom.zoomedIn && cursorPosition.currentSlide === image.index ? zoomRef : null}
                        style={cursorPosition.zoom.zoomedIn ? 
                            {transform: 
                            `scale(${cursorPosition.zoom.zoomPower}) 
                            translate(${cursorPosition.zoom.x}%, 
                            ${cursorPosition.zoom.y}%)`} 
                            : {}}
                        src={image.src}
                        alt={image.src}
                    />
                </div>
            )
            })
        }

        useEffect(() => {
            setCursorPosition({
                ...cursorPosition,
                direction: null,
                transform: props.initialTransform,
                prevTransform: props.initialTransform,
                currentSlide: props.currentSlide,
                zoom:{...zoomDefault}
            })
          }, [props])

    return(
            <div className={styles.container}>
            <div 
                id="slideContainer"
                className={styles.slideContainer}
                style={{
                    width: `${100 * props.images.length}%`,
                    transform: `translateX(${-cursorPosition.transform}%)`
                }}
                onMouseDown={(e) => {startHandle(e)} }
                onTouchStart={(e) => {startHandle(e)} }
                onMouseMove={(e) => {moveHandle(e)} }
                onTouchMove={(e) => {moveHandle(e)} }
                onMouseUp={() => {endHandle();} }
                onMouseOut={() => {endHandle();} }
                onTouchEnd={() => {endHandle();} }
            >
                {renderImages(props.images)}
            </div>
            <button 
            className={styles.button_zoom}
            onClick={() => {
                let zoomedIn = null
                const countZoom = () => {
                    let zoomPower = cursorPosition.zoom.zoomPower + 1
                    zoomedIn = true
                    if(zoomPower > 3){
                        zoomPower = 1
                        zoomedIn = false
                    }
                    return {zoomPower, zoomedIn}
                }
                const zoom = countZoom()
                setCursorPosition({
                    ...cursorPosition, 
                    zoom: {
                        ...cursorPosition.zoom,
                        zoomedIn: zoom.zoomedIn,
                        zoomPower: zoom.zoomPower,
                        zoomIndex: cursorPosition.currentSlide,
                        y: 0,
                        x: 0
                    }
                })
            }}>enlarge</button>
            {dots(props.images)}
        </div>
    )
}

export default Carousel


  