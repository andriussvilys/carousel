<<<<<<< HEAD
import React, { Fragment } from 'react';
import Carousel from './carousel/Carousel';
import './css/index.css'

function App() {
  const carouselRef = React.createRef(null)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [imageList, changeImageList] = React.useState([1,2,3,4,5])

  const families = {
    sparkle: [
      {src: './images/sparkle-1.png', index: 0},
      {src: './images/sparkle-2.png', index: 1},
      {src: './images/sparkle-3.png', index: 2}
    ],
    spring: [
      {src: './images/spring-1.png', index: 0},
      {src: './images/spring-2.png', index: 1},
      {src: './images/spring-3.png', index: 2}
    ]
  }
  const renderEmoji = (data) => {
    const families = Object.keys(data)

    const images = families.map((family) => {
      return(
        <div key={family} className="famCotnainer">
          <h3>{family}</h3>
          <div className="famImages">
            {data[family].map((img, index, arr) => {return(
              <div className="imgWrapper">
                  <img 
                  key={img.src} 
                  src={img.src} 
                  alt={img.src} 
                  onClick={() => {
                    changeImageList(data[family])
                    setCurrentSlide(img.index)
                    const slideContainer = document.getElementById("sliderContainer")
                    slideContainer.classList.add("smoothSlide")
                    slideContainer.style.transform = `translateX(-${(100 / arr.length) * img.index}%)`
                  }}
                  />
              </div>
            )})}
          </div>
        </div>
      )
    })
    return images
  }
  return (
    <Fragment>
      <div className="App">
        <Carousel 
        ref={carouselRef} 
        images={imageList}
        currentSlide={currentSlide}
        >
          
        </Carousel>
        <div className="fams">
          {renderEmoji(families)}
        </div>
      </div>
    </Fragment>
=======
import React, { useEffect } from 'react';
import Carousel from './components/Carousel'
import './index.css'

const App = props => {
  let [currentSlide, setCurrentSlide] = React.useState({index: null, initialTransform: null})
  var [images, setImages] = React.useState([1, 2, 3, 4, 5])

  const families = {
    sparkle: [{
      src: "./images/sparkle-1.png",
      index: 0
    }, {
      src: "./images/sparkle-2.png",
      index: 1
    }, {
      src: "./images/sparkle-3.png",
      index: 2
    },
    {
      src: "./images/sparkle-4.png",
      index: 3
    }],

    spring: [{
      src: "./images/spring-1.png",
      index: 0
    }, {
      src: "./images/spring-2.png",
      index: 1
    }, {
      src: "./images/spring-3.png",
      index: 2
    }]
  }

  const familyList = Object.keys(families)

  return (
    <div className="App">
      <Carousel 
        currentSlide={currentSlide.index}
        initialTransform={currentSlide.initialTransform}
        images={images}
      />
      <div className="fams">
        {   
          familyList.map((family) => {
            return <div key={family} className="famContainer">
              <h3>{family}</h3>
              <div className="famImages">
                {
                  families[family].map((image, index, array) => {
                    return <div key={`${image}-${index}`} className="imgWrapper">
                      <img 
                          key={image.src}
                          src={image.src}
                          alt={image.src}

                          onClick={() => {
                            setImages(families[family]);
                            setCurrentSlide({index: image.index, initialTransform: (100 / array.length * image.index)});
                            var slideContainer = document.getElementById("slideContainer");
                            slideContainer.classList.add("smoothSlide");
                            // slideContainer.style.transform = `translateX(-${100 / array.length * image.index}%)`
                          }}
                      />
                    </div>
                  })
                }
              </div>
            </div>
        })
        }
      </div>
    </div>
>>>>>>> master
  );
}

export default App;

