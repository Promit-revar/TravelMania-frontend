import React,{useState, useEffect} from "react";
import NavBarComponent from "../../components/Navbar/Navbar";
import GalleryComponent from "../../components/Gallery/Gallery.jsx"
import NavList from "../../components/NavigationList/NavList";
import * as api from "../../api/hotelApis.js";
import { HotelDetailsNavigationList, AmenitiesList } from "../../constants/constants";
import HotelDescriptionComponent from "../../components/HotelDescription/HotelDescription";
import AmenitiesComponent from "../../components/Amenities/Amenities";
import AccomodationComponent from "../../components/Accomodation/Accomodation";
import {AccomodationAmenities} from '../../constants/constants';
import ActivitiesComponent from "../../components/Activites/Activites";
import { ChevronLeft } from 'lucide-react';
import { Carousel } from "react-bootstrap";
import LocationComponent from "../../components/Location/Location";
import PoilciesComponent from "../../components/Policies/Policies";
import CarouselComponent from "../../components/Carousel/Carousel";
import ReviewComponent from "../../components/Reviews/Reviews";
import OtherHotelCardsComponent from "../../components/OtherHotels/OtherHotelsCards";
import { Policies, Reviews } from "../../constants/constants";
import ModalComponent from "../../UI/components/Modal/Modal";
import Image from "../../UI/components/Image/Image";
import HotelOverview1 from '../../assets/Hotel-Overview-1.jpg'
import HotelOverview2 from '../../assets/Hotel-Overview-2.jpg'
import HotelOverview3 from '../../assets/Hotel-Overview-4.jpg'
import HotelOverview4 from '../../assets/Hotel-Overview-12.jpg'
import HotelOverview5 from '../../assets/Hotel-Overview-13.jpg'
import { ChevronLeftCircle, ChevronRightCircle, Heart } from 'lucide-react';
import { useSearchParams, useNavigate } from "react-router-dom";
import ViewAllReviewsComponent from "../../components/ViewAllReviews/ViewAllReviews";
import './index.css'
export const GalleryView = ({images}) =>{
    return (
        <>
        <Carousel 
            slide={false} 
            prevLabel={null} 
            nextLabel={null}
            >
                {images.map((image)=>{
                    return (
                        <Carousel.Item>
                            <Image src={image.url} height={'500px'} width={'100%'} />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
            </>
    )
}
const HotelPageComponent = () => {
    const navigate = useNavigate();
    const [openModal,setOpenModal] = useState(false);
    const [hotelDetails, setHotelDetails] = useState({});
    const [openReviewModal,setOpenReviewModal] = useState(false);
    const desc = 'loremIncididunt eiusmod ex ullamco esse do duis culpa ipsum dolor ea cupidatat. Sunt nisi eu voluptate aliqua nisi duis nulla. Ea adipisicing laborum ullamco quis aute laborum nulla. Cillum enim et ut ex minim. Non irure magna in amet non minim ullamco. Do culpa minim laborum sunt magna eu reprehenderit anim. Excepteur labore consequat consequat ea fugiat excepteur id aliqua proident. Laboris eu ea nisi non occaecat eiusmod nulla excepteur amet incididunt cillum. Esse ex cupidatat laborum amet duis reprehenderit aliqua est in anim. Veniam ut ipsum adipisicing incididunt aliquip amet non. Ut exercitation culpa cupidatat excepteur consequat aliquip do amet. Ullamco aliquip enim in non exercitation reprehenderit veniam et quis. Amet cillum nisi esse tempor elit consequat ut consectetur proident dolor excepteur et.';
    const location ={ Latitude: 7.9246,Longitude: 98.2792 }
    const [searchParams] = useSearchParams();
    const handleViewGallery = () => {
        setOpenModal(true);
    }
    const handleViewAllReviews = () =>{
        setOpenReviewModal(true);
    }
    const { sessionId, productId, hotelId, tokenId} = Object.fromEntries([...searchParams]);
    const getHotelDetails = async()=>{
        const hotelData = await api.getHotelDetails({ sessionId, productId, hotelId, tokenId});
        if(hotelData){
            setHotelDetails(hotelData);
        }
        else{
            navigate('/');
        }
        
    }
    useEffect(()=>{
        getHotelDetails();
    },[]);
    return (
        <div className="hotel-page">
        <div className="back-button"> 
            <ChevronLeft size={'15px'}/> 
            <div style={{fontSize:'15px'}}>See all properties</div>
        </div>
        <GalleryComponent handleViewGallery={handleViewGallery} images={hotelDetails.hotelImages}/>
        <div className="navigation-list">
            <NavList items={HotelDetailsNavigationList} />
        </div>
        <hr />
            <HotelDescriptionComponent title='InterContinental Phuket' description={desc} location={location} ratings={5}/>
            <AmenitiesComponent amenities={AmenitiesList} />
            <hr />
            <div className="title" id="accommodation">
                    Types of accommodation
                </div>
            <div className="accomodation-section">
                
            {AccomodationAmenities.map((item)=><AccomodationComponent  amenities={item.amenities} capacity={item.capacity} name={item.name}  price={item.price}/>)}
            </div>
            <hr />
            <div className="title" id="accommodation">
                    Popular things to do nearby
                </div>
            <ActivitiesComponent />
            <hr />
            <LocationComponent address={hotelDetails.address}/>
            <hr />
            <PoilciesComponent Policies={Policies}/>
            <hr />
            <ReviewComponent totalRating={hotelDetails.hotelRating} handleViewAllReviews={handleViewAllReviews}/>
            <hr/>
            <OtherHotelCardsComponent />
            {openModal && <ModalComponent show={openModal} onHide={()=>setOpenModal(false)} title={'Gallery View'}>
                    <GalleryView images={hotelDetails.hotelImages}/>
                </ModalComponent>
                }
            {openReviewModal && <ModalComponent show={openReviewModal} onHide={()=>setOpenReviewModal(false)} title={'Reviews'}>
                    <ViewAllReviewsComponent reviews={Reviews} />
                </ModalComponent>}
        </div>
    );
}

export default HotelPageComponent;