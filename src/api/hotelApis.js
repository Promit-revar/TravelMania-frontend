import makeRequest from "../utils/makeRequest.js";
import { getHotels } from "../constants/constants.jsx";
import axios from "axios";
export async function getAllHotels(){
    const res = await axios.get("https://api.ipify.org/?format=json");
    const userIp = res.data.ip;
    const body = {...getHotels, ip_address: userIp};
    const response = await makeRequest({method:'POST',url:"https://travelnext.works/api/hotel_trawexv6/hotel_search", body:{...body}});
    return response;
}
export async function getHotelDetails(body){
    const response = await makeRequest({method: 'GET', url: "https://travelnext.works/api/hotel_trawexv6/hotelDetails", params:{...body}});
    return response;
}