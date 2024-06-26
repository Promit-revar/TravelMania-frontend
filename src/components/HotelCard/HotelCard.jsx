import React,{useContext} from "react";
import CarouselComponent from "../Carousel/Carousel";
import { useNavigate } from "react-router-dom";
import { HotelContext } from "../../Context/hotelDetailsContext";
import Image from "../../UI/components/Image/Image";
import * as api from "../../api/hotelApis";
import './HotelCard.css';
const HotelCardComponent = ({price, ratings, reviews, desc, amenitites, name, imgs, requestParams, hotelSearch}) => {
    const navigate= useNavigate();
    const {hotelDetails, setHotelDetails} = useContext(HotelContext);
    const handleCardClick = async() => {
        const response = await api.getToken({
            sessionId: hotelDetails.params.sessionId,
            checkin: hotelSearch.checkin,
            checkout: hotelSearch.checkout,
            occupancy: hotelSearch.occupancy,
            tokenId: requestParams.tokenId,
            hotelId: requestParams.hotelId,
            productId: requestParams.productId,
        });
        navigate(`/hotel-details/?id=${response.data.token}`);
    }
    return (
        <div style={{display: 'flex', flexDirection: 'row'}} className="hotel-card-mgt" onClick={handleCardClick}>
        {/* <CarouselComponent height="300px" width="350px" src={imgs}/> */}
        <div className="thumbnail-img"><img height="300px" width="350px" src={imgs[0].url}  className="thumbnail-img"/></div>
        <div className="hotel-card">
            
            <div>
                <div className="hotel-card-title">{name}</div>
                <div className="hotel-card-amenities">{amenitites.map(item => {
                        return (<div className="hotel-card-amenities-item">
                            <Image src={item?.icon} height={100} width={50}/>
                            <div className="hotel-card-amenities-item-name">{item.name}</div>
                            </div>);
                })}</div>
                <div className="hotel-card-desc">{desc}</div>
                <div className="hotel-card-price">${price.night}</div>
                <div className="hotel-card-footer">
                    <div className="hotel-card-ratings">{ratings}</div>
                    <div className="hotel-card-footer-right-section">
                        <div className="hotel-card-review">
                            <div className="hotel-card-review-title">Very Good</div>
                            <div className="hotel-card-review-number">{reviews} reviews</div>
                        </div>
                        <div className="hotel-card-price-total">
                            <div className="hotel-card-price-amount">${price.total} total</div>
                            <div className="hotel-card-price-tax">includes taxes & fees</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
};
export default HotelCardComponent;