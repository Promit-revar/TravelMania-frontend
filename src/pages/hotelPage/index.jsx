import React,{useState, useEffect, useContext, useRef} from "react";
import GalleryComponent from "../../components/Gallery/Gallery.jsx"
import NavList from "../../components/NavigationList/NavList";
import * as api from "../../api/hotelApis.js";
import DateRangePickerComponent from "../../UI/components/DateRangePicker/DateRangePicker";
import { HotelDetailsNavigationList, AmenitiesList, getHotels } from "../../constants/constants";
import RoomInfoComponent from "../../components/RoomInfo/RoomInfoComponent.jsx";
import HotelDescriptionComponent from "../../components/HotelDescription/HotelDescription";
import AmenitiesComponent from "../../components/Amenities/Amenities";
import AccomodationComponent from "../../components/Accomodation/Accomodation";
import ActivitiesComponent from "../../components/Activites/Activites";
import { ChevronLeft } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import { Carousel } from "react-bootstrap";
import { HotelContext } from "../../Context/hotelDetailsContext.jsx";
import LocationComponent from "../../components/Location/Location";
import PoilciesComponent from "../../components/Policies/Policies";
import ReviewComponent from "../../components/Reviews/Reviews";
import OtherHotelCardsComponent from "../../components/OtherHotels/OtherHotelsCards";
import { Policies, Reviews } from "../../constants/constants";
import ModalComponent from "../../UI/components/Modal/Modal";
import Image from "../../UI/components/Image/Image";
import ErrorHandlingComponent from "../../UI/components/Errors/Error.jsx";
import { LoaderContext } from "../../Context/loaderContext.jsx";
import { HotelBookingContext } from "../../Context/hotelBookingContext.jsx";
import { useSearchParams, useNavigate } from "react-router-dom";
import ViewAllReviewsComponent from "../../components/ViewAllReviews/ViewAllReviews";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import './index.css'
export const GalleryView = ({images}) =>{
    return (
        <>
        <Carousel 
            slide={false} 
            prevLabel={null} 
            nextLabel={null}
            >
                {images.map((image)=>{
                    return (
                        <Carousel.Item>
                            <Image src={image.url} height={'500px'} width={'100%'} />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
            </>
    )
}
const HotelPageComponent = () => {
    const navigate = useNavigate();
    //context variables
    const { isLoading, setIsLoading } = useContext(LoaderContext);
    const { hotelDetails, setHotelDetails } = useContext(HotelContext);
    const { hotelBookingDetails, setHotelBookingDetails } = useContext(HotelBookingContext);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('id');
    console.log({decoded: jwtDecode(token)});
    let {hotelId, tokenId, productId, checkin, checkout, occupancy}  = jwtDecode(token);
    const [sessionId, setSessionId] = useState(jwtDecode(token).sessionId);

    //state variables
    const [openRoomModal, setOpenRoomModal] = useState(false);
    const [openModal,setOpenModal] = useState(false);
    const [hotelData, setHotelData] = useState({});
    const [ roomTypes, setRoomTypes ] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState({});
    const [showDateModal, setShowDateModal] = useState(false);
    const [isError, setIsError] = useState({value: false, error:""});
    const [openReviewModal,setOpenReviewModal] = useState(false);
    const desc = 'loremIncididunt eiusmod ex ullamco esse do duis culpa ipsum dolor ea cupidatat. Sunt nisi eu voluptate aliqua nisi duis nulla. Ea adipisicing laborum ullamco quis aute laborum nulla. Cillum enim et ut ex minim. Non irure magna in amet non minim ullamco. Do culpa minim laborum sunt magna eu reprehenderit anim. Excepteur labore consequat consequat ea fugiat excepteur id aliqua proident. Laboris eu ea nisi non occaecat eiusmod nulla excepteur amet incididunt cillum. Esse ex cupidatat laborum amet duis reprehenderit aliqua est in anim. Veniam ut ipsum adipisicing incididunt aliquip amet non. Ut exercitation culpa cupidatat excepteur consequat aliquip do amet. Ullamco aliquip enim in non exercitation reprehenderit veniam et quis. Amet cillum nisi esse tempor elit consequat ut consectetur proident dolor excepteur et.';
    const location ={ Latitude: 7.9246,Longitude: 98.2792 }
    const tomorrow = moment().add(1,'days');
    const dayAftertomorrow = moment().add(2,'days');
    console.log(checkin, checkout);
    const isMounted = useRef(false);
    const [dateRange, setDateRange] = useState({
        startDate: moment(checkin).format('YYYY-MM-DD'),
        endDate: moment(checkout).format('YYYY-MM-DD'),
        key: 'selection',
      });
    const [bookingData, setBookingData] = useState([...occupancy]);
    const handleViewGallery = () => {
        setOpenModal(true);
    }
    const handleViewAllReviews = () =>{
        setOpenReviewModal(true);
    }
    console.log({hotelDetails});
    const getNewSession = async() => {
        const getHotelsResponse = await api.getAllHotels({...getHotels,checkin: dateRange.startDate, checkout: dateRange.endDate, occupancy: bookingData});
        // await getHotelDetails();
        // await getRoomDetails();
        setSessionId(getHotelsResponse.data.status.sessionId);
    }
    const useOnUpdate = (callback, deps) => {
        const isFirst = useRef(true);
        useEffect(() => {
          if (!isFirst.current) {
            callback();
          }
        }, deps);
        useEffect(() => {
          isFirst.current = false;
        }, []);
      };
    useOnUpdate(()=>{
        if(isMounted.current){
            getNewSession();
        }
        else
            isMounted.current = true;
    },[bookingData, dateRange]);
    const getHotelDetails = async()=>{
        const data = await api.getHotelDetails({ sessionId, productId, hotelId, tokenId});
        if(!data.error){
            if(hotelData){
                setHotelData(data.data);
            }
            else{
                navigate('/');
            }
        }else{
            if(data.error === 'session expired or invalid sessionId'){
                console.log("wq");
                await getNewSession();
            }
            setIsError({value: true, error: data.error});
        }
        console.log(data);
       
        
    }
    const getRoomDetails = async() => {
        const response = await api.getRoomRates({ sessionId, productId, hotelId, tokenId});
        console.log({response})
        if(response.data){
            
            setRoomTypes(response.data.roomRates.perBookingRates);
            
        }
        else if(response.data.error === 'session expired or invalid sessionId'){
            console.log("wqqqqqq");
            await getNewSession();
        }
        // else{
        //     setIsError({value: true, error: response.data.error})
        // }
        setIsLoading(false);
    }
    useEffect(()=>{
        setIsLoading(true);
        getHotelDetails();
        getRoomDetails();
    },[sessionId]);
    const bookHotel = async(roomDetails) => {
        console.log({roomDetails, bookingData, dateRange});
        const response = await api.getToken({
            sessionId,
            productId,
            rateBasisId: roomDetails.rateBasisId,
            checkin: dateRange.startDate,
            checkout: dateRange.endDate,
            occupancy: [...bookingData],
            tokenId,
        });
        console.log({response})
        navigate(`/order-summary/?id=${response.data.token}`);

    //     setHotelBookingDetails({
    //         ...hotelBookingDetails,
    //         ...{
    //             reservation: {
    //                 hotelName: hotelData.name,
    //                 ...selectedRoom,
    //                 ...hotelDetails.reservation,
    //                 ...roomDetails,
    //             }
    //         }
    // });
        
        // navigate(`/order-summary?sessionId=${sessionId}&productId=${productId}&tokenId=${tokenId}&rateBasisId=${roomDetails.rateBasisId}&adult=${adult}&checkin=${checkin}&checkout=${checkout}&hotelName=${hotelData.name}`);
    }
    const handleDateShowModal = () => {
        setShowDateModal(true);
    }
    const selectDateRange = (dates) => {
        setDateRange({startDate: moment(dates.startDate).format('YYYY-MM-DD'), endDate: moment(dates.endDate).format('YYYY-MM-DD')});
        
    }
    console.log({roomTypes});
    return (
        <div className="hotel-page">
        <div className="back-button" onClick={()=>navigate('/')}> 
            <ChevronLeft size={'15px'}/> 
            <div style={{fontSize:'15px'}}>See all properties</div>
        </div>
        {isError.value && <ErrorHandlingComponent error={isError.error}/>}
        {!isError.value && <>
        <GalleryComponent handleViewGallery={handleViewGallery} images={hotelData.hotelImages}/>
        <div className="navigation-list">
            <NavList items={HotelDetailsNavigationList} />
        </div>
        <hr />
           {(!isLoading)?<HotelDescriptionComponent title={hotelData.name} description={hotelData.description?.content} location={{Latitude:hotelData.latitude, Longitude: hotelData.longitude}} ratings={Number(hotelData.hotelRating)} checkin={moment(dateRange.startDate).format('YYYY-MM-DD')} checkout={moment(dateRange.endDate).format('YYYY-MM-DD')} setBookingData={setBookingData} bookingData={bookingData} handleDateShowModal={handleDateShowModal}/>:<Skeleton count={5}/>}
            <AmenitiesComponent amenities={AmenitiesList} />
            <hr />
            <div className="title" id="accommodation">
                    Types of accommodation
                </div>
            <div className="accomodation-section">
            {isLoading && <div className="d-flex flex-row justify-content-between w-100"><Skeleton height={'250px'} width={'230px'} /><Skeleton height={'250px'} width={'230px'}/><Skeleton height={'250px'} width={'230px'}/></div>}
            {!isLoading && roomTypes.map((item,i)=><AccomodationComponent  amenities={item.facilities} capacity={item.maxOccupancyPerRoom} name={item.roomType}  price={item.netPrice} currency={item.currency} openAccomodationModal={setOpenRoomModal} setSelectedRoom={setSelectedRoom} requestBody={{rateBasisId: item.rateBasisId, sessionId, tokenId, productId }}/>)}
            </div>
            <hr />
            <div className="title" id="accommodation">
                    Popular things to do nearby
                </div>
            <ActivitiesComponent />
            <hr />
            <LocationComponent address={hotelData.address}/>
            <hr />
            <PoilciesComponent Policies={Policies}/>
            <hr />
            <ReviewComponent totalRating={hotelData.hotelRating} handleViewAllReviews={handleViewAllReviews} reviews={hotelData.reviews}/>
            <hr/>
            <OtherHotelCardsComponent />
            </>}
            {openModal && <ModalComponent show={openModal} onHide={()=>setOpenModal(false)} title={'Gallery View'}>
                    <GalleryView images={hotelData.hotelImages}/>
                </ModalComponent>
                }
            {openReviewModal && <ModalComponent show={openReviewModal} onHide={()=>setOpenReviewModal(false)} title={'Reviews'}>
                    <ViewAllReviewsComponent reviews={Reviews} />
                </ModalComponent>}
            {openRoomModal && <ModalComponent show={openRoomModal} onHide={()=>setOpenRoomModal(false)} title={'Room Information'} contentClassName="room-info-modal">
                    <RoomInfoComponent selectedRoom={selectedRoom} bookHotel={bookHotel}/>
                </ModalComponent>}
            {showDateModal && <ModalComponent show={showDateModal} onHide={()=>setShowDateModal(false)} title={'Select Date Range'}>
                    <DateRangePickerComponent selectDateRange={selectDateRange} checkin={dateRange.startDate} checkout={dateRange.endDate}/>
                    {/* <Button type="button">Select</Button> */}
                </ModalComponent>}
            
        </div>
    );
}

export default HotelPageComponent;