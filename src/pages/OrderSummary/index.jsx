import React, { useContext, useState, useEffect } from "react";
import CarouselComponent from "../../components/Carousel/Carousel";
import DropdownComponent from "../../UI/components/Dropdown/Dropdown";
import PhoneInput from "react-phone-input-2";
import Button from "../../UI/components/Button/Button";
import moment from "moment";
import { HotelBookingContext } from "../../Context/hotelBookingContext";
import "react-phone-input-2/lib/style.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as api from "../../api/hotelApis.js";
import { LoaderContext } from "../../Context/loaderContext.jsx";
import { jwtDecode } from "jwt-decode";
import ErrorHandlingComponent from "../../UI/components/Errors/Error.jsx";
import "./index.css";

const OrderSummaryPage = () => {
  const { hotelBookingDetails, setHotelBookingDetails } =
    useContext(HotelBookingContext);
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(LoaderContext);
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
  const confirmBooking = async (e) => {
    e.preventDefault();
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
    };
    const response = await api.bookHotel({ requestData: roomBookingDetails, geoData });
    if (response.data.bookingData.status === "CONFIRMED") {
      const { url } = response.data.stripeSession;
      window.location.replace(url);
    }
  };
  const getRoomDetails = async () => {
    const response = await api.getRoomDetails({
      sessionId,
      productId,
      rateBasisId,
      tokenId,
    });
    if(!response.data || response.error){
      // setIsError({value: true, message: "Something went wrong!"});
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
      <div className="title">Order Summary</div>
      <div className="booking-section">
        <div className="order-form">
          <div className="sub-title-1">Who's checking in?</div>
          <form onSubmit={confirmBooking}>
            {occupancy.map((item, index) => (
              <>
                <div className="mt-4">
                  <b>Rooms {item.room_no}:</b> {item.adult} Adults, Non-smoking
                </div>
                <div className="mb-2">
                    {Array(item.adult)
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
                  
                </div>
              </>
            ))}

            <div className="d-flex flex-column mt-5" style={{ gap: "10px" }}>
              <input
                className="form-control"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                id="outlined-required"
                label="email"
              />
              <PhoneInput country={"us"} onChange={(e) => setPhoneNo(e)} />
              <textarea
                rows={8}
                className="form-control"
                defaultValue="Booking Remarks"
                onChange={(e) => setBookingRemarks(e.target.value)}
                required
                id="outlined-required"
                label="email"
              />
            </div>
            <Button label="Confirm" />
          </form>
        </div>
        <div className="booking-details">
          <CarouselComponent width="100%" />
          <div className="booking-details-content p-3">
            <div className="title">{searchParams.get("hotelName")}</div>
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
              <div className="d-flex flex-row justify-content-between">
                <b>Check-in:</b>
                <div>{moment(new Date(checkin)).format("DD, MMM YYYY")}</div>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <b>Check-out:</b>
                <div>{moment(new Date(checkout)).format("DD, MMM YYYY")}</div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div
        className="booking-details p-3 mt-3"
        style={{ alignSelf: "flex-end" }}
      >
        <div className="title">Price Details</div>
        <hr />
        <div className="mt-2">{roomDetails.description}</div>
        <div>Taxes & Fees</div>
        <hr />
        <div className="d-flex flex-row justify-content-between">
          <b>Total</b>
          <div>
            {roomDetails.netPrice}&nbsp;<b>{roomDetails.currency}</b>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummaryPage;
