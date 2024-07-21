import React,{useEffect, useState, useRef} from "react";
import * as api from "../../api/hotelApis.js";
import './index.css'
import { saveAs } from 'file-saver';
import { Download } from 'lucide-react';
import moment from "moment";
import {iternaryTemplate} from './iternaryTemplate.js';
import ErrorHandlingComponent from "../../UI/components/Errors/Error.jsx";
import LocationComponent from "../../components/Location/Location.jsx";
import CarouselComponent from "../../components/Carousel/Carousel";
const BookingSuccess = () => {
    const [bookingDetails, setBookingDetails] = useState({});
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const contentRef = useRef();
    const confrimBooking = async() =>{
        const response = await api.bookingConfirmation();
        if(response.error)
            setIsError(response.error);
        setBookingDetails({...response.data});
    }
    useEffect(()=>{
        setIsLoading(true);
        confrimBooking();
        setIsLoading(false);
    },[]);
    const handleDownloadIternary = async() => {
        const response = await api.getPDF(iternaryTemplate(bookingDetails));
    if (!response.ok) {
        throw new Error('Failed to generate PDF');
    }

    const blob = await response.blob();
    saveAs(blob, 'booking-iternary.pdf');
    }
    return(
        <div className="booking-success" >
            {/* <div id="content"  dangerouslySetInnerHTML={{ __html: iternaryTemplate()}} style={{display:'none'}}/> */}
            {isError && <ErrorHandlingComponent error={isError}/>}
            {!isError && <div className="d-flex flex-column w-100" ><div className="banner success-msg">Hoorah! Booking Successful</div>
            <div className="d-flex flex-row">
            <div className="booking-section">
                <div className="order-form">
                <div className="d-flex flex-row justify-content-between">
                <div className="sub-title-1">Booking Details</div>
                <div><Download onClick={handleDownloadIternary}/></div>
                </div><hr />
                <div className="d-flex justify-content-between"><div className="guest-name">Booking Ref No.: {bookingDetails?.referenceNum}</div><div className="guest-name">Supplier Confirmation Number: {bookingDetails?.supplierConfirmationNum}</div></div>
                <div className="d-flex flex-row guest-name" >Status: &nbsp;<div className="text-success">Confirmed</div></div>
                <LocationComponent location={bookingDetails?.geoData}/>
                <div className="mt-3 title">Guests:</div>
                        <div>{bookingDetails?.roomBookDetails?.rooms.map((room,i)=>(<>
                                <div className="room-title">Room {i+1}: {room.name}</div>
                                <div>{room.paxDetails.name.map((guest)=>(
                                    <div className="guest-name">{guest}</div>
                                ))}</div>
                            </>
                        ))}</div>
                </div>
                </div>
                {!isLoading && <div ref={contentRef} className="booking-details">
          <CarouselComponent width="100%" />
          <div className="booking-details-content p-3">
            <div className="title">{bookingDetails?.hotelName}</div>
            <hr />
            <div className="booking-details-reviews">
              <div className="hotel-card-ratings">8</div>
              <div className="booking-details-reviews-text">
                <div className="booking-details-reviews-text-title">
                  Very Good
                </div>
                <div className="booking-details-reviews-text-number">
                  167 reviews
                </div>
              </div>
            </div>
            <div className="mt-3">
              <b>Room:</b> {bookingDetails?.roomBookDetails?.rooms[0]?.name}
            </div>
            <div className="mt-3">
              <b>Room Details:</b> {bookingDetails?.roomBookDetails?.rooms[0]?.description}
            </div>
            <div className="mt-3">
              <b>Fare Type:</b> {bookingDetails?.roomBookDetails?.fareType}
            </div>
            <div className="mt-3">
              <b>Cancellation Policy:</b> {bookingDetails?.roomBookDetails?.cancellationPolicy}
            </div>
            <div className="mt-3 d-flex flex-column">
              <div className="d-flex flex-row justify-content-between">
                <b>Check-in:</b>
                {/* bookingDetails.roomBookDetails.checkIn */}
                <div>{moment(new Date(bookingDetails?.roomBookDetails?.checkIn)).format("DD, MMM YYYY")}</div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <b>Check-out:</b>
                <div>{moment(new Date(bookingDetails?.roomBookDetails?.checkOut)).format("DD, MMM YYYY")}</div>
              </div>
            </div>
            <hr />
            <div className="d-flex flex-row w-100 justify-content-between title">
                <div>
                    {'Total Amount (Paid)'}
                </div>
                <div>
                    {bookingDetails?.roomBookDetails?.NetPrice}
                    {bookingDetails?.roomBookDetails?.currency}
                </div>
            </div>
            <div>{'(inclusive taxes)'}</div>
          </div></div>}</div>
                </div>}
        </div>
    );
}
export default BookingSuccess;