import makeRequest from "../utils/makeRequest.js";
import { getHotels } from "../constants/constants.jsx";
import axios from "axios";
const BASE_URL = "https://travelnext.works/api/hotel_trawexv6/";
export async function getAllHotels(){
    const res = await axios.get("https://api.ipify.org/?format=json");
    const userIp = res.data.ip;
    const body = {...getHotels, ip_address: userIp};
    const url = BASE_URL+"hotel_search";
    const response = await makeRequest({method:'POST',url:url, body:{...body}});
    return response;
}
export async function getHotelDetails(body){
    const url = BASE_URL+"hotelDetails";
    const response = await makeRequest({method: 'GET', url: url, params:{...body}});
    return response;
}
export async function getNextHotelSearchResults(params){
    const url = BASE_URL+"moreResults";
    const response = await makeRequest({method: 'GET', url: url, params:{...params}});
    return response;
}