import React, { useState, useContext } from "react";
import Image from "../../UI/components/Image/Image";
import Calendar from "../../assets/Calendar.svg";
import Traveller from "../../assets/Person.svg";
import moment from "moment";
import MapPin from "../../assets/map-pin.svg";
import Button from "../../UI/components/Button/Button";
import { HotelContext } from "../../Context/hotelDetailsContext";

// (Optional) Import component styles. If you are using Less, import the `index.less` file.
import "./SearchComponent.css";
const SearchComponent = ({
  handleDateShowModal,
  selectedDates,
  setActiveFilter,
  setHotelSearch,
  hotelSearch,
}) => {
  // console.log(selectedDates);
  const { hotelDetails, setHotelDetails } = useContext(HotelContext);
  const [isOpenRoom, setIsOpenRoom] = useState(false);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [selectLocation, setSelectLocation] = useState({
    location: "Phuket Province",
  });
  const [selectRooms, setSelectRooms] = useState({
    rooms: 1,
    travellers: [2],
  });

  const handleSelectLocation = (location) => {
    setSelectLocation(location);
    setIsOpenLocation(false);
  };
  const toggleRoomDropdown = () => {
    setIsOpenRoom(!isOpenRoom);
  };
  const toggleLocationDropdown = () => {
    setIsOpenLocation(!isOpenLocation);
  };
  const handleSearch = () => {
    console.log({ selectRooms });
    // setHotelDetails({
    //     ...hotelDetails,
    //     reservation: {
    //         ...hotelSearch,
    //         occupancy:[
    //         {
    //             "room_no": selectRooms.rooms,
    //             "adult": selectRooms.travellers,
    //             "child": 0,
    //             "child_age": [
    //               0
    //             ]
    //           }
    //     ],
    //     checkin: moment(selectedDates.startDate).format('YYYY-MM-DD'),
    //     checkout: moment(selectedDates.endDate).format('YYYY-MM-DD'),
    //     }
    // });
    // const iterations = selectRooms.travellers / selectRooms.rooms;
    // const remaining = selectRooms.travellers % selectRooms;
    // const occupancy = [];
    // for(var i=0; i<selectRooms.rooms;i++){

    // }
    const occupancy = selectRooms.travellers.map((item, index) => {
        return ( {
            room_no: index + 1,
            adult: item,
            child: 0,
            child_age: [0],
          })
    });
    // console.log({occupancy});
    setHotelSearch({
      ...hotelSearch,
      occupancy,
      checkin: moment(selectedDates.startDate).format("YYYY-MM-DD"),
      checkout: moment(selectedDates.endDate).format("YYYY-MM-DD"),
    });
  };
  return (
    <div className="search" onClick={() => setActiveFilter(0)}>
      <div className="search-selector">
        <div className="select-date" onClick={toggleLocationDropdown}>
          <div style={{ marginTop: "10px" }}>
            <Image src={MapPin} height="30px" width="30px" />
          </div>
          <div style={{ marginLeft: "5px" }}>
            <div className="select-date-title">Going to</div>
            <div>{selectLocation.location}</div>
          </div>
        </div>
        <div className="dropdown-container">
          {isOpenLocation && (
            <div className="dropdown-content">
              <ul>
                <li
                  onClick={() =>
                    handleSelectLocation({ location: "Phuket Province" })
                  }
                >
                  Phuket Province
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="search-selector">
        <div className="select-date" onClick={() => handleDateShowModal()}>
          <div style={{ marginTop: "-5px" }}>
            <Image src={Calendar} height="60px" width="60px" />
          </div>
          <div style={{ marginLeft: "-10px" }}>
            <div className="select-date-title">Dates</div>
            <div>
              {moment(selectedDates.startDate).format("MMM DD")} -{" "}
              {moment(selectedDates.endDate).format("MMM DD")}
            </div>
          </div>
        </div>
      </div>
      <div className="search-selector">
        <div className="select-date" onClick={toggleRoomDropdown}>
          <div style={{ marginTop: "-15px", marginLeft: "-10px" }}>
            <Image src={Traveller} height="80px" width="80px" />
          </div>
          <div style={{ marginLeft: "-15px" }}>
            <div className="select-date-title">Travellers</div>
            <div>
              {selectRooms.rooms} room,{selectRooms.travellers.reduce((partialSum, a) => partialSum + a, 0)} travelers
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
                      setSelectRooms({
                        ...selectRooms,
                        rooms: selectRooms.rooms + 1,
                        travellers: [...selectRooms.travellers, 0]
                      })
                    }
                  >
                    +
                  </button>
                  {selectRooms.rooms}
                  <button
                    type="button"
                    className="btn-rooms"
                    onClick={() =>
                      setSelectRooms({
                        ...selectRooms,
                        rooms: selectRooms.rooms - 1,
                      })
                    }
                    disabled={selectRooms.rooms === 1}
                  >
                    -
                  </button>
                </div>
              </div>
              {Array(selectRooms.rooms).fill(1).map((item, index) => (<div className="mt-3">
              <div><b>Room {index+1}</b></div>
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
                        const guests = [...selectRooms.travellers];
                        guests[index]+=1;
                        setSelectRooms({
                        ...selectRooms,
                        travellers: [...guests],
                      })
                    }
                    }
                  >
                    +
                  </button>
                  {selectRooms.travellers[index]}
                  <button
                    type="button"
                    className="btn-rooms"
                    onClick={() =>{
                        const guests = [...selectRooms.travellers];
                        guests[index]-=1;
                        setSelectRooms({
                        ...selectRooms,
                        travellers: [...guests],
                      })
                    }
                    }
                    disabled={selectRooms.travellers[index] === 0}
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
      <button type="button" className="search-button" onClick={handleSearch}>
        {" "}
        Search{" "}
      </button>
      <hr className="horizontal-line" />
    </div>
  );
};
export default SearchComponent;
