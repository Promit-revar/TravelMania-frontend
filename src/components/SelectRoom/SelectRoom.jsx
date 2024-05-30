import "./SelectRoom.css";
import React, { useState, useContext } from "react";
import DatePickerComponent from "../../UI/components/DatePicker/DatePicker";
import Button from "../../UI/components/Button/Button";
import DropdownComponent from "../../UI/components/Dropdown/Dropdown";
import Image from "../../UI/components/Image/Image";
import Calendar from '../../assets/Calendar.svg';
import Traveller from "../../assets/Person.svg";
import moment from "moment";
const SelectRoomComponent = ({checkin , checkout, setBookingData, bookingData, handleDateShowModal}) => {
  const [isOpenRoom, setIsOpenRoom] = useState(false);
  const toggleRoomDropdown = () => {
    setIsOpenRoom(!isOpenRoom);
  };
  // const tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate()+1);
  // const dayAftertomorrow = new Date();
  // dayAftertomorrow.setDate(dayAftertomorrow.getDate()+2);
  console.log({bookingData,})
  return (
    <div className="schedule-block">
      <div className="select-block">
      <div className="select-date" onClick={()=>handleDateShowModal()}>
                <div style={{ marginTop: '-5px'}}><Image src={Calendar} height='60px' width='60px'/></div>
                <div style={{ marginLeft: '-10px'}}>
                    <div className="select-date-title">Dates</div>
                    <div>{moment(checkin).format('MMM DD')} - {moment(checkout).format('MMM DD')}</div>
                </div>
            </div>
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
              {bookingData.length} room, {bookingData.reduce((partialSum, a) => partialSum + a.adult, 0)} travelers
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
                    onClick={() =>{
                      //   setHotelDetails({
                      //   ...hotelDetails,
                      //   ...{reservation:{
                      //       ...hotelDetails.reservation,
                      //       occupancy:[
                      //           {
                      //               ...hotelDetails.reservation.occupancy[0],
                      //               room_no: hotelDetails.reservation.occupancy[0].room_no+1,
                      //           }
                      //       ]  
                      //   }}
                      // })
                      const newRoom = {
                        "room_no": bookingData.length + 1,
                        "adult": 0,
                        "child": 0,
                        "child_age": [
                            0
                        ]
                    }
                      setBookingData([
                        ...bookingData,
                        newRoom,
                      ])
                    }}
                  >
                    +
                  </button>
                  {bookingData.length}
                  <button
                    type="button"
                    className="btn-rooms"
                    onClick={() =>{
                        // setHotelDetails({
                        //     ...hotelDetails,
                        //     ...{reservation:{
                        //         ...hotelDetails.reservation,
                        //         occupancy:[
                        //             {
                        //                 ...hotelDetails.reservation.occupancy[0],
                        //                 room_no: hotelDetails.reservation.occupancy[0].room_no - 1,
                        //             }
                        //         ]  
                        //     }}
                        //   })
                        const tempBookingData = [...bookingData];
                        const e = tempBookingData.pop();
                        setBookingData([
                          ...tempBookingData
                        ]);
                    }}
                    disabled={bookingData.length === 1}
                  >
                    -
                  </button>
                </div>
              </div>
              {bookingData.map((item, index) => (<div className="mt-3">
              <div><b>Room {item.room_no}</b></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                Travellers:{" "}
                <div>
                  <button
                    type="button"
                    className="btn-rooms"
                    onClick={() =>{
                        // setHotelDetails({
                        //     ...hotelDetails,
                        //     ...{reservation:{
                        //         ...hotelDetails.reservation,
                        //         occupancy:[
                        //             {
                        //                 ...hotelDetails.reservation.occupancy[0],
                        //                 adult: hotelDetails.reservation.occupancy[0].adult + 1,
                        //             }
                        //         ]  
                        //     }}
                        //   })
                        const updatedBookingData = [...bookingData];
                        updatedBookingData[index].adult +=1;
                        setBookingData([
                          ...updatedBookingData,
                        ])
                    }}
                  >
                    +
                  </button>
                  {item.adult}
                  <button
                    type="button"
                    className="btn-rooms"
                    onClick={() =>{
                        // setHotelDetails({
                        //     ...hotelDetails,
                        //     ...{reservation:{
                        //         ...hotelDetails.reservation,
                        //         occupancy:[
                        //             {
                        //                 ...hotelDetails.reservation.occupancy[0],
                        //                 adult: hotelDetails.reservation.occupancy[0].adult - 1,
                        //             }
                        //         ]  
                        //     }}
                        //   })
                        const updatedBookingData = [...bookingData];
                        updatedBookingData[index].adult -=1;
                        setBookingData([
                          ...updatedBookingData,
                        ])
                    }
                    }
                    disabled={item.adult === 1}
                  >
                    -
                  </button>
                </div>
              </div>
              </div>))}
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
