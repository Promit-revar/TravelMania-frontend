import React,{useEffect, useState, useContext} from "react";
import "./RoomInfo.css";
import CarouselComponent from "../Carousel/Carousel";
import Button from '../../UI/components/Button/Button';
import { LoaderContext } from "../../Context/loaderContext.jsx";
import { Sparkles, Accessibility, Tv2, BedDouble, Bath,  UtensilsCrossed , Wifi, TentTree, Check  } from 'lucide-react';
import { AmenitiesList } from '../../constants/constants';
import Skeleton from "react-loading-skeleton";
import * as api from "../../api/hotelApis.js";
const RoomInfoComponent = ({selectedRoom, bookHotel}) => {
    const { isLoading, setIsLoading } = useContext(LoaderContext);
    const [roomDetails, setRoomDetails] = useState({});
    const roomAmenities = [{
        name: 'Accessibilities',
        icon: <Accessibility />,
        items: 8
    },{
        name: 'Bedroom',
        icon: <BedDouble/>,
        items: 9
    },{
        name: 'Bathroom',
        icon: <Bath />,
        items: 12
    },{
        name: 'Food and Drink',
        icon: <UtensilsCrossed/>,
        items: 6
    },{
        name: 'Entertainment',
        icon: <Tv2 />,
        items: 6
    },{
        name: 'Internet',
        icon: <Wifi />,
        items: 1
    },{
        name: 'Outdoor Space',
        icon: <TentTree />,
        items: 1
    },{
        name: 'More',
        icon: <Check />,
        items: 12
    }];
    const getRoomDetails = async() => {
        const response = await api.getRoomDetails(selectedRoom);
        if(!response.error){
            setRoomDetails(response.data.roomRates.perBookingRates[0]);
        }
        setIsLoading(false);
    }
    useEffect(()=>{
        setIsLoading(true);
        getRoomDetails();
    },[]);
    const handleClick = () => {
        bookHotel({...roomDetails});
    }
    return (
        <div className="roomInfo">
            {isLoading && <><Skeleton width="100%" height="300px"/>
            <Skeleton width="100%" height="20px"/>
            <Skeleton width="100%" height="20px"/>
            <Skeleton width="100%" height="20px"/>
            <Skeleton width="100%" height="20px"/> 
            </>}
            {!isLoading && <><CarouselComponent width="100%" height="300px"/>
            <div className="title">{roomDetails.roomType}</div>
            <div style={{ fontSize:'14px'}}>Mountain view</div>
            <div className="highlights"><Sparkles fill="#000"/><b>Highlights:</b> &nbsp;&nbsp;Furnished balcony or patio Surounded Air Conditioning Connecting rooms available Individual Rooms available decorated LED TV</div>
            <div className="facilities">
                { AmenitiesList.map(item=><div style={{ display:'flex', flexDirection: 'row'}}><img src={item.icon} height={'80px'} width={'80px'}/><div style={{ display:"flex", alignItems:"center", width: '50%'}}>{item.name}</div></div>)
                }
            </div>
            <div>
            <div className="sub-title">Room amenities</div>
            <div>
                <div className="hotel-info">
                    <div className="hotel-info-left-section">
                        <ul>
                        {roomDetails.facilities && roomDetails?.facilities?.map((item,i)=>{
                        if(i<(roomDetails.facilities.length/2)){
                        return (<li>
                        {/* <div className="room-amenities-sub-title">{item.icon}{item.name}</div> */}
                        
                            {item}
                        
                        </li>);}
                        })
                        }
                        </ul>
                    </div>
                    <div className="hotel-info-right-section">
                        {roomDetails.facilities && roomDetails.facilities.map((item,i)=>{
                        if(i>=(roomDetails.facilities.length/2)){
                            return (<li>
                                {/* <div className="room-amenities-sub-title">{item.icon}{item.name}</div> */}
                                
                                    {item}
                                
                                </li>);}
                        })
                        }
                    </div>
                </div>
                <div className="reserve-block">
                        <div className="sub-title"> Room options</div>
                        <div className="room-amenities-sub-title">Cancellation Policy</div>
                        <div className="room-amenities-sub-item">{roomDetails.fareType}</div>
                        <div className="room-amenities-sub-item">{roomDetails.cancellationPolicy}</div>
                        <div className="heading-little">Reserve Now, pay later</div>
                        <div className="room-amenities-sub-title">Extras</div>
                        <div className="room-amenities-sub-item">{roomDetails.boardType}</div>
                        {/* <div className="room-amenities-sub-item">Breakfast for 2<div>+ $56</div></div>
                        <div className="room-amenities-sub-item">Breakfast for 2 + Dinner for 2 per day<div>+ $140</div></div> */}
                        <div className="price">${roomDetails.netPrice}</div>
                        {/* <div className="total-price">$9,511 total</div> */}
                        <div className="heading-little">include taxes & fees</div>
                        <div className="reserve-block-footer">
                            <div className="price-details-tag">Price details</div>
                            <div className="reserve-btn"><Button label="Reserve" onClick={handleClick}/></div>
                        </div>
                </div>
            </div>
            </div></>}
        </div>
    )
}
export default RoomInfoComponent;