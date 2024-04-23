import React from 'react';
export const LoaderContext = React.createContext({});
export const LoaderContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
        {children}
        </LoaderContext.Provider>
    );
};