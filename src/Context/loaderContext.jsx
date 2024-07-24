import React from 'react';
export const LoaderContext = React.createContext({});
export const LoaderContextProvider = ({ children }) => {
    const [isLoadingContext, setIsLoadingContext] = React.useState(false);
    return (
        <LoaderContext.Provider value={{ isLoadingContext, setIsLoadingContext }}>
        {children}
        </LoaderContext.Provider>
    );
};