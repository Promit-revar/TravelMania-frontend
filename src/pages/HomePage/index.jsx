import React,{useState, useEffect, useContext} from "react";
import SearchComponent from "../../components/Search/SearchComponent";
import ModalComponent from "../../UI/components/Modal/Modal";
import HotelCardComponent from "../../components/HotelCard/HotelCard";
import DateRangePickerComponent from "../../UI/components/DateRangePicker/DateRangePicker";
import * as api from "../../api/hotelApis.js";
import FilterComponent from "../../components/Filters/Filter";
import moment from "moment";
import { HotelContext } from "../../Context/hotelDetailsContext.jsx";
import { AmenitiesList, popularFilters, guestRating, paymentMethods, propertyType, mealPlans, Accessibilities, getHotels} from "../../constants/constants";
import Pagination from '@mui/material/Pagination';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ErrorHandlingComponent from "../../UI/components/Errors/Error.jsx";
import './index.css';
const HomePageComponent = () => {
    const {hotelDetails, setHotelDetails} = useContext(HotelContext);
    const [isLoading, setIsLoading] = useState(false);
    const [hotels,setHotels] = useState([]);
    const tomorrow = moment().add(1,'days');
    const dayAftertomorrow = moment().add(2,'days');
    const [showDateModal , setShowDateModal ] = useState(false);
    const searchValues = JSON.parse(localStorage.getItem('hotelSearch'));
    const [dateRange, setDateRange] = useState({
        startDate: searchValues && moment(searchValues.checkin).valueOf()>= moment(tomorrow).valueOf() ? moment(searchValues.checkin): tomorrow,
        endDate: searchValues && moment(searchValues.checkout).valueOf()>= moment(dayAftertomorrow).valueOf()? moment(searchValues.checkout):dayAftertomorrow,
        key: 'selection',
      });
    const [hotelSearch,setHotelSearch] = useState({
        checkin: moment(dateRange.startDate).format('YYYY-MM-DD'),
        checkout: moment(dateRange.endDate).format('YYYY-MM-DD'),
        "city_name": searchValues? searchValues.city_name:"Phuket",
        "country_name": searchValues? searchValues.country_name: "Thailand",
        occupancy: searchValues? searchValues.occupancy: [
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
    const [page, setPage] = useState({currPage:1, totalResults: null});
    const [filterApplied, setFilterApplied] = useState(false);
    const [activeFilter, setActiveFilter] = useState(0);
    const [isError,setIsError] = useState({value:false,error:""});
    const handleChange = async(event, value) => {
        
        // if(!filterApplied){
        //     setIsLoading(true);
        //     // const getHotelsResponse = await api.getNextHotelSearchResults({...hotelDetails.params, maxResult: 10});
        //     // setHotelDetails({...hotelDetails, params:{
        //     //     sessionId: getHotelsResponse.data.status.sessionId,
        //     //     nextToken: getHotelsResponse.data.status.nextToken,
        //     // }});
        //     if(value >2)
        //     setHotels([...getHotelsResponse.data.itineraries]);

        // }
        
        setPage({...page, currPage:value});
        setIsLoading(false);
    };
    const hotelSearchApi = async()=>{
        setFilterApplied(false);
        const getHotelsResponse = await api.getAllHotels({...getHotels,...hotelSearch});
        if(!getHotelsResponse.error)
        {
            setIsError({value:false,error:""});
            setHotelDetails({
                ...hotelDetails,
                ...{params:{
                    sessionId: getHotelsResponse.data.status.sessionId,
                    nextToken: getHotelsResponse.data.status.nextToken,}},
                ...{reservation:{
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
                  ]}}
            });
            
            setHotels([...getHotelsResponse.data.itineraries.filter(hotel => hotel?.hotelRating >= 4)]);
            if(getHotelsResponse.data.itineraries.length %10 === 0)
            setPage({...page, totalResults:Math.ceil((getHotelsResponse.data.itineraries.length)/10)});
            else{
                setPage({...page, totalResults:Math.ceil((getHotelsResponse.data.itineraries.length)/10)+1});
            }
        }
        else{
            setIsError({value: true, error: getHotelsResponse.error});
        }
        
        setIsLoading(false);
    }
    const filterHotels = async(filters) => {
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
           <SearchComponent handleDateShowModal={handleDateShowModal} selectedDates={dateRange} setActiveFilter={setActiveFilter} setHotelSearch={setHotelSearch} hotelSearch={hotelSearch} />
           <div className="home-page-body">
                <div className="home-page-filters">
                    <FilterComponent popularFilters={popularFilters} guestRating={guestRating} paymentMethods={paymentMethods} propertyType={propertyType} mealPlans={mealPlans} AmenitiesList={AmenitiesList} Accessibilities={Accessibilities} activeFilter={activeFilter} setActiveFilter={setActiveFilter} setFilters={filterHotels}/>
                </div>
                {isError.value && <ErrorHandlingComponent error={isError.error}/>}
                 {!isError.value && <div className="hotel-cards" onClick={()=>setActiveFilter(0)}>
                {isLoading && <Skeleton count={10} height={200} width={"100%"}/>}
                    {!isLoading && hotels?.map((hotel,i)=>{
                        // if(hotels.length <= 10)
                        if(page.currPage === 1){
                            if(i<10)
                                return <HotelCardComponent price={{night:hotel?.total}} ratings={hotel?.hotelRating} reviews={(hotel.tripAdvisorReview)?hotel.tripAdvisorReview:0} amenitites={AmenitiesList.slice(1,3)} desc={desc} name={hotel.hotelName} imgs={[{url:hotel?.thumbNailUrl}]} requestParams={{productId: hotel.productId, tokenId: hotel.tokenId, hotelId:hotel.hotelId}} hotelSearch={hotelSearch}/>;
                            else{
                                return null;
                            }
                        }
                        else if(i<page.currPage*10 && i>=(page.currPage - 1)*10)
                        return <HotelCardComponent price={{night:hotel?.total}} ratings={hotel?.hotelRating} reviews={(hotel.tripAdvisorReview)?hotel.tripAdvisorReview:0} amenitites={AmenitiesList.slice(1,3)} desc={desc} name={hotel.hotelName} imgs={[{url:hotel?.thumbNailUrl}]} requestParams={{productId: hotel.productId, tokenId: hotel.tokenId, hotelId:hotel.hotelId}} hotelSearch={hotelSearch}/>;
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
                    <DateRangePickerComponent selectDateRange={selectDateRange} checkin={dateRange.startDate} checkout={dateRange.endDate}/>
                    {/* <Button type="button">Select</Button> */}
                </ModalComponent>}
        </div>
    )
}
export default HomePageComponent;