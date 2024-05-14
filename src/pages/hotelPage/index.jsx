import React,{useState, useEffect, useContext} from "react";
import NavBarComponent from "../../components/Navbar/Navbar";
import GalleryComponent from "../../components/Gallery/Gallery.jsx"
import NavList from "../../components/NavigationList/NavList";
import * as api from "../../api/hotelApis.js";
import { HotelDetailsNavigationList, AmenitiesList } from "../../constants/constants";
import RoomInfoComponent from "../../components/RoomInfo/RoomInfoComponent.jsx";
import HotelDescriptionComponent from "../../components/HotelDescription/HotelDescription";
import AmenitiesComponent from "../../components/Amenities/Amenities";
import AccomodationComponent from "../../components/Accomodation/Accomodation";
import ActivitiesComponent from "../../components/Activites/Activites";
import { ChevronLeft } from 'lucide-react';
import { Carousel } from "react-bootstrap";
import { HotelContext } from "../../Context/hotelDetailsContext.jsx";
import LocationComponent from "../../components/Location/Location";
import PoilciesComponent from "../../components/Policies/Policies";
import CarouselComponent from "../../components/Carousel/Carousel";
import ReviewComponent from "../../components/Reviews/Reviews";
import OtherHotelCardsComponent from "../../components/OtherHotels/OtherHotelsCards";
import { Policies, Reviews } from "../../constants/constants";
import ModalComponent from "../../UI/components/Modal/Modal";
import Image from "../../UI/components/Image/Image";
import ErrorHandlingComponent from "../../UI/components/Errors/Error.jsx";
import HotelOverview1 from '../../assets/Hotel-Overview-1.jpg'
import HotelOverview2 from '../../assets/Hotel-Overview-2.jpg'
import HotelOverview3 from '../../assets/Hotel-Overview-4.jpg'
import HotelOverview4 from '../../assets/Hotel-Overview-12.jpg'
import HotelOverview5 from '../../assets/Hotel-Overview-13.jpg'
import { ChevronLeftCircle, ChevronRightCircle, Heart } from 'lucide-react';
import { LoaderContext } from "../../Context/loaderContext.jsx";
import { HotelBookingContext } from "../../Context/hotelBookingContext.jsx";
import { useSearchParams, useNavigate } from "react-router-dom";
import ViewAllReviewsComponent from "../../components/ViewAllReviews/ViewAllReviews";
import Skeleton from "react-loading-skeleton";
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
     
    //state variables
    const [openRoomModal, setOpenRoomModal] = useState(false);
    const [openModal,setOpenModal] = useState(false);
    const [hotelData, setHotelData] = useState({});
    const [ roomTypes, setRoomTypes ] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState({});
    const [isError, setIsError] = useState({value: false, error:""});
    const [openReviewModal,setOpenReviewModal] = useState(false);
    const desc = 'loremIncididunt eiusmod ex ullamco esse do duis culpa ipsum dolor ea cupidatat. Sunt nisi eu voluptate aliqua nisi duis nulla. Ea adipisicing laborum ullamco quis aute laborum nulla. Cillum enim et ut ex minim. Non irure magna in amet non minim ullamco. Do culpa minim laborum sunt magna eu reprehenderit anim. Excepteur labore consequat consequat ea fugiat excepteur id aliqua proident. Laboris eu ea nisi non occaecat eiusmod nulla excepteur amet incididunt cillum. Esse ex cupidatat laborum amet duis reprehenderit aliqua est in anim. Veniam ut ipsum adipisicing incididunt aliquip amet non. Ut exercitation culpa cupidatat excepteur consequat aliquip do amet. Ullamco aliquip enim in non exercitation reprehenderit veniam et quis. Amet cillum nisi esse tempor elit consequat ut consectetur proident dolor excepteur et.';
    const location ={ Latitude: 7.9246,Longitude: 98.2792 }
    const [searchParams] = useSearchParams();
    const handleViewGallery = () => {
        setOpenModal(true);
    }
    const handleViewAllReviews = () =>{
        setOpenReviewModal(true);
    }
    const hotelId = searchParams.get('hotelId');
    const tokenId = searchParams.get('tokenId');
    const productId = searchParams.get('productId');
    const sessionId = searchParams.get('sessionId');
    console.log({hotelDetails});
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
            setIsError({value: true, error: data.error});
        }
        console.log(data);
       
        
    }
    const getRoomDetails = async() => {
        const response = await api.getRoomRates({ sessionId, productId, hotelId, tokenId});
        setRoomTypes(response.data.roomRates.perBookingRates);
        setIsLoading(false);
    }
    useEffect(()=>{
        setIsLoading(true);
        getHotelDetails();
        getRoomDetails();
    },[]);
    const bookHotel = (roomDetails) => {
        console.log({roomDetails});
        setHotelBookingDetails({
            ...hotelBookingDetails,
            ...{
                reservation: {
                    hotelName: hotelData.name,
                    ...selectedRoom,
                    ...hotelDetails.reservation,
                    ...roomDetails,
                }
            }
    });
        navigate(`/order-summary?sessionId=${sessionId}&productId=${productId}&tokenId=${tokenId}&rateBasisId=${roomDetails.rateBasisId}&adult=${hotelDetails.reservation.occupancy[0].adult}&checkin=${hotelDetails.reservation.checkin}&checkout=${hotelDetails.reservation.checkout}&hotelName=${hotelData.name}`);
    }
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
           {(!isLoading)?<HotelDescriptionComponent title={hotelData.name} description={hotelData.description?.content} location={{Latitude:hotelData.latitude, Longitude: hotelData.longitude}} ratings={Number(hotelData.hotelRating)}/>:<Skeleton count={5}/>}
            <AmenitiesComponent amenities={AmenitiesList} />
            <hr />
            <div className="title" id="accommodation">
                    Types of accommodation
                </div>
            <div className="accomodation-section">
                
            {!isLoading && roomTypes.map((item,i)=><AccomodationComponent  amenities={item.facilities} capacity={item.maxOccupancyPerRoom} name={item.roomType}  price={item.netPrice} openAccomodationModal={setOpenRoomModal} setSelectedRoom={setSelectedRoom} requestBody={{rateBasisId: item.rateBasisId, sessionId, tokenId, productId }}/>)}
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
        </div>
    );
}

export default HotelPageComponent;