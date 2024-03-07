import React,{useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Hotel1 from '../../assets/1-Bedroom-Club-IC-Pool-Villa-2.jpg';
import Hotel2 from '../../assets/2-Bedroom-Club-IC-Pool-Villa-1-1.jpg';
import Hotel3 from '../../assets/3-Bedroom-Club-IC-Pool-Villa-3.jpg';
import Image from '../../UI/components/Image/Image';
import heart from '../../assets/Heart.svg';
import { ChevronLeftCircle, ChevronRightCircle, Heart } from 'lucide-react';

import './Carousel.css'

const CustomIndicators = ({ items, activeIndex, onSelect }) => {
    return (
      <div className="custom-indicators">
        {items.map((_, idx) => (
          <span
            key={idx}
            className={idx === activeIndex ? 'active' : ''}
            onClick={() => onSelect(idx)}
            style={{
              backgroundColor: idx === activeIndex ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              display: 'inline-block',
              margin: '0 5px',
              cursor: 'pointer'
            }}
          ></span>
        ))}
      </div>
    );
  };

const CarouselComponent = () => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }
    return (
        <div className='img-corousel'>
            <Carousel 
            activeIndex={index} 
            onSelect={handleSelect}
            slide={false} 
            prevIcon={<ChevronLeftCircle fill='#fff' color='#000'/>} 
            nextIcon={<ChevronRightCircle fill='#fff' color='#000'/>} 
            prevLabel={null} 
            nextLabel={null}
            indicators={false}
            >
                <Carousel.Item>
                    <Image src={Hotel1} height={'200px'} width={'300px'}/>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={Hotel2} height={'200px'} width={'300px'}/>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={Hotel3} height={'200px'} width={'300px'}/>
                </Carousel.Item>
                
            </Carousel>
            <CustomIndicators items={[Hotel1,Hotel2,Hotel3]} activeIndex={index} onSelect={handleSelect} />
            <div className='heart'><Heart color='#fff'/></div>
            
        </div>
        
    );
};
export default CarouselComponent;