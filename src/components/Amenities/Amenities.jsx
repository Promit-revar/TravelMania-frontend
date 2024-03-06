import './Amenities.css';
const AmenitiesComponent = ({amenities}) => {
    return (
        <div className='amenities'>
            <div className='title'>
                Amenities
            </div>
            <ul className='amenities-list'>
                {
                    amenities.map(item=>(
                        <li className='amenities-list-item'>
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};
export default AmenitiesComponent;