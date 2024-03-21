import React,{useState, useEffect} from "react";
import SearchComponent from "../../components/Search/SearchComponent";
import ModalComponent from "../../UI/components/Modal/Modal";
import HotelCardComponent from "../../components/HotelCard/HotelCard";
import DateRangePickerComponent from "../../UI/components/DateRangePicker/DateRangePicker";
import * as api from "../../api/hotelApis.js";
import FilterComponent from "../../components/Filters/Filter";
import { AmenitiesList, popularFilters, guestRating, paymentMethods, propertyType, mealPlans, Accessibilities} from "../../constants/constants";
import Pagination from '@mui/material/Pagination';
// import { Skeleton } from "@mui/material";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './index.css';
const HomePageComponent = () => {
    const [hotels,setHotels] = useState([]);
    const [page, setPage] = useState({currPage:1, totalResults: null});
    const [requestParams, setRequestParams] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState(0);
    const handleChange = async(event, value) => {
        
        if(hotels.length < value*10){
            setIsLoading(true);
            const getHotels = await api.getNextHotelSearchResults({...requestParams, maxResult: 10});
            setRequestParams({
                sessionId: getHotels.status.sessionId,
                nextToken: getHotels.status.nextToken,
            });
            // console.log([...hotels, ...getHotels.itineraries])
            if(value >2)
            setHotels([...hotels,...getHotels.itineraries]);

        }
        
        setPage({...page, currPage:value});
        setIsLoading(false);
    };
    const callApis = async()=>{
        const getHotels = await api.getAllHotels();
        setRequestParams({
            sessionId: getHotels.status.sessionId,
            nextToken: getHotels.status.nextToken,
        });
        setPage({...page, totalResults:Math.ceil((getHotels.status.totalResults-20)/10)+1});
        // console.log(getHotels, "getHotels");
        // const data = await Promise.all(getHotels.itineraries.map(async(hotel)=>{
        //     return await api.getHotelDetails({
        //         hotelId: hotel.hotelId,
        //         productId: hotel.productId,
        //         sessionId: getHotels.status.sessionId,
        //         tokenId: hotel.tokenId,
        //     })
        // }));
        setHotels(getHotels.itineraries);
        setIsLoading(false);
    }
    useEffect(()=>{
        setIsLoading(true);
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
    return (
        <div className="home-page">
           <SearchComponent handleDateShowModal={handleDateShowModal} selectedDates={dateRange} setActiveFilter={setActiveFilter}/>
           <div className="home-page-body">
                <div className="home-page-filters">
                    <FilterComponent popularFilters={popularFilters} guestRating={guestRating} paymentMethods={paymentMethods} propertyType={propertyType} mealPlans={mealPlans} AmenitiesList={AmenitiesList} Accessibilities={Accessibilities} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
                </div>
                 <div className="hotel-cards" onClick={()=>setActiveFilter(0)}>
                {isLoading && <Skeleton count={10} height={200} width={"100%"}/>}
                    {!isLoading && hotels?.map((hotel,i)=>{
                        if(i<page.currPage*10 && i>=(page.currPage - 1)*10)
                        return <HotelCardComponent price={{night:hotel?.total}} ratings={hotel?.hotelRating} reviews={(hotel.tripAdvisorReview)?hotel.tripAdvisorReview:0} amenitites={AmenitiesList.slice(1,3)} desc={desc} name={hotel.hotelName} imgs={[{url:hotel?.thumbNailUrl}]}/>;
                        return null;
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