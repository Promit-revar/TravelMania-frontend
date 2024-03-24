import React from 'react';
import './Gallery.css'
import Image from '../../UI/components/Image/Image';
import HotelOverview1 from '../../assets/Hotel-Overview-1.jpg'
import HotelOverview2 from '../../assets/Hotel-Overview-2.jpg'
import HotelOverview3 from '../../assets/Hotel-Overview-4.jpg'
import HotelOverview4 from '../../assets/Hotel-Overview-12.jpg'
import HotelOverview5 from '../../assets/Hotel-Overview-13.jpg'
import Skeleton from 'react-loading-skeleton'
import { Carousel } from "react-bootstrap";
export const CarouselView = ({images}) =>{
    return (
        <>
        <Carousel 
            slide={false} 
            prevLabel={null} 
            nextLabel={null}
            >
                {images.map(image=>{
                return(<Carousel.Item>
                    <Image src={image.url} height={'100%'} width={'100%'} />
                </Carousel.Item>)})}
                
            </Carousel>
            </>
    )
}
const GalleryComponent = ({handleViewGallery, images}) =>{
    const handleClick = () => {
        handleViewGallery();
    }
    console.log(images)
    return (
        <div className="gallery" >
           {images && <><div className='mobile-view-gallery'><CarouselView images={images}/></div>
           <div className='main-img' onClick={handleClick} ><Image src={images[0].url} height="100%" width="100%" /></div> 
            <div className='sub-imgs' onClick={handleClick}>   
                <Image src={images[1].url} height="48%" width="49%" />
                <Image src={images[2].url} height="48%" width="49%" />
                <Image src={images[3].url} height="48%" width="49%" />
                <Image src={images[4].url} height="48%" width="49%" />
            </div></>}
            {!images && <><div className='mobile-view-gallery'><Skeleton height={"100%"} width={"100%"}/></div>
           <div className='main-img' onClick={handleClick} ><Skeleton height={"100%"} width={"100%"} /></div> 
            <div className='sub-imgs' onClick={handleClick}>   
                <Skeleton  height="48%" width="49%" />
                <Skeleton  height="48%" width="49%" />
                <Skeleton height="48%" width="49%" />
                <Skeleton height="48%" width="49%" />
            </div></>}
        </div>
    )
}
export default GalleryComponent;