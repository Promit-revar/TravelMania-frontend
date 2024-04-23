import axios from "axios";
const makeRequest = async({method, body={}, url, headers={ "Content-Type":'application/json'}, ...defaultConfig}) => {
    try{
    const response = await axios({
        method: method,
        url: url,
        data: body,
        headers: headers,
        ...defaultConfig
    });
    if(response.status === 200){
        return {data:response.data, error: null};
    }
    else{
        return {data: null, error: response.data.error};
    }
}catch(err){
    return {data: null, error: 'Something went wrong'};
}
}
export default makeRequest;