import React from 'react';
export const HotelBookingContext = React.createContext({});
export const HotelBookingContextProvider = ({ children }) => {
    const [hotelBookingDetails, setHotelBookingDetails] = React.useState({});
    return (
        <HotelBookingContext.Provider value={{ hotelBookingDetails, setHotelBookingDetails }}>
        {children}
        </HotelBookingContext.Provider>
    );
};