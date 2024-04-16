import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import '../../../../node_modules/react-toastify/dist/ReactToastify.css';
const ErrorHandlingComponent = ({ error }) => {
    
    toast.error(error);
    
    return (
        <ToastContainer />
    )
}
export default ErrorHandlingComponent;