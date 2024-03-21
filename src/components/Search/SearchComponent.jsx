import React,{ useState} from "react";
import DropdownComponent from "../../UI/components/Dropdown/Dropdown";
import Image from '../../UI/components/Image/Image';
import Calendar from '../../assets/Calendar.svg';
import Traveller from '../../assets/Person.svg';
import moment from "moment";
import MapPin from '../../assets/map-pin.svg';
import Button from "../../UI/components/Button/Button";

// (Optional) Import component styles. If you are using Less, import the `index.less` file. 
import './SearchComponent.css';
const SearchComponent = ({handleDateShowModal, selectedDates, setActiveFilter}) => {
    const [isOpenRoom, setIsOpenRoom] = useState(false);
    const [isOpenLocation, setIsOpenLocation] = useState(false);
    const [selectLocation, setSelectLocation] = useState({location: 'Phuket Province'});
    const [selectRooms, setSelectRooms] = useState({
        rooms: 1,
        travellers: 2,
    });
    const handleSelectRooms = (selectedRooms) =>{
        setSelectRooms({...selectedRooms});
        setIsOpenRoom(false);
    }
    const handleSelectLocation = (location) => {
        setSelectLocation(location);
        setIsOpenLocation(false);
    }
    const toggleRoomDropdown = () => {
        setIsOpenRoom(!isOpenRoom);
    };
    const toggleLocationDropdown = () => {
        setIsOpenLocation(!isOpenLocation);
    };
    return (
    <div className="search" onClick={()=>setActiveFilter(0)}>
        <div className="search-selector">
        <div className="select-date" onClick={toggleLocationDropdown}>
                <div style={{ marginTop: '10px'}}><Image src={MapPin} height='30px' width='30px'/></div>
                <div style={{ marginLeft: '5px'}}>
                    <div className="select-date-title">Going to</div>
                    <div>{selectLocation.location}</div>
                </div>
            </div>
            <div className="dropdown-container">
      {isOpenLocation && (
        <div className="dropdown-content">
          <ul>
            <li onClick={()=>handleSelectLocation({location: 'Phuket Province'})}>Phuket Province</li><hr/>
            <li onClick={()=>handleSelectLocation({location: 'Bali'})}>Bali</li><hr/>
            <li onClick={()=>handleSelectLocation({location: 'Vietnam'})}>Vietnam</li><hr/>
          </ul>
        </div>
      )}
    </div>
        </div>
        <div className="search-selector">
            <div className="select-date" onClick={()=>handleDateShowModal()}>
                <div style={{ marginTop: '-5px'}}><Image src={Calendar} height='60px' width='60px'/></div>
                <div style={{ marginLeft: '-10px'}}>
                    <div className="select-date-title">Dates</div>
                    <div>{moment(selectedDates.startDate).format('MMM DD')} - {moment(selectedDates.endDate).format('MMM DD')}</div>
                </div>
            </div>
        </div>
        <div className="search-selector">
            <div className="select-date" onClick={toggleRoomDropdown}>
                <div style={{ marginTop: '-15px', marginLeft: '-10px'}}><Image src={Traveller} height='80px' width='80px'/></div>
                <div style={{ marginLeft: '-15px'}}>
                    <div className="select-date-title">Travellers</div>
                    <div>{selectRooms.rooms} room,{selectRooms.travellers} travelers</div>
                </div>
            </div>
            <div className="dropdown-container">
      {isOpenRoom && (
        <div className="dropdown-content">
          <ul>
            <li onClick={()=>handleSelectRooms({rooms:1, travellers:2})}>1 room, 2 travelers</li><hr/>
            <li onClick={()=>handleSelectRooms({rooms:2, travellers:4})}>2 rooms, 4 travelers</li><hr/>
            <li onClick={()=>handleSelectRooms({rooms:3, travellers:6})}>3 rooms, 6 travelers</li><hr/>
          </ul>
        </div>
      )}
    </div>
        </div>
        <button type="button" className="search-button"> Search </button>
        <hr className="horizontal-line"/>
    </div>
    );
}
export default SearchComponent;