import axios from "axios";
const makeRequest = async({method, body={}, url, headers={"Access-Control-Allow-Origin": "*", "Content-Type":"application/json"}}) => {
    console.log(method,url);
    try{
    const response = await axios({
        method: method,
        url: url,
        data: body,
        headers: headers
    });
    return response;
}catch(err){
    console.log(err);
}
}
export default makeRequest;