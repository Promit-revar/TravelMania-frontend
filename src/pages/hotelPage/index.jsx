import React,{useState} from "react";
import NavBarComponent from "../../components/Navbar/Navbar";
import GalleryComponent from "../../components/Gallery/Gallery";
import NavList from "../../components/NavigationList/NavList";
import { HotelDetailsNavigationList, AmenitiesList } from "../../constants/constants";
import HotelDescriptionComponent from "../../components/HotelDescription/HotelDescription";
import AmenitiesComponent from "../../components/Amenities/Amenities";
import { ChevronLeft } from 'lucide-react';
import './index.css'
const HotelPageComponent = () => {
    const desc = 'loremIncididunt eiusmod ex ullamco esse do duis culpa ipsum dolor ea cupidatat. Sunt nisi eu voluptate aliqua nisi duis nulla. Ea adipisicing laborum ullamco quis aute laborum nulla. Cillum enim et ut ex minim. Non irure magna in amet non minim ullamco. Do culpa minim laborum sunt magna eu reprehenderit anim. Excepteur labore consequat consequat ea fugiat excepteur id aliqua proident. Laboris eu ea nisi non occaecat eiusmod nulla excepteur amet incididunt cillum. Esse ex cupidatat laborum amet duis reprehenderit aliqua est in anim. Veniam ut ipsum adipisicing incididunt aliquip amet non. Ut exercitation culpa cupidatat excepteur consequat aliquip do amet. Ullamco aliquip enim in non exercitation reprehenderit veniam et quis. Amet cillum nisi esse tempor elit consequat ut consectetur proident dolor excepteur et.';
    const location ={ Latitude: 7.9246,Longitude: 98.2792 }
    return (
        <div className="hotel-page">
        <NavBarComponent />
        <hr />
        <div className="back-button"> 
            <ChevronLeft /> 
            <div style={{fontSize:20}}>See all properties</div>
        </div>
        <GalleryComponent />
        <div className="navigation-list">
            <NavList items={HotelDetailsNavigationList} />
        </div>
        <hr />
            <HotelDescriptionComponent title='InterContinental Phuket' description={desc} location={location} ratings={5}/>
            <AmenitiesComponent amenities={AmenitiesList} />
        </div>
    );
}

export default HotelPageComponent;