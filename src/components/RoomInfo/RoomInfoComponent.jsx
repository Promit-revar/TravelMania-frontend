import React from "react";
import "./RoomInfo.css";
import CarouselComponent from "../Carousel/Carousel";
import Button from '../../UI/components/Button/Button';
import { Sparkles, Accessibility, Tv2, BedDouble, Bath,  UtensilsCrossed , Wifi, TentTree, Check  } from 'lucide-react';
import { AmenitiesList } from '../../constants/constants';
const RoomInfoComponent = () => {
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
    return (
        <div className="roomInfo">
            <div>Room Information</div>
            <CarouselComponent />
            <div className="title">Classic Room, 2 Twin Beds, Mountain View</div>
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
                        {roomAmenities.map((item,i)=>{
                        if(i<3){
                        return (<>
                        <div className="room-amenities-sub-title">{item.icon}{item.name}</div>
                        <ul>
                            {Array(item.items).fill('item').map((listItem, i)=><li>{listItem}{i}</li>)}
                        </ul>
                        </>);}
                        })
                        }
                    </div>
                    <div className="hotel-info-right-section">
                        {roomAmenities.map((item,i)=>{
                        if(i>=3){
                        return (<>
                        <div className="room-amenities-sub-title">{item.icon}{item.name}</div>
                        <ul>
                            {Array(item.items).fill('item').map((listItem, i)=><li>{listItem}{i}</li>)}
                        </ul>
                        </>);}
                        })
                        }
                    </div>
                </div>
                <div className="reserve-block">
                        <div className="sub-title"> Room options</div>
                        <div className="room-amenities-sub-title">Cancellation Policy</div>
                        <div className="room-amenities-sub-item">Non-Refundable <div>+ $0</div></div>
                        <div className="room-amenities-sub-item">Fully Refundable before 7 Apr <div>+ $47</div></div>
                        <div className="heading-little">Reserve Now, pay later</div>
                        <div className="room-amenities-sub-title">Extras</div>
                        <div className="room-amenities-sub-item">No extras <div>+ $0</div></div>
                        <div className="room-amenities-sub-item">Breakfast for 2<div>+ $56</div></div>
                        <div className="room-amenities-sub-item">Breakfast for 2 + Dinner for 2 per day<div>+ $140</div></div>
                        <div className="price">$471</div>
                        <div className="total-price">$9,511 total</div>
                        <div className="heading-little">include taxes & fees</div>
                        <div className="reserve-block-footer">
                            <div className="price-details-tag">Price details</div>
                            <div className="reserve-btn"><Button label="Reserve"/></div>
                        </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default RoomInfoComponent;