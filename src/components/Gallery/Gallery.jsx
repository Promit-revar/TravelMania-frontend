import './Gallery.css'
import Image from '../Image/Image';
const GalleryComponent = () =>{
    return (
        <div className="gallery">
            <Image src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp' height="100%" width="50%" />
            <div className='sub-imgs'>   
                <Image src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp' height="48%" width="49%" />
                <Image src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp' height="48%" width="49%" />
                <Image src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp' height="48%" width="49%" />
                <Image src='https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp' height="48%" width="49%" />
            </div>
        </div>
    )
}
export default GalleryComponent;