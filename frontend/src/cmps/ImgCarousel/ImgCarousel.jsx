import React from 'react'
import Carousel from 'react-multi-carousel';
import './ImgCarousel.scss'
import 'react-multi-carousel/lib/styles.css';

export default function ImgCarousel(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1// optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <div className="test">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={false}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass=""
        // renderDotsOutside={true}
      >
      
        {props.imgs.map(imgUrl => {
          return <img className="carousel-img" key={imgUrl} src={imgUrl} />
        })}
      </Carousel><span className="hidden">;</span>
    </div>
  )
}
