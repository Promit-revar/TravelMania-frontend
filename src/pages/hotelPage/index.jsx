import React,{useState} from "react";
import NavBarComponent from "../../components/Navbar/Navbar";
import GalleryComponent from "../../components/Gallery/Gallery";
import NavList from "../../components/NavigationList/NavList";
import { HotelDetailsNavigationList, AmenitiesList } from "../../constants/constants";
import HotelDescriptionComponent from "../../components/HotelDescription/HotelDescription";
import AmenitiesComponent from "../../components/Amenities/Amenities";
import AccomodationComponent from "../../components/Accomodation/Accomodation";
import {AccomodationAmenities} from '../../constants/constants';
import ActivitiesComponent from "../../components/Activites/Activites";
import { ChevronLeft } from 'lucide-react';
import LocationComponent from "../../components/Location/Location";
import PoilciesComponent from "../../components/Policies/Policies";
import ReviewComponent from "../../components/Reviews/Reviews";
import OtherHotelCardsComponent from "../../components/OtherHotels/OtherHotelsCards";
import { Policies } from "../../constants/constants";
import './index.css'
const HotelPageComponent = () => {
    const desc = 'loremIncididunt eiusmod ex ullamco esse do duis culpa ipsum dolor ea cupidatat. Sunt nisi eu voluptate aliqua nisi duis nulla. Ea adipisicing laborum ullamco quis aute laborum nulla. Cillum enim et ut ex minim. Non irure magna in amet non minim ullamco. Do culpa minim laborum sunt magna eu reprehenderit anim. Excepteur labore consequat consequat ea fugiat excepteur id aliqua proident. Laboris eu ea nisi non occaecat eiusmod nulla excepteur amet incididunt cillum. Esse ex cupidatat laborum amet duis reprehenderit aliqua est in anim. Veniam ut ipsum adipisicing incididunt aliquip amet non. Ut exercitation culpa cupidatat excepteur consequat aliquip do amet. Ullamco aliquip enim in non exercitation reprehenderit veniam et quis. Amet cillum nisi esse tempor elit consequat ut consectetur proident dolor excepteur et.';
    const location ={ Latitude: 7.9246,Longitude: 98.2792 }
    return (
        <div className="hotel-page">
        <NavBarComponent />
        <hr />
        <div className="back-button"> 
            <ChevronLeft size={'15px'}/> 
            <div style={{fontSize:'15px'}}>See all properties</div>
        </div>
        <GalleryComponent />
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
            <LocationComponent address={'333, 333/3 Moo 3, Kamala Beach, Kamala, Kathu, Phuket 83150, Thailand'}/>
            <hr />
            <PoilciesComponent Policies={Policies}/>
            <hr />
            <ReviewComponent totalRating={9.4}/>
            <hr/>
            <OtherHotelCardsComponent />
        </div>
    );
}

export default HotelPageComponent;