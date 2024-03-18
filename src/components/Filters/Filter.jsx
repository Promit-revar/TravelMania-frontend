import React,{useState} from "react";
import { TextField, InputAdornment, Checkbox, Slider} from "@mui/material";
import { Search, Star, ChevronRight, ChevronUp } from 'lucide-react';
import { filterInitialState } from "../../constants/constants";
import "./Filter.css";
const FilterComponent = ({popularFilters, guestRating, paymentMethods, propertyType, mealPlans, AmenitiesList, Accessibilities}) => {
    const [priceRange, setPriceRange] = useState([0,50]); 
    const [openPropertyType, setOpenPropertyType] = useState(false);
    const [openAmeneties, setOpenAmeneties] = useState(false);
    const [openAccessibility, setOpenAccessibility] = useState(false);
    const [alterPriceRange, setAlterPriceRange] = useState(false);
    const [filterValue, setFilterValue] = useState({...filterInitialState});

    const handlePriceRange = (values) => {
        setAlterPriceRange(false);
        setPriceRange(values.target.value);
    }
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
                        <div style={{display:"flex", flexDirection:"row",gap:"1px"}} onClick={()=>setAlterPriceRange(true)}><div>$</div>{!alterPriceRange && priceRange[0]}{alterPriceRange && <div style={{marginTop:'-3px'}}><TextField variant="standard" defaultValue={priceRange[0]} onChange={(e)=>setPriceRange([e.target.value,priceRange[1]])}/></div>}</div>
                    </div>
                    <div className="price-filter">
                        <div>Max</div>
                       <div style={{display:"flex", flexDirection:"row",gap:"1px"}} onClick={()=>setAlterPriceRange(true)}><div>$</div>{!alterPriceRange && priceRange[1]}{alterPriceRange && <div style={{marginTop:'-3px'}}><TextField variant="standard" defaultValue={priceRange[1]} onChange={(e)=>setPriceRange([priceRange[0],e.target.value])}/></div>}</div>
                    </div>
                </div>
                <div style={{marginTop:'20px'}}>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={priceRange}
                        max={1000}
                        min={0}
                        onChange={handlePriceRange}
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
            <div style={{marginTop:'20px'}}>
            <div className="filter-title">Property cancellation options</div>
            
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
                            />{'Fully refundable property'}
                        </div>
            </div>
            <div style={{marginTop:'20px'}}>
            <div className="filter-title">Property type</div>
            {!openPropertyType  && propertyType.map((filter, i)=>{
                    if(i<3){
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
                        }
                        return;
                })}
                {!openPropertyType && <div className="expand-list" onClick={()=>setOpenPropertyType(true)}>See more <ChevronRight  size={'20px'} color="#399a7a"/></div>}
                {openPropertyType && propertyType.map((filter, i)=>{
                   
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
                {openPropertyType && <div className="expand-list" onClick={()=>setOpenPropertyType(false)}>See fewer <ChevronUp size={'20px'} color="#399a7a"/></div>}
            </div>
            <div style={{marginTop:'20px'}}>
            <div className="filter-title">Meal plans available</div>
            {mealPlans.map((filter)=>{
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
            <div className="filter-title">Amenities</div>
            {!openAmeneties  && AmenitiesList.map((filter, i)=>{
                    if(i<3){
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
                                />{filter.name}
                            </div>
                        )
                        }
                        return;
                })}
                {!openAmeneties && <div className="expand-list" onClick={()=>setOpenAmeneties(true)}>See more <ChevronRight  size={'20px'} color="#399a7a"/></div>}
                {openAmeneties && AmenitiesList.map((filter, i)=>{
                   
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
                                />{filter.name}
                            </div>
                        )
                })}
                {openAmeneties&& <div className="expand-list" onClick={()=>setOpenAmeneties(false)}>See fewer <ChevronUp size={'20px'} color="#399a7a"/></div>}
            </div>
            <div style={{marginTop:'20px'}}>
            <div className="filter-title">Accessibility</div>
            {!openAccessibility  && Accessibilities.map((filter, i)=>{
                    if(i<3){
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
                        }
                        return;
                })}
                {!openAccessibility && <div className="expand-list" onClick={()=>setOpenAccessibility(true)}>See more <ChevronRight  size={'20px'} color="#399a7a"/></div>}
                {openAccessibility && Accessibilities.map((filter, i)=>{
                   
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
                {openAccessibility&& <div className="expand-list" onClick={()=>setOpenAccessibility(false)}>See fewer <ChevronUp size={'20px'} color="#399a7a"/></div>}
            </div>
        </div>
    )
};
export default FilterComponent;