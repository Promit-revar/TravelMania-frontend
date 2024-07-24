import './button.css';
import React,{useContext} from 'react';
import { LoaderContext } from '../../../Context/loaderContext';
import { ClipLoader } from "react-spinners";
const Button = ({label='submit', onClick=()=>{}}) => {
    const {isLoadingContext, setIsLoadingContext} = useContext(LoaderContext);
    if(!isLoadingContext)
    return <button onClick={onClick} className='button'>{label}</button>
    return <button onClick={onClick} className='button' style={{padding:'15px'}} disabled><ClipLoader color='#fff' size={25}/></button>
}
export default Button;