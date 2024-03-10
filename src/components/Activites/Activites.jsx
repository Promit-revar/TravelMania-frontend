import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import {ChevronLeftCircle, ChevronRightCircle} from 'lucide-react';
import ActivityCardsComponent from "./Components/ActivityCards";
import {activities} from '../../constants/constants';
import './Activites.css';
const ActivitiesComponent = () => {
    return (
        <div className="activities">
            <div className="mobile-view-activites">
                {activities.map(act=><ActivityCardsComponent imgsrc={act.img} name={act.name} price={act.price} dist={act.dist}/>)}
            </div>
        <Carousel  
            prevIcon={<ChevronLeftCircle fill='#fff' color='#000'/>} 
            nextIcon={<ChevronRightCircle fill='#fff' color='#000'/>} 
            prevLabel={null} 
            nextLabel={null}
            indicators={false}
            >
                <Carousel.Item style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    {activities.map(act=><ActivityCardsComponent imgsrc={act.img} name={act.name} price={act.price} dist={act.dist}/>)}
                </Carousel.Item>

        </Carousel>
        </div>
    );
}
export default ActivitiesComponent;