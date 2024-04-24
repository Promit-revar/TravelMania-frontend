import React,{useState, useEffect, useContext} from "react";
import SearchComponent from "../../components/Search/SearchComponent";
import ModalComponent from "../../UI/components/Modal/Modal";
import HotelCardComponent from "../../components/HotelCard/HotelCard";
import DateRangePickerComponent from "../../UI/components/DateRangePicker/DateRangePicker";
import * as api from "../../api/hotelApis.js";
import FilterComponent from "../../components/Filters/Filter";
import moment from "moment";
import { HotelContext } from "../../Context/hotelDetailsContext.jsx";
import { LoaderContext } from "../../Context/loaderContext.jsx";
import { AmenitiesList, popularFilters, guestRating, paymentMethods, propertyType, mealPlans, Accessibilities, getHotels} from "../../constants/constants";
import Pagination from '@mui/material/Pagination';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ErrorHandlingComponent from "../../UI/components/Errors/Error.jsx";
import './index.css';
const HomePageComponent = () => {
    const {hotelDetails, setHotelDetails} = useContext(HotelContext);
    const {isLoading, setIsLoading} = useContext(LoaderContext);
    const [hotels,setHotels] = useState([]);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    const [showDateModal , setShowDateModal ] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: tomorrow,
        key: 'selection',
      });
    const [hotelSearch,setHotelSearch] = useState({
        checkin: moment(dateRange.startDate).format('YYYY-MM-DD'),
        checkout: moment(dateRange.endDate).format('YYYY-MM-DD'),
        occupancy: [
            {
              "room_no": 1,
              "adult": 2,
              "child": 0,
              "child_age": [
                0
              ]
            }
          ]
    })
    // console.log(hotels);
    console.log(hotelDetails);
    const [page, setPage] = useState({currPage:1, totalResults: null});
    const [filterApplied, setFilterApplied] = useState(false);
    const [activeFilter, setActiveFilter] = useState(0);
    const [isError,setIsError] = useState({value:false,error:""});
    const handleChange = async(event, value) => {
        
        if(!filterApplied && hotels.length < value*10){
            setIsLoading(true);
            const getHotelsResponse = await api.getNextHotelSearchResults({...hotelDetails.params, maxResult: 10});
            setHotelDetails({...hotelDetails, params:{
                sessionId: getHotelsResponse.status.sessionId,
                nextToken: getHotelsResponse.status.nextToken,
            }});
            // console.log([...hotels, ...getHotels.itineraries])
            if(value >2)
            setHotels([...hotels,...getHotelsResponse.itineraries]);

        }
        
        setPage({...page, currPage:value});
        setIsLoading(false);
    };
    const hotelSearchApi = async()=>{
        setFilterApplied(false);
        const getHotelsResponse = await api.getAllHotels({...getHotels,...hotelSearch});
        if(!getHotelsResponse.error)
        {
            setIsError({value:false,error:""});
            setHotelDetails({...hotelDetails, params:{
                sessionId: getHotelsResponse.data.status.sessionId,
                nextToken: getHotelsResponse.data.status.nextToken,
            }});
            
            setHotels([...getHotelsResponse.data.itineraries]);
            setPage({...page, totalResults:Math.ceil((getHotelsResponse.data.status.totalResults-20)/10)+1});
        }
        else{
            setIsError({value: true, error: getHotelsResponse.error});
        }
        
        setIsLoading(false);
    }
    const filterHotels = async(filters) => {
        console.log(hotelDetails);
        const filteredResponse = await api.getHotelByFilters({...filters,...{sessionId: hotelDetails?.params?.sessionId,maxResult: Number.MAX_SAFE_INTEGER}});
        if(!filteredResponse.error ) {
            setIsError({value:false,error:""})
            setHotels(filteredResponse.data.itineraries);
            const totalResults = Math.ceil(filteredResponse.data.itineraries.length/10);
            setPage({...page, totalResults:totalResults});
        }
        else {
            setIsError({value: true, error: filteredResponse.error});
        }
        setFilterApplied(true);
        setIsLoading(false);
    }
    useEffect(()=>{
        setIsLoading(true);
        hotelSearchApi();
    },[hotelSearch]);
    
    const handleDateShowModal = () => {
        setShowDateModal(true);
    }
    const selectDateRange = (dates) => {
        setDateRange(dates);
        setHotelDetails({...hotelDetails,...{dates:dates}});
    }
    const desc = "Baba Beach Club Natai is a luxury Residential, Beachfront Hotel & Beach Club managed & developed by the team behind the internationally acclaimed estate 'Sri Panwa'."
    return (
        <div className="home-page">
           <SearchComponent handleDateShowModal={handleDateShowModal} selectedDates={dateRange} setActiveFilter={setActiveFilter} setHotelSearch={setHotelSearch} hotelSearch={hotelSearch}/>
           <div className="home-page-body">
                <div className="home-page-filters">
                    <FilterComponent popularFilters={popularFilters} guestRating={guestRating} paymentMethods={paymentMethods} propertyType={propertyType} mealPlans={mealPlans} AmenitiesList={AmenitiesList} Accessibilities={Accessibilities} activeFilter={activeFilter} setActiveFilter={setActiveFilter} setFilters={filterHotels}/>
                </div>
                {isError.value && <ErrorHandlingComponent error={isError.error}/>}
                 {!isError.value && <div className="hotel-cards" onClick={()=>setActiveFilter(0)}>
                {isLoading && <Skeleton count={10} height={200} width={"100%"}/>}
                    {!isLoading && hotels?.map((hotel,i)=>{
                        if(hotels.length <= 10)
                        return <HotelCardComponent price={{night:hotel?.total}} ratings={hotel?.hotelRating} reviews={(hotel.tripAdvisorReview)?hotel.tripAdvisorReview:0} amenitites={AmenitiesList.slice(1,3)} desc={desc} name={hotel.hotelName} imgs={[{url:hotel?.thumbNailUrl}]} requestParams={{productId: hotel.productId, tokenId: hotel.tokenId, hotelId:hotel.hotelId}}/>;
                        else if(i<page.currPage*10 && i>=(page.currPage - 1)*10)
                        return <HotelCardComponent price={{night:hotel?.total}} ratings={hotel?.hotelRating} reviews={(hotel.tripAdvisorReview)?hotel.tripAdvisorReview:0} amenitites={AmenitiesList.slice(1,3)} desc={desc} name={hotel.hotelName} imgs={[{url:hotel?.thumbNailUrl}]} requestParams={{productId: hotel.productId, tokenId: hotel.tokenId, hotelId:hotel.hotelId}}/>;
                        else return null;
                    })}
                    
                    {/* <HotelCardComponent price={price} ratings={9.2} reviews={reviews} amenitites={AmenitiesList.slice(1,3)} desc={desc} name={'Baba Beach Club Natai'}/> */}
                    {!isLoading && <div style={{marginTop: "20px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Pagination count={page.totalResults} page={page.currPage} onChange={handleChange} sx={{
                        ".Mui-selected":{
                            backgroundColor: "#399a7a !important",
                            color: '#fff',
                        }
                    }} />
                    </div>}
                    
                </div>}
                
           </div>
          
           
           {showDateModal && <ModalComponent show={showDateModal} onHide={()=>setShowDateModal(false)} title={'Select Date Range'}>
                    <DateRangePickerComponent selectDateRange={selectDateRange} />
                    {/* <Button type="button">Select</Button> */}
                </ModalComponent>}
        </div>
    )
}
export default HomePageComponent;