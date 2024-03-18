import React,{useState, useEffect} from "react";
import SearchComponent from "../../components/Search/SearchComponent";
import ModalComponent from "../../UI/components/Modal/Modal";
import HotelCardComponent from "../../components/HotelCard/HotelCard";
import DateRangePickerComponent from "../../UI/components/DateRangePicker/DateRangePicker";
import * as api from "../../api/hotelApis.js";
import FilterComponent from "../../components/Filters/Filter";
import { AmenitiesList, popularFilters, guestRating, paymentMethods, propertyType, mealPlans, Accessibilities} from "../../constants/constants";
import './index.css';
const HomePageComponent = () => {
    const [hotels,setHotels] = useState([]);
    const callApis = async()=>{
        const getHotels = await api.getAllHotels();
        console.log(getHotels.status.sessionId);
        const data = await Promise.all(getHotels.itineraries.map(async(hotel)=>{
            return await api.getHotelDetails({
                hotelId: hotel.hotelId,
                productId: hotel.productId,
                sessionId: getHotels.status.sessionId,
                tokenId: hotel.tokenId,
            })
        }));
        setHotels(data);
    }
    useEffect(()=>{
        callApis();
        
    },[]);
    const [showDateModal , setShowDateModal ] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      });
    const handleDateShowModal = () => {
        setShowDateModal(true);
    }
    const selectDateRange = (dates) => {
        console.log(dates);
        setDateRange(dates);
    }
    const price= {
        night: 183,
        total: 3110
    }
    const reviews ={
        number: 67
    }
    const desc = "Baba Beach Club Natai is a luxury Residential, Beachfront Hotel & Beach Club managed & developed by the team behind the internationally acclaimed estate 'Sri Panwa'."
    console.log(hotels);
    return (
        <div className="home-page">
           <SearchComponent handleDateShowModal={handleDateShowModal} selectedDates={dateRange}/>
           <div className="home-page-body">
                <div className="home-page-filters">
                    <FilterComponent popularFilters={popularFilters} guestRating={guestRating} paymentMethods={paymentMethods} propertyType={propertyType} mealPlans={mealPlans} AmenitiesList={AmenitiesList} Accessibilities={Accessibilities}/>
                </div>
                <div className="hotel-cards">
                    {hotels?.map(hotel=><HotelCardComponent price={price} ratings={hotel.hotelRating} reviews={hotel?.hotel_review?.reviews} amenitites={AmenitiesList.slice(1,3)} desc={desc} name={hotel.name} imgs={hotel.hotelImages}/>)}
                    {/* <HotelCardComponent price={price} ratings={9.2} reviews={reviews} amenitites={AmenitiesList.slice(1,3)} desc={desc} name={'Baba Beach Club Natai'}/> */}
                </div>
           </div>
          
           
           {showDateModal && <ModalComponent show={showDateModal} onHide={()=>setShowDateModal(false)} title={'Select Date Range'}>
                    <DateRangePickerComponent selectDateRange={selectDateRange} />
                    {/* <Button type="button">Select</Button> */}
                </ModalComponent>}
        </div>
    )
}
export default HomePageComponent;