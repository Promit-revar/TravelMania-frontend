import './HotelDescription.css'
import { Star } from 'lucide-react';
import SelectRoomComponent from '../SelectRoom/SelectRoom';
const HotelDescriptionComponent = ({title, description, location, ratings}) => {
    const stars = [];
    for(var i=0 ;i<ratings;i++){
        stars.push(i);
    }
    console.log(stars);
    return (
        <div className='hotel-description-section' id='Overview'>
            <div className='desc'>
                <div className="title">
                    <div className="title-text">{title}</div>
                    <div className='ratings'>{stars.map((item)=><Star color='#FFD700' size={'14px'} fill='#FFD700'/>)}</div>
                </div>
                <div>{description}</div>
            </div>
            <div className='gmap'>
                <div className='title'>
                    Choose Your Room
                </div>
                <SelectRoomComponent />
            </div>
        </div>
    )
};
export default HotelDescriptionComponent;