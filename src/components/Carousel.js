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
        });

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
            if(!cursorPosition.isDown)return
              e.preventDefault();
              
              const container = document.querySelector(`.${(styles.container)}`);
              
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
                style={{
                    width: `${100 / props.images.length}%`
                }}
                >
                    <img 
                        src={image.src}
                        alt={image.src}
                    />
                </div>
            )
            })
        }

        useEffect(() => {
            // console.log(`%c IS DOWN ${cursorPosition.isDown}`, "color:red")
        },[cursorPosition.isDown])

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
        </div>
    )
}

export default Carousel


  