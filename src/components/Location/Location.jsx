import React from "react";
import './Location.css';
import { ChevronRight } from "lucide-react";
import Image from "../../UI/components/Image/Image";
import gmap from '../../assets/gmap.png';
const LocationComponent = ({address}) => {
    return (
        <div className="location">
            <div className="title"> Where you'll be</div>
            <div className="addr">{address}</div>
            <div className="view">View in map <ChevronRight size={'12px'}/></div>
            {/* <div className="map">

            </div> */}
            <Image src={gmap} height='350px' width='100%' />
        </div>
    );
};
export default LocationComponent;