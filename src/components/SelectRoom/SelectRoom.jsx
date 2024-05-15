import "./SelectRoom.css";
import React, { useState, useContext } from "react";
import DatePickerComponent from "../../UI/components/DatePicker/DatePicker";
import Button from "../../UI/components/Button/Button";
import DropdownComponent from "../../UI/components/Dropdown/Dropdown";
import Image from "../../UI/components/Image/Image";
import Traveller from "../../assets/Person.svg";
import { HotelContext } from "../../Context/hotelDetailsContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const SelectRoomComponent = () => {
  const { hotelDetails, setHotelDetails } = useContext(HotelContext);
  const navigate = useNavigate();
  const [isOpenRoom, setIsOpenRoom] = useState(false);
  const toggleRoomDropdown = () => {
    setIsOpenRoom(!isOpenRoom);
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  console.log({ hotelDetails });
  const setCheckInDate = (checkIn) => {
    setHotelDetails({...hotelDetails, reservation:{
        ...hotelDetails.reservation,
        checkin : checkIn,
    }});
  }
  const setCheckOutDate = (checkOut) => {
    setHotelDetails({...hotelDetails, reservation:{
        ...hotelDetails.reservation,
        checkout : checkOut,
    }});
  }
  return (
    <div className="schedule-block">
      <div className="select-block">
        <DatePickerComponent
          label="Check-in"
          date={hotelDetails.reservation.checkin?hotelDetails.reservation.checkin:moment(new Date()).format('YYYY-MM-DD') }
          setDate = {setCheckInDate}
        />
        <DatePickerComponent
          label={"Check-out"}
          date={hotelDetails.reservation.checkout?hotelDetails.reservation.checkout:moment(tomorrow).format('YYYY-MM-DD')}
          setDate = {setCheckOutDate}
        />
      </div>
      {/* <DropdownComponent options={[{value:'Travelers',label:'Travelers'}]}/> */}
      <div className="search-selector">
        <div className="select-date" onClick={toggleRoomDropdown}>
          <div style={{ marginTop: "-15px", marginLeft: "-10px" }}>
            <Image src={Traveller} height="80px" width="80px" />
          </div>
          <div style={{ marginLeft: "-15px" }}>
            <div className="select-date-title">Travellers</div>
            <div>
              {hotelDetails.reservation.occupancy[0].room_no} room,{hotelDetails.reservation.occupancy[0].adult} travelers
            </div>
          </div>
        </div>
        <div className="dropdown-container">
          {isOpenRoom && (
            <div className="dropdown-content">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                Rooms:{" "}
                <div>
                  <button
                    type="button"
                    className="btn-rooms"
                    onClick={() =>
                        setHotelDetails({
                        ...hotelDetails,
                        ...{reservation:{
                            ...hotelDetails.reservation,
                            occupancy:[
                                {
                                    ...hotelDetails.reservation.occupancy[0],
                                    room_no: hotelDetails.reservation.occupancy[0].room_no+1,
                                }
                            ]  
                        }}
                      })
                    }
                  >
                    +
                  </button>
                  {hotelDetails.reservation.occupancy[0].room_no}
                  <button
                    type="button"
                    className="btn-rooms"
                    onClick={() =>
                        setHotelDetails({
                            ...hotelDetails,
                            ...{reservation:{
                                ...hotelDetails.reservation,
                                occupancy:[
                                    {
                                        ...hotelDetails.reservation.occupancy[0],
                                        room_no: hotelDetails.reservation.occupancy[0].room_no - 1,
                                    }
                                ]  
                            }}
                          })
                    }
                    disabled={hotelDetails.reservation.occupancy[0].room_no === 1}
                  >
                    -
                  </button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                Travellers:{" "}
                <div>
                  <button
                    type="button"
                    className="btn-rooms"
                    onClick={() =>
                        setHotelDetails({
                            ...hotelDetails,
                            ...{reservation:{
                                ...hotelDetails.reservation,
                                occupancy:[
                                    {
                                        ...hotelDetails.reservation.occupancy[0],
                                        adult: hotelDetails.reservation.occupancy[0].adult + 1,
                                    }
                                ]  
                            }}
                          })
                    }
                  >
                    +
                  </button>
                  {hotelDetails.reservation.occupancy[0].adult}
                  <button
                    type="button"
                    className="btn-rooms"
                    onClick={() =>
                        setHotelDetails({
                            ...hotelDetails,
                            ...{reservation:{
                                ...hotelDetails.reservation,
                                occupancy:[
                                    {
                                        ...hotelDetails.reservation.occupancy[0],
                                        adult: hotelDetails.reservation.occupancy[0].adult - 1,
                                    }
                                ]  
                            }}
                          })
                    }
                    disabled={hotelDetails.reservation.occupancy[0].adult === 0}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <a href="#accomodation"><Button label="Choose your room"/></a>
      <div className="msg">You won't be charged yet</div>
    </div>
  );
};
export default SelectRoomComponent;
