import React from "react";
import { TextField, InputAdornment, Checkbox, Slider} from "@mui/material";
import { Search } from 'lucide-react';
import "./Filter.css";
const FilterComponent = ({popularFilters}) => {
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
                        $<div style={{marginTop:'-30px'}}><TextField variant="standard"/></div>
                    </div>
                    <div className="price-filter">
                        <div>Max</div>
                        $<div style={{marginTop:'-30px'}}><TextField variant="standard"/></div>
                    </div>
                </div>
                <div>
                    <Slider
                        defaultValue={30}
                        color="secondary"             
                    />
                </div>
            </div>
            
        </div>
    )
};
export default FilterComponent;