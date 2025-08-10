import React from 'react'
import {Carousel} from 'react-responsive-carousel' 
import classes from "./Carousel.module.css";
import {img} from  './img/data'
import "react-responsive-carousel/lib/styles/carousel.min.css";
function CarouselEffect() {
  return (
    <div>
<Carousel 
    autoPlay ={true}
    infinite= {true}
    showIndicators={false}
    showThumbs={false}
>
{
    img.map((imageItemLink)=>{
        return <img key={imageItemLink} src={imageItemLink}/>
    })
}
</Carousel> 
<div className={classes.hero__img}></div>

    </div>
  )
}

export default CarouselEffect  