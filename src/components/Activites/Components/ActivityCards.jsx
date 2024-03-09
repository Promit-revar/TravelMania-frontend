import React from "react";
import Act1 from '../../../assets/photo_2024-03-05 17.11.43.jpeg';
import Act2 from '../../../assets/photo_2024-03-05 17.11.44.jpeg';
import Act3 from '../../../assets/photo_2024-03-05 17.11.45.jpeg';
import Image from "../../../UI/components/Image/Image";
import './ActivityCards.css';
const ActivityCardsComponent = ({imgsrc, name, price, dist}) => {
    return (
        <div className="activity-card">
            <Image src={imgsrc} height={'200px'} width={'350px'}/>
            <div className="activity-card-desc">
                <div className="activity-card-title"> {name}</div>
                <div className="activity-card-info">
                <div className="activity-card-price"> 
                    ${price}
                </div>
                <div className="distance">
                    <div>{dist} mi away</div>
                    <div className="activity-card-category">per adult</div>
                </div>
                
                </div>
            </div>
        </div>
    )
};
export default ActivityCardsComponent;