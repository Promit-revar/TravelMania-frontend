import makeRequest from "../utils/makeRequest.js";
import { getHotels } from "../constants/constants.jsx";
import axios from "axios";
export async function getAllHotels(){
    const res = await axios.get("https://api.ipify.org/?format=json");
    const userIp = res.data.ip;
    const body = {...getHotels, ip_address: userIp};
    const response = await axios.post("https://travelnext.works/api/hotel_trawexv6/hotel_search",{...body},{headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      }});
    // const userIp = await makeRequest({method:'GET',url:"https://travelnext.works/api/hotel_trawexv6/hotel_search", body:{...getHotels}});
    return response;
    // const data = await makeRequest('GET',)
}