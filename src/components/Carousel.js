import React, { useEffect } from 'react'
import styles from './css/index.module.scss'

const Carousel = props => {
    const [cursorPosition, setCursorPosition] = React.useState({
          isDown: null,
          startX: null,
          transform: 0,
          prevTransform: props.initialTransform,
          currentSlide: props.index,
          direction: null,
          zoom: {
              zoomedIn: null,
              zoomPower: 1,
              x: 0,
              y: 0,
              startX: null,
              startY: null,
          }
        });

    const zoomedInSlide = React.createRef(null)

        const zoomedInMove = () => {

        }

        const countProportion = (move, parentSize) => {
            return move * 100 / parentSize
          }

        const startHandle = (e) => {
            e.preventDefault();
            if(cursorPosition.zoom.zoomedIn){
              const container = document.querySelector(`.${styles.container}`)
              const offset = {y: container.getBoundingClientRect().top, x: container.getBoundingClientRect().left}
              const startX = e.touches ? e.touches[0].pageX - offset.x : e.pageX - offset.x
              const startY = e.touches ? e.touches[0].pageY - offset.y : e.pageY - offset.y
            //   console.log({pageX:  e.pageX, pageY: e.pageY})
            //   console.log({offsetX: offset.x, offsetY: offset.y})
            //   console.log({startX, startY})
                return setCursorPosition({
                    ...cursorPosition,
                    zoom: {
                        ...cursorPosition.zoom,
                        startX, 
                        startY
                    }
                })
            }
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
            if(cursorPosition.zoom.zoomedIn){

              const slideContainer = document.querySelector(`.${styles.slideContainer}`)
              const container = document.querySelector(`.${styles.container}`)
              const offset = {y: container.getBoundingClientRect().y, x: container.getBoundingClientRect().x}
              console.log({y: offset.y})

              const visibleSection = 100 / cursorPosition.zoom.zoomPower

              const marginY = ((100 - visibleSection) / 2) + 10
              const middleGuideY = slideContainer.clientHeight / 2
              let y = e.touches ? e.touches[0].pageY - offset.y : e.pageY - offset.y
              let moveY = y - middleGuideY
              let panY = (moveY * marginY / middleGuideY).toFixed(2)

              const marginX = ((100 - visibleSection) / 2) + 10
              const middleGuideX = slideContainer.clientWidth / 2
              let x = e.touches ? e.touches[0].pageX - offset.x : e.pageY - offset.x
              const panX = x 
            //   let moveX = x - middleGuideX
            //   let panX = (moveX * marginX / middleGuideX).toFixed(2)

                // console.log({panY, y, middleGuideY})
                console.log({panX, x, middleGuideX})

                return setCursorPosition({
                    ...cursorPosition, 
                    zoom:{...cursorPosition.zoom, 
                        y:panY, 
                        // x: panX
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
              if(cursorPosition.zoom.zoomedIn)return
              if(!cursorPosition.isDown)return
              console.log("END HANDLE")
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
                console.log({currentSlide: cursorPosition.currentSlide, nextIndex: index})
                positionFix = (index) * (100 / slideCount);
            }

            // console.log(`%c ${positionFix}`, 'background: #222; color: #bada55')
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
                key={`${image}-${index}`}
                style={{width: `${100 / props.images.length}%`}}
                // style={cursorPosition.zoomedIn ? {left: zoomPosition.x, top: zoomPosition.y} : {}}
                >
                    <img 
                        className={`
                        ${cursorPosition.currentSlide === image.index ? styles.slideInView : ""}
                        `}
                        style={cursorPosition.zoom.zoomedIn ? 
                            {transform: 
                            `scale(${cursorPosition.zoom.zoomPower}) 
                            translate(${-cursorPosition.zoom.x}%, 
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
            // console.log(`%c PROPS CHANGED`, "color:red")
            setCursorPosition({
                ...cursorPosition,
                direction: null,
                transform: props.initialTransform,
                prevTransform: props.initialTransform,
                currentSlide: props.currentSlide
            })
            console.log(cursorPosition)
          }, [props])

    return(
            <div className={styles.container}>
            <div 
                id="slideContainer"
                className={styles.slideContainer}
                style={{
                    width: `${100 * props.images.length}%`,
                    transform: `translateX(-${cursorPosition.transform}%)`
                }}
                onMouseDown={(e) => {startHandle(e)} }
                onTouchStart={(e) => {startHandle(e)} }
                onMouseMove={(e) => {moveHandle(e)} }
                onTouchMove={(e) => {moveHandle(e)} }
                onMouseUp={() => {endHandle();} }
                onMouseOut={() => {endHandle();} }
                // onMouseOut={() => {setCursorPosition({...cursorPosition, isDown: false})}}
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
                        y: 0,
                        x: 0
                    }
                })
            }}>enlarge</button>
        </div>
    )
}

export default Carousel


  