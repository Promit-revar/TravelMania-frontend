import React, { useEffect, useState } from "react";
import * as api from "../../api/hotelApis.js";
import "./index.css";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";
import moment from "moment";
import { iternaryTemplate } from "./iternaryTemplate.js";
import ErrorHandlingComponent from "../../UI/components/Errors/Error.jsx";
import LocationComponent from "../../components/Location/Location.jsx";
import CarouselComponent from "../../components/Carousel/Carousel";
import Skeleton from "react-loading-skeleton";
const BookingSuccess = () => {
  const [bookingDetails, setBookingDetails] = useState({});
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const confrimBooking = async () => {
    const response = await api.bookingConfirmation();
    if (response.error) setIsError(response.error);
    setBookingDetails({ ...response.data });
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    confrimBooking();
  }, []);
  const handleDownloadIternary = async () => {
    const response = await api.getPDF(iternaryTemplate(bookingDetails));
    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }

    const blob = await response.blob();
    saveAs(blob, "booking-iternary.pdf");
  };
  return (
    <div className="booking-success">
      {isError && <ErrorHandlingComponent error={isError} />}
      {!isError && (
        <div className="d-flex flex-column w-100">
          {!isLoading && (
            <div className="banner success-msg">Hoorah! Booking Successful</div>
          )}
          {isLoading && <Skeleton height={"50px"} />}
          <div className="booking-flex">
            <div className="booking-section">
              <div className="order-form">
                <div className="d-flex flex-row justify-content-between">
                  {isLoading && <Skeleton height={"30px"} width={"250px"} />}
                  {!isLoading && (
                    <div className="sub-title-1">Booking Details</div>
                  )}
                  <div>
                    {!isLoading && (
                      <Download onClick={handleDownloadIternary} />
                    )}
                  </div>
                </div>
                <hr />
                <div className="booking-ref">
                  {!isLoading && (
                    <>
                      <div className="guest-name">
                        Booking Ref No.: {bookingDetails?.referenceNum}
                      </div>
                      <div className="guest-name">
                        Supplier Confirmation Number:{" "}
                        {bookingDetails?.supplierConfirmationNum}
                      </div>
                    </>
                  )}
                  {isLoading && (
                    <>
                      <Skeleton height={"20px"} width={"200px"} />
                      <Skeleton height={"20px"} width={"200px"} />
                    </>
                  )}
                </div>
                {isLoading && <Skeleton height={"20px"} width={"100px"} />}
                {!isLoading && (
                  <div className="d-flex flex-row guest-name">
                    Status: &nbsp;<div className="text-success">Confirmed</div>
                  </div>
                )}
                {isLoading && <Skeleton height={"500px"} />}
                {!isLoading && (
                  <LocationComponent location={bookingDetails?.geoData} />
                )}
                {!isLoading && <div className="mt-3 title">Guests:</div>}
                {isLoading && <Skeleton height={"20px"} width={"100px"} />}
                {!isLoading && (
                  <div>
                    {bookingDetails?.roomBookDetails?.rooms.map((room, i) => (
                      <>
                        <div className="room-title">
                          Room {i + 1}: {room.name}
                        </div>
                        <div>
                          {room.paxDetails.name.map((guest) => (
                            <div className="guest-name">{guest}</div>
                          ))}
                        </div>
                      </>
                    ))}
                  </div>
                )}
                {isLoading && (
                  <div>
                    {[1].map((skeleton) => (
                      <>
                        <Skeleton height={"20px"} width={"250px"} />
                        <div>
                          {[1, 2].map((guest) => (
                            <Skeleton height={"20px"} />
                          ))}
                        </div>
                      </>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="booking-details">
              {!isLoading && <CarouselComponent width="100%" />}
              {isLoading && <Skeleton height={"250px"} />}
              <div className="booking-details-content p-3">
                <div className="title">{bookingDetails?.hotelName}</div>
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
                      {bookingDetails?.roomBookDetails?.rooms[0]?.name}
                    </>
                  )}
                  {isLoading && <Skeleton height={"20px"} />}
                </div>
                <div className="mt-3">
                  {!isLoading && (
                    <>
                      <b>Room Details:</b>{" "}
                      {bookingDetails?.roomBookDetails?.rooms[0]?.description}
                    </>
                  )}
                  {isLoading && <Skeleton height={"20px"} />}
                </div>
                <div className="mt-3">
                  {!isLoading && (
                    <>
                      <b>Fare Type:</b>{" "}
                      {bookingDetails?.roomBookDetails?.fareType}
                    </>
                  )}
                  {isLoading && <Skeleton height={"20px"} />}
                </div>
                <div className="mt-3">
                  {!isLoading && (
                    <>
                      <b>Cancellation Policy:</b>{" "}
                      {bookingDetails?.roomBookDetails?.cancellationPolicy}
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
                          new Date(bookingDetails?.roomBookDetails?.checkIn)
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
                          new Date(bookingDetails?.roomBookDetails?.checkOut)
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
        </div>
      )}
    </div>
  );
};
export default BookingSuccess;
