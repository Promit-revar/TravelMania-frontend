export const filterBodyConverter = (filters) => {
    let requestBody ={ filters:{
        price:{
            min: filters.priceRange[0],
            max: filters.priceRange[1],
        },
        "sorting": "price-low-high",
        }
    }
    if(filters.starRating.length) requestBody = {...requestBody,filters:{...requestBody.filters,rating: filters.starRating.join()}};
    if(filters.paymentType.length) requestBody = {...requestBody, filters:{...requestBody.filters, faretype: filters.paymentType.join()}}
    if(filters.search) requestBody={...requestBody,filters:{...requestBody.filters,hotelName: filters.search}};
    if(filters.cancellationOptions.length) requestBody={...requestBody,filters:{...requestBody.filters,faretype: filters.cancellationOptions.join()}};
    if(filters.propertyType.length) requestBody = {...requestBody,filters:{...requestBody.filters,propertyType: filters.propertyType.join()}};
    if(filters.amenities.length) requestBody = {...requestBody, filters:{...requestBody.filters,facility: filters.amenities.join()}};
    return requestBody;
}