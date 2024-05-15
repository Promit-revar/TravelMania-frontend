import React,{useContext, useState, useEffect} from "react";
import CarouselComponent from "../../components/Carousel/Carousel";
import DropdownComponent from "../../UI/components/Dropdown/Dropdown";
import PhoneInput from 'react-phone-input-2';
import Button from "../../UI/components/Button/Button";
import moment from "moment";
import { HotelBookingContext } from "../../Context/hotelBookingContext";
import 'react-phone-input-2/lib/style.css'
import { useSearchParams, useNavigate } from "react-router-dom";
import * as api from "../../api/hotelApis.js";
import { LoaderContext } from "../../Context/loaderContext.jsx";
import "./index.css";

const OrderSummaryPage = () => {
    const { hotelBookingDetails, setHotelBookingDetails } = useContext(HotelBookingContext);
    const { isLoading, setIsLoading } = useContext(LoaderContext);
    const [ roomDetails, setRoomDetails ] = useState({});
    const [searchParams] = useSearchParams();
    const tokenId = searchParams.get('tokenId');
    const productId = searchParams.get('productId');
    const sessionId = searchParams.get('sessionId');
    const rateBasisId = searchParams.get('rateBasisId');
    const [title, setTitle] = useState(Array(Number(searchParams.get('adult'))).fill('Mr'));
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [ bookingRemarks, setBookingRemarks ] = useState("");
    console.log({hotelBookingDetails});

    const confirmBooking = async(e) => {
        e.preventDefault();
        // console.log( Array(hotelBookingDetails.reservation.occupancy[0].adult));
        const length = Number(searchParams.get('adult'));
        const firstNames = [];
        const lastNames = [];
        for(var i =0; i<length ;i++){
            const fname = document.getElementById(`fname${i}`).value;
            const lname = document.getElementById(`lname${i}`).value;
            // console.log(`${title[i]} ${fname} ${lname}`);
            firstNames.push(fname);
            lastNames.push(lname);
        }
        const paxDetails = [{
            "room_no": 1,
            adult:{
                title,
                firstName: firstNames,
                lastName: lastNames,
            }
        }]
        const clientRef = Date.now();
        const roomBookingDetails = {
            sessionId,
            productId,
            tokenId,
            rateBasisId,
            clientRef: clientRef.toString(),
            customerEmail: email,
            customerPhone: phoneNo,
            bookingNote: bookingRemarks,
            paxDetails,
        }
        const response = await api.bookHotel({...roomBookingDetails});
        if(response.data.bookingData.status === 'CONFIRMED'){
            const {url} =  response.data.stripeSession;
            window.location.replace(url);
        }
    }
    const getRoomDetails = async() => {
        const response = await api.getRoomDetails({ sessionId, productId, rateBasisId, tokenId});
        setRoomDetails(response.data.roomRates.perBookingRates[0]);
        setIsLoading(false);
    }
    useEffect(()=>{
        setIsLoading(true);
        getRoomDetails();
    },[]);
    console.log({roomDetails})
    return (
        <div className="order-summary">
            <div className="title">Order Summary</div>
            <div className="booking-section">
                <div className="order-form">
                    <div className="sub-title-1">Who's checking in?</div>
                    <div><b>Room 1:</b> {searchParams.get('adult')} Adults, Non-smoking</div>
                    <form onSubmit={confirmBooking}>
                    {Array(Number(searchParams.get('adult'))).fill(1).map((traveller, index) => (<div className="mb-2"> Traveller {index+1}<div className="d-flex flex-row mt-2" style={{ gap: "10px"}}>
                        <DropdownComponent options={[{value:'Mr',label: 'Mr.'},{value:'Mrs',label: 'Mrs.'},{value: 'Miss',label: 'Ms.'}]} index={index} setTitle={setTitle} title={title}/>
                        <input
                            className="form-control"
                            placeholder="First Name"
                            id={`fname${index}`}
                            required
                            label="Fname"
                        />
                        <input
                            className="form-control"
                            placeholder="Last Name"
                            id={`lname${index}`}
                            required
                            label="Lname"
                        />
                    </div></div>))}
                    
                    <div className="d-flex flex-column" style={{ gap: "10px"}}>
                        <input
                            className="form-control"
                            placeholder="email"
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            id="outlined-required"
                            label="email"
                        />
                        <PhoneInput
                        country={'us'}
                        onChange={(e)=>setPhoneNo(e)}
                        />
                        <textarea
                            rows={8}
                            className="form-control"
                            defaultValue="Booking Remarks"
                            onChange={(e)=>setBookingRemarks(e.target.value)}
                            required
                            id="outlined-required"
                            label="email"
                        />
                    </div>
                    <Button label="Confirm"/>
                    </form>
                </div>
                <div className="booking-details">
                    <CarouselComponent width="100%"/>
                    <div className="booking-details-content p-3">
                        <div className="title">
                            {searchParams.get('hotelName')}
                        </div>
                        <hr />
                        <div className="booking-details-reviews">
                            <div className="hotel-card-ratings">8</div>
                            <div className="booking-details-reviews-text">
                                <div className="booking-details-reviews-text-title">Very Good</div>
                                <div className="booking-details-reviews-text-number">167 reviews</div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <b>Room:</b> {roomDetails.roomType}
                        </div>
                        <div className="mt-3">
                            <b>Room Details:</b> {roomDetails.description}
                        </div>
                        <div className="mt-3">
                            <b>Fare Type:</b> {roomDetails.fareType}
                        </div>
                        <div className="mt-3">
                            <b>Cancellation Policy:</b> {roomDetails.cancellationPolicy}
                        </div>
                        <div className="mt-3 d-flex flex-column">
                            <div className="d-flex flex-row justify-content-between"><b>Check-in:</b><div>{moment(new Date(searchParams.get('checkin'))).format('DD, MMM YYYY')}</div></div>
                            <div className="d-flex flex-row justify-content-between"><b>Check-out:</b><div>{moment(new Date(searchParams.get('checkout'))).format('DD, MMM YYYY')}</div></div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="booking-details p-3 mt-3" style={{ alignSelf: 'flex-end'}}>
                        <div className="title">
                            Price Details
                        </div>
                        <hr />
                        <div className="mt-2">
                            {roomDetails.description}
                        </div>
                        <div>
                            Taxes & Fees
                        </div>
                        <hr />
                        <div className="d-flex flex-row justify-content-between">
                            <b>Total</b>
                            <div>{roomDetails.netPrice}&nbsp;<b>{roomDetails.currency}</b></div>
                        </div>
                    </div>
        </div>
    )
};
export default OrderSummaryPage;