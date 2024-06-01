import makeRequest from "../utils/makeRequest.js";

const BASE_URL = "https://phuket-concierge.com/api/";
export async function getAllHotels(getHotels){
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
    const response = await makeRequest({method: 'POST', url, body:{...body}});
    return response;
}
export async function getNextFilteredHotelResults(params){
    const url = BASE_URL+"moreFilterResults?";
    const response = await makeRequest({method: 'GET', url: url, params:{...params}});
    return response;
}
export async function getRoomRates(body){
    const url = BASE_URL+"get_room_rates";
    const response =  await makeRequest({method: 'POST', url, body:{...body}});
    return response;
}
export async function getRoomDetails(body){
    const url = BASE_URL+"get_rate_rules";
    const response = await makeRequest({method: 'POST', url, body:{...body}});
    return response;
}
export async function bookHotel(body){
    const url = BASE_URL+"booking";
    const response = await makeRequest({method: 'POST', url, body:{...body}});
    return response;
}
export async function getToken(body){
    const url = BASE_URL+"store";
    const response = await makeRequest({method: 'POST', url, body:{...body}});
    return response;
}