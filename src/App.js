import React from 'react';
import Carousel from './components/Carousel'
import './index.css'

const App = props => {
  let [currentSlide, setCurrentSlide] = React.useState({
    index: 0, 
    initialTransform: 0})
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
    },
    {
      src: "./images/long.jpg",
      index: 4
    },
    {
      src: "./images/tall.png",
      index: 5
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
                            // var slideContainer = document.getElementById("slideContainer");
                            // slideContainer.classList.add("smoothSlide");
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
  );
}

export default App;

