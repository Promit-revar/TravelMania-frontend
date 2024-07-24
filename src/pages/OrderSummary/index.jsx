import React, { useState, useEffect, useContext } from "react";
import CarouselComponent from "../../components/Carousel/Carousel";
import DropdownComponent from "../../UI/components/Dropdown/Dropdown";
import PhoneInput from "react-phone-input-2";
import Button from "../../UI/components/Button/Button";
import moment from "moment";
import "react-phone-input-2/lib/style.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as api from "../../api/hotelApis.js";
import { jwtDecode } from "jwt-decode";
import Skeleton from "react-loading-skeleton";
import { LoaderContext } from "../../Context/loaderContext.jsx";
import ErrorHandlingComponent from "../../UI/components/Errors/Error.jsx";
import "./index.css";

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const {setIsLoadingContext} = useContext(LoaderContext);
  const [ isLoading, setIsLoading ] = useState(true);
  const [isError, setIsError] = useState({value: false, error: ""});
  const [roomDetails, setRoomDetails] = useState({});
  const [searchParams] = useSearchParams();
  const token = searchParams.get("id");
  const {
    rateBasisId,
    sessionId,
    tokenId,
    productId,
    checkin,
    checkout,
    occupancy,
    geoData,
  } = jwtDecode(token);
  const adult = occupancy.reduce((partialSum, a) => partialSum + a.adult, 0);
  const rooms = occupancy.length;
  const [title, setTitle] = useState(occupancy.map(item=>Array(item.adult).fill("Mr")));
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [bookingRemarks, setBookingRemarks] = useState("");
  const [bookingDetails, setBookingDetails] = useState({});
  const confirmBooking = async (e) => {
    e.preventDefault();
    setIsLoadingContext(true);
    const firstNames = [];
    const lastNames = [];
    let tempFirstName;
    let tempLastName;
    for(var j = 0; j< rooms ;j++){
        tempFirstName=[];
        tempLastName=[];
    for (var i = 0; i < occupancy[j].adult; i++) {
      const fname = document.getElementById(`fname${j}${i}`).value;
      const lname = document.getElementById(`lname${j}${i}`).value;
      tempFirstName.push(fname);
      tempLastName.push(lname);
    }
    firstNames.push([...tempFirstName]);
    lastNames.push([...tempLastName]);
}
    const paxDetails = occupancy.map((item, index) => {
        return {
          room_no: index + 1,
          adult: {
            title: title[index],
            firstName: firstNames[index],
            lastName: lastNames[index],
          },
        };
      });
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
      checkin,
      checkout,
    };
    const response = await api.bookHotel({ requestData: roomBookingDetails, geoData, hotelName: searchParams.get("hotelName")});
    // if (response.data.bookingData.status === "CONFIRMED") {
      const { url } = response.data.stripeSession;
      // setBookingDetails(response.bookingData);
      window.location.replace(url);
      setIsLoadingContext(false);
    // }

  };
  const getRoomDetails = async () => {
    const response = await api.getRoomDetails({
      sessionId,
      productId,
      rateBasisId,
      tokenId,
    });
    if(!response.data || response.error || response.data.error){
      setIsError({value: true, message: "Something went wrong!"});
      navigate('/');
    }
    else{
      setRoomDetails(response.data.roomRates.perBookingRates[0]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getRoomDetails();
  }, []);
  return (
   <div className="order-summary">
    {isError && <ErrorHandlingComponent error={isError}/>}
    {!isError && <>
    {/* {searchParams.get("success")?<div className="banner success-msg">Hoorah! Booking Successful</div>: <div className="banner failure-msg">Sorry! Booking Failed</div>} */}
      <div className="title">Order Summary</div>
      <div className="booking-section">
        <div className="order-form">
          {!isLoading && <div className="sub-title-1">Who's checking in?</div>}
          {isLoading && <Skeleton height={'30px'} width={'300px'}/>}
          <form onSubmit={confirmBooking}>
            {occupancy.map((item, index) => (
              <>
                <div className="mt-4">
                  {!isLoading && <><b>Rooms {item.room_no}:</b> {item.adult} Adults, Non-smoking</>}
                  {isLoading && <Skeleton height={'20px'}/>}
                </div>
                <div className="mb-2">
                    {!isLoading && Array(item.adult)
                      .fill(1)
                      .map((adult, j) => (
                        <div>
                        {" "}
                        Traveller {index + 1}
                        <div className="d-flex flex-row mt-2" style={{ gap: "10px" }}>
                          <DropdownComponent
                            options={[
                              { value: "Mr", label: "Mr." },
                              { value: "Mrs", label: "Mrs." },
                              { value: "Miss", label: "Ms." },
                            ]}
                            index2 = {j}
                            index={index}
                            setTitle={setTitle}
                            title={title}
                          />
                          <input
                            className="form-control"
                            placeholder="First Name"
                            id={`fname${index}${j}`}
                            required
                            label="Fname"
                          />
                          <input
                            className="form-control"
                            placeholder="Last Name"
                            id={`lname${index}${j}`}
                            required
                            label="Lname"
                          />
                          </div>
                        </div>
                      ))}
                      {isLoading && 
                      Array(2)
                      .fill(1)
                      .map((skeleton) => (
                        <div>
                        <div className="d-flex flex-row mt-2" style={{ gap: "10px" }}>
                          <Skeleton height={'30px'} width={'100px'}/>
                          <Skeleton height={'30px'} width={'300px'}/>
                          <Skeleton height={'30px'} width={'300px'}/>
                          </div>
                        </div>))}
                  
                </div>
              </>
            ))}

            <div className="d-flex flex-column mt-5" style={{ gap: "10px" }}>
              {!isLoading && <input
                className="form-control"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                id="outlined-required"
                label="email"
              />}{
                isLoading && <Skeleton height={'30px'} />
              }
              {!isLoading && <PhoneInput country={"us"} onChange={(e) => setPhoneNo(e)} />}
              {
                isLoading && <Skeleton height={'30px'} />
              }
              {!isLoading && <textarea
                rows={8}
                className="form-control"
                defaultValue="Booking Remarks"
                onChange={(e) => setBookingRemarks(e.target.value)}
                required
                id="outlined-required"
                label="email"
              />}
              {
                isLoading && <Skeleton height={'180px'} />
              }
            </div>
            {!isLoading && <Button label="Confirm" />}
            {isLoading &&<div className="mt-3"><Skeleton height={'40px'}/></div> }
          </form>
        </div>
        <div className="booking-details">
              {!isLoading && <CarouselComponent width="100%" />}
              {isLoading && <Skeleton height={"250px"} />}
              <div className="booking-details-content p-3">
                {!isLoading && <div className="title">{searchParams.get("hotelName")}</div>}
                {isLoading && <Skeleton height={'20px'} />}
                <hr />
                <div className="booking-details-reviews">
                  {!isLoading && (
                    <>
                      <div className="hotel-card-ratings">8</div>
                      <div className="booking-details-reviews-text">
                        <div className="booking-details-reviews-text-title">
                          Very Good
                        </div>
                        <div className="booking-details-reviews-text-number">
                          167 reviews
                        </div>
                      </div>
                    </>
                  )}
                  {isLoading && <Skeleton height={"40px"} width={"200px"} />}
                </div>
                <div className="mt-3">
                  {!isLoading && (
                    <>
                      <b>Room:</b>{" "}
                      {roomDetails.roomType}
                    </>
                  )}
                  {isLoading && <Skeleton height={"20px"} />}
                </div>
                <div className="mt-3">
                  {!isLoading && (
                    <>
                      <b>Room Details:</b>{" "}
                      {roomDetails.description}
                    </>
                  )}
                  {isLoading && <Skeleton height={"20px"} />}
                </div>
                <div className="mt-3">
                  {!isLoading && (
                    <>
                      <b>Fare Type:</b>{" "}
                      {roomDetails.fareType}
                    </>
                  )}
                  {isLoading && <Skeleton height={"20px"} />}
                </div>
                <div className="mt-3">
                  {!isLoading && (
                    <>
                      <b>Cancellation Policy:</b>{" "}
                      {roomDetails.cancellationPolicy}
                    </>
                  )}
                  {isLoading && <Skeleton height={"20px"} />}
                </div>
                <div className="mt-3 d-flex flex-column">
                  <div className="d-flex flex-row justify-content-between">
                    {!isLoading && <b>Check-in:</b>}
                    {isLoading && <Skeleton height={"20px"} width={"100px"} />}
                    {/* bookingDetails.roomBookDetails.checkIn */}
                    {!isLoading && (
                      <div>
                        {moment(
                          new Date(checkin)
                        ).format("DD, MMM YYYY")}
                      </div>
                    )}
                    {isLoading && <Skeleton height={"20px"} width={"100px"} />}
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    {!isLoading && <b>Check-out:</b>}
                    {isLoading && <Skeleton height={"20px"} width={"100px"} />}
                    {!isLoading && (
                      <div>
                        {moment(
                          new Date(checkout)
                        ).format("DD, MMM YYYY")}
                      </div>
                    )}
                    {isLoading && <Skeleton height={"20px"} width={"100px"} />}
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row w-100 justify-content-between title">
                  {!isLoading && <div>{"Total Amount (Paid)"}</div>}
                  {isLoading && <Skeleton height={"20px"} width={"100px"} />}
                  {!isLoading && (
                    <div>
                      {bookingDetails?.roomBookDetails?.NetPrice}
                      {bookingDetails?.roomBookDetails?.currency}
                    </div>
                  )}
                  {isLoading && <Skeleton height={"20px"} width={"100px"} />}
                </div>
                {!isLoading && <div>{"(inclusive taxes)"}</div>}
                {isLoading && <Skeleton />}
              </div>
            </div>
      </div>
      <div
        className="booking-details p-3 mt-3"
        style={{ alignSelf: "flex-end" }}
      >
        {!isLoading && <div className="title">Price Details</div>}
        {isLoading && <Skeleton height={'30px'} width={'200px'}/>}
        <hr />
        {!isLoading && <><div className="mt-2">{roomDetails.description}</div><div>Taxes & Fees</div></>}
        {isLoading && <><Skeleton height={'20px'}/><Skeleton height={'20px'}/></>}
        
        <hr />
        <div className="d-flex flex-row justify-content-between">
          {!isLoading && <><b>Total</b>
          <div>
            {roomDetails.netPrice}&nbsp;<b>{roomDetails.currency}</b>
          </div></>}
          {isLoading && <Skeleton height={'20px'} width={'330px'}/>}
        </div>
      </div></>}
    </div>
  );
};
export default OrderSummaryPage;
