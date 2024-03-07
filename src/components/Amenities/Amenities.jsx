import './Amenities.css';
import GymIcon from '../../assets/Gym.svg';
const AmenitiesComponent = ({amenities}) => {
    return (
        <div className='amenities' id='Amenities'>
            <div className='title'>
                Amenities
            </div>
            <ul className='amenities-list'>
                {
                    amenities.map(item=>(
                        <li className='amenities-list-item'>
                            <img src={item.icon} height={100} width={100}/>
                            <div className='amenities-item-name'>{item.name}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};
export default AmenitiesComponent;