import React from "react";
import { TextField, InputAdornment, Checkbox, Slider} from "@mui/material";
import { Search, Star } from 'lucide-react';
import "./Filter.css";
const FilterComponent = ({popularFilters, guestRating, paymentMethods}) => {
    const priceRange = [0,50];
    return (
        <div className="filter">
            <div className="filter-title">Search by property name</div>
            <div className="filter-search">
                <TextField
                    id="input-with-icon-textfield"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <Search />
                        </InputAdornment>
                    ),
                    }}
                    fullWidth
                />
            </div>
            <div className="filter-title-main">
                Filter By
            </div>
            <div className="filter-title">Popular filters</div>
            <div className="popular-filters">
                {popularFilters.map(filter=>{
                    return (
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                            <Checkbox 
                            sx={{
                                "&.Mui-checked": {
                                  color: "#399a7a",
                                },
                                "& .MuiSvgIcon-root": {
                                    borderRadius: 10,
                             },
                              }}
                            />{filter}
                        </div>
                    )
                })}
            </div>
            <div style={{marginTop: '20px'}}>
                <div className="filter-title">Price per night</div>
                <div className="min-max">
                    <div className="price-filter">
                        <div>Min</div>
                        <div style={{display:"flex", flexDirection:"row",gap:"1px"}}><div>$</div><div style={{marginTop:'-3px'}}><TextField variant="standard" defaultValue={0}/></div></div>
                    </div>
                    <div className="price-filter">
                        <div>Max</div>
                       <div style={{display:"flex", flexDirection:"row",gap:"1px"}}><div>$</div><div style={{marginTop:'-3px'}}><TextField variant="standard" defaultValue={50}/></div></div>
                    </div>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        defaultValue={priceRange}
                        sx={{
                            '& .MuiSlider-thumb': {
                                color: "#399a7a",
                            },
                            '& .MuiSlider-track': {
                                color: "#399a7a",
                            },
                        }}            
                    />
                </div>
            </div>
            <div className="filter-title">Guest rating</div>
            <div className="popular-filters">
                {guestRating.map(filter=>{
                    return (
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                            <Checkbox 
                            sx={{
                                "&.Mui-checked": {
                                  color: "#399a7a",
                                },
                                "& .MuiSvgIcon-root": {
                                    borderRadius: 10,
                             },

                              }}
                            />{filter}
                        </div>
                    )
                })}
            </div>
            <div style={{marginTop:'20px'}}>
            <div className="filter-title">Star rating</div>
                <div className="star-rating-filter">
                    {[1,2,3,4,5].map(item=>{
                        return (
                            <div className="star-rating-box">
                                {item} <Star color='#FFD700' size={'14px'} fill='#FFD700'/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div style={{marginTop:'20px'}}>
            <div className="filter-title">Payment type</div>
            {paymentMethods.map(filter=>{
                    return (
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                            <Checkbox 
                            sx={{
                                "&.Mui-checked": {
                                  color: "#399a7a",
                                },
                                "& .MuiSvgIcon-root": {
                                    borderRadius: 10,
                             },

                              }}
                            />{filter}
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
};
export default FilterComponent;