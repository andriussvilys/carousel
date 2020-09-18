import React from 'react'
import styles from './css/carousel.module.css'

const Carousel = React.forwardRef((props, ref) => {

    // const [loaded, checkLoaded] = React.useState(false)
    // let [transformValue, setTransformValue] = React.useState(0)

    let [cursorPosition, setCursorPosition] = React.useState({
        isDown: null,
        startX: null,
        transform: 0,
        prevTransform: 0,
        direction: null,
        currentSlide: props.currentSlide
    })

    let {isDown, startX, prevTransform} = cursorPosition

    // const carouselRef = ref



    const startHandler = e => {
        console.log("touched")
        e.preventDefault()
        const container = document.querySelector(`.${styles.container}`)
        const slideContainer = document.querySelector(`.${styles.slideContainer}`)
        slideContainer.classList.remove("smoothSlide")
        const pageX = e.touches ? e.touches[0].pageX : e.pageX
        setCursorPosition({...cursorPosition, isDown: true, startX: pageX - container.offsetLeft})
    }
    const moveHandler = (e) => {
        if(!isDown)return
        e.preventDefault()
        const container = document.querySelector(`.${styles.container}`)
        const slideContainer = document.querySelector(`.${styles.slideContainer}`)
        const pageX = e.touches ? e.touches[0].pageX : e.pageX
        const x = pageX - container.offsetLeft
        let walk = ((x - startX) * 100) / slideContainer.clientWidth
        // -1: PREV, 1: NEXT
        const direction = walk > 0 ? -1 : 1
        const newWalk = walk + prevTransform
        setCursorPosition({
            ...cursorPosition,
            transform: newWalk,
            direction: direction,
        })

        console.log(`WALK: ${walk}`)
    }
    const endHandler = () => {
        const slideContainer = document.querySelector(`.${styles.slideContainer}`)
        slideContainer.classList.add("smoothSlide")
        let positionFix = cursorPosition.transform
        let currentSlide = null
        const slideCount = props.images.length
        console.log(`SLIDE COUNT ${slideCount}`)
        const slideWidth = 100 / slideCount
        // console.log(`currentSlide ${cursorPosition.currentSlide}`)
        // console.log(`direction ${cursorPosition.direction}`)
        if(cursorPosition.transform > 0){
            positionFix = 0
            currentSlide = 0
        }
        else if(cursorPosition.transform < slideWidth - 100){
            positionFix = slideWidth - 100
            currentSlide = slideCount - 1
        }
        else{
            positionFix = -(cursorPosition.currentSlide + cursorPosition.direction) * (100 / slideCount)
            currentSlide = cursorPosition.currentSlide + cursorPosition.direction
        }

        setCursorPosition({
            ...cursorPosition,
            isDown: false,
            transform: positionFix,
            prevTransform: positionFix,
            currentSlide: currentSlide
        })
    }

    const images = (imageList) => {
        return imageList.map((image, index) => {
        return <div key={`${image}${index}`} className={styles.slide} style={{width: `${100 / props.images.length}%`}}>{image.src ? 
                <img src={image.src} alt={image.src}/> 
                    :
                image
        }</div>
        })
    }

    return(
    <div 
    ref={ref} 
    className={styles.container} 
    >
        <div 
            id={"sliderContainer"}
            className={styles.slideContainer}
            style={{
                width: `${props.images.length * 100}%`,
                transform: `translateX(${cursorPosition.transform}%)`,
            }}
            onMouseDown={(e) => {startHandler(e)}}
            onTouchStart ={(e) => {startHandler(e)}}

            onMouseMove={(e) => {moveHandler(e)}}
            onTouchMove={(e) => {moveHandler(e)}}

            onMouseUp={() => {endHandler()}}
            onTouchEnd={() => {endHandler()}}
        >
            {images(props.images)}
        </div>
    </div>)
}) 

export default Carousel