import React from "react";
import './Location.css';
import { ChevronRight } from "lucide-react";
import Image from "../../UI/components/Image/Image";
import gmap from '../../assets/gmap.png';
const LocationComponent = ({address, location}) => {
    const location_link = `https://maps.google.com/?q=${location?.lat},${location?.long}`;
    return (
        <div className="location">
            <div className="title"> Where you'll be</div>
            <div className="addr">{address}</div>
            <a className="view" href={location_link}>View in map <ChevronRight size={'12px'}/></a>
            {/* <div className="map">

            </div> */}
            <iframe src={location_link+"&output=embed"} height='350px' width='100%' />
            {/* <Image src={gmap} height='350px' width='100%' /> */}
        </div>
    );
};
export default LocationComponent;