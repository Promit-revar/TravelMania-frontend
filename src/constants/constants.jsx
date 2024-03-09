import GymIcon from "../assets/Gym.svg";
import SpaIcon from "../assets/Spa.svg";
import RestaurantIcon from '../assets/Restaurant.svg';
import ParkingIcon from '../assets/Parking.svg';
import PeopleIcon from '../assets/People.svg';
import PoolIcon from '../assets/Pool.svg';
import CupIcon from '../assets/Cup.svg';
import SecurityIcon from '../assets/Security.svg';
import TaxiIcon from '../assets/Taxi.svg';
import CoiencergeIcon from '../assets/Concierge.svg';
import AreaIcon from '../assets/Square.svg';
import KidsClubIcon from '../assets/Kids club.svg';
import WifiIcon from '../assets/Wi-Fi.svg';
import BedIcon from '../assets/Bed.svg';
import Act1 from '../assets/photo_2024-03-05 17.11.43.jpeg';
import Act2 from '../assets/photo_2024-03-05 17.11.44.jpeg';
import Act3 from '../assets/photo_2024-03-05 17.11.45.jpeg';
export const  NavbarList = [
    {
        name: "Hotels",
        addr: "#",
    },
    {
        name: "Villas",
        addr: "#",
    },{
        name: "Cars",
        addr: "#",
    },{
        name: "Yatchs",
        addr: "#",
    }
]

export const HotelDetailsNavigationList = [
    {
        name: "Overview",
        addr: "#Overview",
    },
    {
        name: "Amenities",
        addr: "#Amenities",
    },{
        name: "Type of accomodation",
        addr: "#accomodation",
    },{
        name: "You might also like",
        addr: "#hotels",
    },{
        name: "Policies",
        addr: "#Policies",
    }
]

export const AmenitiesList = [
    {
        name: 'Common Pool',
        icon: PoolIcon,
    },{
        name: 'Restaurants',
        icon:  RestaurantIcon,
    },{
        name:'Kids Club',
        icon: KidsClubIcon,
    },{
        name: 'Spa',
        icon: SpaIcon,
    },{
        name: 'The concierge service',
        icon: CoiencergeIcon,
    },{
        name: 'Fitness & gym',
        icon: GymIcon,
    },{
        name: 'Security',
        icon:  SecurityIcon,
    },{
        name: 'Taxi services',
        icon: TaxiIcon,
    },
]

export const AccomodationAmenities = [
    {
        name:'1-Bedroom Club IC Pool Villa',
        price: 4500,
        capacity: 2,
        amenities: [
            {
                name: 'Free Wi-fi',
                icon: WifiIcon,
            },{
                name: 'Free Breakfast',
                icon: CupIcon,
            },
            {
                name: 'Sleeps 2',
                icon: PeopleIcon,
            },{
                name: 'Free self parking',
                icon: ParkingIcon,
            },{
                name: '32 sq.m',
                icon: AreaIcon,
            },{
                name: 'King bed',
                icon: BedIcon,
            },
        ]
    },
    {
        name:'2-Bedroom Club IC Pool Villa',
        price: 6200,
        capacity: 4,
        amenities: [
            {
                name: 'Free Wi-fi',
                icon: WifiIcon,
            },{
                name: 'Free Breakfast',
                icon: CupIcon,
            },
            {
                name: 'Sleeps 4',
                icon: PeopleIcon,
            },{
                name: 'Free self parking',
                icon: ParkingIcon,
            },{
                name: '43 sq.m',
                icon: AreaIcon,
            },{
                name: 'King bed',
                icon: BedIcon,
            },
        ]
    },
    {
        name:'3-Bedroom Club IC Pool Villa',
        price: 8400,
        capacity: 6,
        amenities: [
            {
                name: 'Free Wi-fi',
                icon: WifiIcon,
            },{
                name: 'Free Breakfast',
                icon: CupIcon,
            },
            {
                name: 'Sleeps 6',
                icon: PeopleIcon,
            },{
                name: 'Free self parking',
                icon: ParkingIcon,
            },{
                name: '57 sq.m',
                icon: AreaIcon,
            },{
                name: 'King bed',
                icon: BedIcon,
            },
        ]
    }
]

export const activities = [
    {
        img: Act1,
        name: 'Admission Ticket to Carnival Magic with Buffet Dinner',
        price: 62,
        dist: 0.4
    },
    {
        img: Act2,
        name: 'Beach Horse Riding Activity in Phuket',
        price: 62,
        dist: 0.3
    },{
        img: Act3,
        name: 'ATV, Zipline Adventure',
        price: 21,
        dist: 1.1
    }
]
export const Policies = [
        {
            id: 1,
            title: 'Check-in',
            desc: [
                'Check-in start time: 3:00 PM; Check-in end time: midnight',
                'Early check-in subject to availability',
                'Contactless check-in available',
               ' Late check-in subject to availability',
                'Express check-in available Minimum check-in age: 18',
            ]
        },{
            id: 2,
            title: 'Special check-in instructions',
            desc: [
                'This property offers transfers from the airport (surcharges may apply); guests must contact the property with arrival details before travel, using the contact information on the booking confirmation.',
                'Guests must contact the property in advance for check-in instructions; front desk staff will greet guests on arrival.',
                'To make arrangements for check-in please contact the property ahead of time using the information on the booking confirmation.',
                'If you are planning to arrive after 10:00 PM please contact the property in advance using the information on the booking confirmation.',
                'Guests booked in breakfast included rate plans receive breakfast for up to 2 adults who are sharing a guestroom. Breakfast fees apply for additional guests.',
                'Guests booked in dinner included rate plans receive dinner for up to 2 adults who are sharing a guestroom. Dinner fees apply for additional guests.'
            ]
        },{
            id: 3,
            title: 'Check-out',
            desc: [
                'Check-out before noon',
                'Contactless check-out available',
                'Late check-out subject to availability', 
                'Express check-out available'
            ]
        },{
            id: 4,
            title: 'Access methods',
            desc: [
                'Staffed front desk',
            ]
        },{
            id: 5,
            title: 'Pets',
            desc: [
                'Pets not allowed'
            ]
        },{
            id: 6,
            title: 'Children and extra beds',
            desc: [
                "11 children, up to the age of 12 years, can stay for free if using existing beds when occupying the parent or guardian's room",
                'Rollaway/extra beds are available for THB 2374.0 per day'
            ]
        },{
            id: 7,
            title: 'Property payment types',
            desc: [
                "American Express",
                "JCB",
                "Master Card",
                "Visa Cards"
            ]
        }
    ]