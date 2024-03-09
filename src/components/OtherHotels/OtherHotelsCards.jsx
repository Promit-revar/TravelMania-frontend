import React from "react";
import './OtherHotelsCards.css';
import Image from "../../UI/components/Image/Image";
import hotel1 from '../../assets/Palm-Seaside-main.jpeg';
import hotel2 from '../../assets/IMG_7233.jpg';
import hotel3 from '../../assets/IMG_7232.jpg';
import { MapPin } from 'lucide-react';
const HotelCard = ({imgsrc, name, location}) =>{
    return (
        <div className="hotel-card">
            <Image src={imgsrc} height={'200px'} width='350px' />
            <div className="hotel-title">
                {name}
            </div>
            <div className="hotel-address">
                <div><MapPin fill="#399a7a" color="#fff" /></div>
                <div>{location}</div> 
            </div>
        </div>
    )
}
const OtherHotelCardsComponent = () => {
    return (
        <div className="hotels">
            <div className="title" id="hotels">
                You might also like
            </div>
            <div className="hotel-cards-list">
                <HotelCard imgsrc={hotel1} name={'Twinpalms Montazure'} location={'106/46 Moo 3, Surin Beach Road, Choeng Thale, Thalang District, Phuket 83110'} />
                <HotelCard imgsrc={hotel2} name={'Banyan Tree'} location={'33, 33/27 Moo 4, Srisoonthorn Road, Cherngtalay, Choeng Thale, Phuket 83110'} />
                <HotelCard imgsrc={hotel3} name={'Hyatt Regency Phuket Resort'} location={'16/12 Moo 6, Tambon Kamala, Amphoe Kathu, Phuket 83150, 83150 Kamala Beach'} />
            </div>
        </div>
    )
};
export default OtherHotelCardsComponent;