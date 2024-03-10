import './Gallery.css'
import Image from '../../UI/components/Image/Image';
import HotelOverview1 from '../../assets/Hotel-Overview-1.jpg'
import HotelOverview2 from '../../assets/Hotel-Overview-2.jpg'
import HotelOverview3 from '../../assets/Hotel-Overview-4.jpg'
import HotelOverview4 from '../../assets/Hotel-Overview-12.jpg'
import HotelOverview5 from '../../assets/Hotel-Overview-13.jpg'
const GalleryComponent = ({handleViewGallery}) =>{
    const handleClick = () => {
        handleViewGallery();
    }
    return (
        <div className="gallery" onClick={handleClick}>
            <Image src={HotelOverview1} height="100%" width="50%" />
            <div className='sub-imgs'>   
                <Image src={HotelOverview2} height="48%" width="49%" />
                <Image src={HotelOverview3} height="48%" width="49%" />
                <Image src={HotelOverview4} height="48%" width="49%" />
                <Image src={HotelOverview5} height="48%" width="49%" />
            </div>
        </div>
    )
}
export default GalleryComponent;