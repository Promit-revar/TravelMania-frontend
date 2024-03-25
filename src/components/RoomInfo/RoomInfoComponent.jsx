import React from "react";
import "./RoomInfo.css";
import CarouselComponent from "../Carousel/Carousel";
const RoomInfoComponent = () => {
    return (
        <div className="roomInfo">
            <div>Room Information</div>
            <CarouselComponent />
            <div className="title"></div>
            <div className="highlights"></div>
            <div className="facilities"></div>
            <div>
            <div>Room amenities</div>
            <div>
                <div>
                    <div className="hotel-info-accessibilities">
                        <div></div>
                        <ul></ul>
                    </div>
                </div>
                <div>

                </div>
            </div>
            </div>
        </div>
    )
}