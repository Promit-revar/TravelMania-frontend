import React,{useState} from "react";
import NavBarComponent from "../../components/Navbar/Navbar";
import GalleryComponent from "../../components/Gallery/Gallery";
import NavList from "../../components/NavigationList/NavList";
import { HotelDetailsNavigationList } from "../../constants/constants";
import { ChevronLeft } from 'lucide-react';
import './index.css'
const HotelPageComponent = () => {
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
        </div>
    );
}

export default HotelPageComponent;