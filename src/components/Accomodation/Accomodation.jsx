import React from "react";
import CarouselComponent from "../Carousel/Carousel";
import Image from "../../UI/components/Image/Image";
import './Accomodation.css';
const AccomodationComponent = ({amenities, capacity, name, price, openAccomodationModal}) =>{
    const handleAccomodationSelect = () => {
        openAccomodationModal(true);
    }
    return (
        <div id="accomodation" onClick={handleAccomodationSelect}>
            <CarouselComponent />
            <div className="details">
                <div className="details-info">
                <div className="details-title">{name}</div>
                <ul className="details-list">
                    {
                        amenities.map(item=>{
                        return (
                        <li>
                            <Image src={item.icon} height='60px' width='60px'/>
                            <div>
                                {item.name}
                            </div>
                        </li>
                        );
                    })
                    }
                </ul>
                </div>
                <div className="price">
                    <div className="price-value">{price} THB </div>
                    <div className="price-rate">per night</div>
                </div>
                
            </div>
        </div>
    )
}
export default AccomodationComponent;