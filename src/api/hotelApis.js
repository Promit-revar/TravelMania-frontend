import makeRequest from "../utils/makeRequest.js";

import axios from "axios";
const BASE_URL = "https://travelnext.works/api/hotel_trawexv6/";
const headers = {'X-Forwarded-For':'185.137.122.196'}
export async function getAllHotels(getHotels){
    // const res = await axios.get("https://api.ipify.org/?format=json");
    // const userIp = '85.137.122.196';
    const body = {...getHotels};
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
export async function getHotelByFilters(body) {
    const url = BASE_URL+"filterResults";
    console.log(body);
    const response = await makeRequest({method: 'POST', url, body:{...body}});
    return response;
}
export async function getNextFilteredHotelResults(params){
    const url = BASE_URL+"moreFiterResults?";
    const response = await makeRequest({method: 'GET', url: url, params:{...params}});
    return response;
}