import React from 'react';
export const HotelContext = React.createContext({});
export const HotelContextProvider = ({ children }) => {
    const [hotelDetails, setHotelDetails] = React.useState({});
    return (
        <HotelContext.Provider value={{ hotelDetails, setHotelDetails }}>
        {children}
        </HotelContext.Provider>
    );
};