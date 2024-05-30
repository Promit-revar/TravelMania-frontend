import React,{useEffect, useState, useRef, useContext} from "react";
import { TextField, InputAdornment, Checkbox, Slider} from "@mui/material";
import { Search, Star, ChevronRight, ChevronUp, ChevronDownCircle , ChevronUpCircle } from 'lucide-react';
import { filterInitialState } from "../../constants/constants";
import { filterBodyConverter } from "../../utils/helper";
import { LoaderContext } from "../../Context/loaderContext";
import "./Filter.css";

const FilterComponent = ({popularFilters, guestRating, paymentMethods, propertyType, mealPlans, AmenitiesList, Accessibilities, activeFilter, setActiveFilter, setFilters}) => {
    // context variables
    const { isLoading, setIsLoading } = useContext(LoaderContext);
    // state variables
    const [priceRange, setPriceRange] = useState([0,1500]); 
    const [openPropertyType, setOpenPropertyType] = useState(false);
    const [openAmeneties, setOpenAmeneties] = useState(false);
    const [openAccessibility, setOpenAccessibility] = useState(false);
    const [alterPriceRange, setAlterPriceRange] = useState(false);
    const [filterValue, setFilterValue] = useState({...filterInitialState});
    const isMounted = useRef(false);
    console.log({filterValue});
    const handlePriceRange = (values) => {
        setAlterPriceRange(false);
        setPriceRange(values.target.value);
    }
    const handleFilterSelect = (value) => {
        if(value === activeFilter) setActiveFilter(0);
        else setActiveFilter(value);
    }
    const useOnUpdate = (callback, deps) => {
        const isFirst = useRef(true);
        useEffect(() => {
          if (!isFirst.current) {
            callback();
          }
        }, deps);
        useEffect(() => {
          isFirst.current = false;
        }, []);
      };
    useOnUpdate(()=>{
        if(isMounted.current){
            setIsLoading(true);
            setFilters(filterBodyConverter(filterValue));
        }
        else
            isMounted.current = true;
    },[filterValue]);
    const handleFilterCheck = (filterName,value,filterItem) =>{
        if(value){
            setFilterValue({...filterValue,...{[filterName]:[...filterValue[filterName], filterItem]}});
        }
        else{
            const tempArr = filterValue[filterName].filter(item=>item!=filterItem);
            setFilterValue({...filterValue,...{[filterName]:[...tempArr]}});
        }
    }
    const handleSearch = (e) => {
        setFilterValue({...filterValue,search:e.target.value})
    }
    useEffect(()=>{
        setFilterValue({...filterValue,priceRange:[priceRange[0].toString(),priceRange[1].toString()]});
    },[priceRange]);
    return (
        <div className="filter">
            <div onClick={()=>setActiveFilter(0)}>
            <div className="filter-title">Search by property name</div>
            <div className="filter-search">
                <TextField
                    onChange={handleSearch}
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
            </div>
            <div className="dropdown-filters-layout">
            <div className="dropdown-filters" onClick={()=>handleFilterSelect(1)}>Popular filters {(activeFilter==1)?<ChevronUpCircle size={'18px'}/>:<ChevronDownCircle size={'18px'}/>}</div>
            <div className="filter-component">
                <div className="filter-title">Popular filters</div>
                <div className="popular-filters">
                    {popularFilters.map((filter, i)=>{
                        return (
                            <div key={i} style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                                <Checkbox 
                                onChange={e =>handleFilterCheck('popularFilters',e.target.checked, filter)} 
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },
                                }}
                                checked={filterValue.popularFilters.indexOf(filter) != -1}
                                />{filter}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="dropdown-filters" onClick={()=>handleFilterSelect(2)}>Price per night {(activeFilter==2)?<ChevronUpCircle size={'18px'}/>:<ChevronDownCircle size={'18px'}/>}</div>
            <div style={{marginTop: '20px'}} className="filter-component">
            
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
                        max={2000}
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
            <div className="dropdown-filters" onClick={()=>handleFilterSelect(3)}>Guest rating {(activeFilter==3)?<ChevronUpCircle size={'18px'}/>:<ChevronDownCircle size={'18px'}/>}</div>
            <div className="filter-component filter-title">Guest rating</div>
            <div className="filter-component popular-filters">
                {guestRating.map((filter, i)=>{
                    return (
                        <div key={i} style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                            <Checkbox 
                            onChange={e =>handleFilterCheck('guestRating',e.target.checked, filter)} 
                            sx={{
                                "&.Mui-checked": {
                                  color: "#399a7a",
                                },
                                "& .MuiSvgIcon-root": {
                                    borderRadius: 10,
                             },

                              }}
                              checked={filterValue.guestRating.indexOf(filter) != -1}
                            />{filter}
                        </div>
                    )
                })}
            </div>
            <div className="dropdown-filters" onClick={()=>handleFilterSelect(4)}>Star rating {(activeFilter==4)?<ChevronUpCircle size={'18px'}/>:<ChevronDownCircle size={'18px'}/>}</div>
            <div style={{marginTop:'20px'}} className="filter-component">
            <div className="filter-title">Star rating</div>
                <div className="star-rating-filter">
                    {[4,5].map(item=>{
                        return (
                            <div className={(filterValue.starRating.indexOf(item) === -1)?"star-rating-box":"star-rating-box active-filter"} onClick={()=>handleFilterCheck('starRating',filterValue.starRating.indexOf(item) === -1,item)}>
                                {item} <Star color='#FFD700' size={'14px'} fill='#FFD700'/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="dropdown-filters" onClick={()=>handleFilterSelect(5)}>Payment type {(activeFilter==5)?<ChevronUpCircle size={'18px'}/>:<ChevronDownCircle size={'18px'}/>}</div>
            <div style={{marginTop:'20px'}} className="filter-component">
            <div className="filter-title">Payment type</div>
            {paymentMethods.map(filter=>{
                    return (
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                            <Checkbox 
                            onChange={e =>handleFilterCheck('paymentType',e.target.checked, filter)} 
                            sx={{
                                "&.Mui-checked": {
                                  color: "#399a7a",
                                },
                                "& .MuiSvgIcon-root": {
                                    borderRadius: 10,
                             },

                              }}
                              checked={filterValue.paymentType.indexOf(filter) != -1}
                            />{filter}
                        </div>
                    )
                })}
            </div>
            <div className="dropdown-filters" onClick={()=>handleFilterSelect(6)}>Property cancellation options {(activeFilter==6)?<ChevronUpCircle size={'18px'}/>:<ChevronDownCircle size={'18px'}/>}</div>
            <div style={{marginTop:'20px'}} className="filter-component">
            <div className="filter-title">Property cancellation options</div>
            
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                            <Checkbox 
                            onChange={e =>handleFilterCheck('cancellationOptions',e.target.checked, 'Fully refundable property')} 
                            sx={{
                                "&.Mui-checked": {
                                  color: "#399a7a",
                                },
                                "& .MuiSvgIcon-root": {
                                    borderRadius: 10,
                             },

                              }}
                              checked={filterValue.cancellationOptions.indexOf('Fully refundable property') != -1}
                            />{'Fully refundable property'}
                        </div>
            </div>
            <div className="dropdown-filters" onClick={()=>handleFilterSelect(7)}>Property type {(activeFilter==7)?<ChevronUpCircle size={'18px'}/>:<ChevronDownCircle size={'18px'}/>}</div>
            <div style={{marginTop:'20px'}} className="filter-component">
            <div className="filter-title">Property type</div>
            {!openPropertyType  && propertyType.map((filter, i)=>{
                    if(i<3){
                        return (
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                                <Checkbox 
                                onChange={e =>handleFilterCheck('propertyType',e.target.checked, filter.value)} 
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },
                                
                                }}
                                
                                />{filter.label}
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
                                onChange={e =>handleFilterCheck('propertyType',e.target.checked, filter.value)} 
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },

                                }}
                                checked={filterValue.propertyType.indexOf(filter.value) != -1}
                                />{filter.label}
                            </div>
                        )
                })}
                {openPropertyType && <div className="expand-list" onClick={()=>setOpenPropertyType(false)}>See fewer <ChevronUp size={'20px'} color="#399a7a"/></div>}
            </div>
            <div className="dropdown-filters" onClick={()=>handleFilterSelect(8)}>Meal plans available {(activeFilter==8)?<ChevronUpCircle size={'18px'}/>:<ChevronDownCircle size={'18px'}/>}</div>
            <div style={{marginTop:'20px'}} className="filter-component">
            <div className="filter-title">Meal plans available</div>
            {mealPlans.map((filter)=>{
                        return (
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                                <Checkbox 
                                onChange={e =>handleFilterCheck('mealPlans',e.target.checked, filter)} 
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },

                                }}
                                checked={filterValue.mealPlans.indexOf(filter) != -1}
                                />{filter}
                            </div>
                        )
                })}
            </div>
            {/* <div className="dropdown-filters" onClick={()=>handleFilterSelect(9)}>Amenities {(activeFilter==9)?<ChevronUpCircle size={'18px'}/>:<ChevronDownCircle size={'18px'}/>}</div>
            <div style={{marginTop:'20px'}} className="filter-component">
            <div className="filter-title">Amenities</div>
            {!openAmeneties  && AmenitiesList.map((filter, i)=>{
                    if(i<3){
                        return (
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                                <Checkbox 
                                onChange={e =>handleFilterCheck('amenities',e.target.checked, filter.name)} 
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },

                                }}
                                checked={filterValue.amenities.indexOf(filter.name) != -1}
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
                                onChange={e =>handleFilterCheck('amenities',e.target.checked, filter.name)} 
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },

                                }}
                                checked={filterValue.amenities.indexOf(filter.name) != -1}
                                />{filter.name}
                            </div>
                        )
                })}
                {openAmeneties&& <div className="expand-list" onClick={()=>setOpenAmeneties(false)}>See fewer <ChevronUp size={'20px'} color="#399a7a"/></div>}
            </div> */}
            <div className="dropdown-filters" onClick={()=>handleFilterSelect(10)}>Accessibility {(activeFilter==10)?<ChevronUpCircle size={'18px'}/>:<ChevronDownCircle size={'18px'}/>}</div>
            <div style={{marginTop:'20px'}} className="filter-component">
            <div className="filter-title">Accessibility</div>
            {!openAccessibility  && Accessibilities.map((filter, i)=>{
                    if(i<3){
                        return (
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: '-5px'}}>
                                <Checkbox
                                onChange={e =>handleFilterCheck('accessibilities',e.target.checked, filter)} 
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },

                                }}
                                checked={filterValue.accessibilities.indexOf(filter) != -1}
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
                                onChange={e =>handleFilterCheck('accessibilities',e.target.checked, filter)}  
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },

                                }}
                                checked={filterValue.accessibilities.indexOf(filter) != -1}
                                />{filter}
                            </div>
                        )
                })}
                {openAccessibility&& <div className="expand-list" onClick={()=>setOpenAccessibility(false)}>See fewer <ChevronUp size={'20px'} color="#399a7a"/></div>}
            </div>
            </div>
            {(() => {
                switch(activeFilter){
                case 1:
                    return (
                        <div className="dropdown-container">
                        <div className="dropdown-content">
                        {popularFilters.map(filter=>{
                        return (
                            <div className="check-boxes">
                                <Checkbox 
                                onChange={e =>handleFilterCheck('popularFilters',e.target.checked, filter)}
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },
                                }}
                                checked={filterValue.popularFilters.indexOf(filter) != -1}
                                />{filter}
                            </div>
                        )
                    })}
                        </div>
                    </div>
                    )
                break;
                case 2:
                    return (
                        <div className="dropdown-container">
                        <div className="dropdown-content">
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
                <div style={{marginTop:'20px', width: "100%"}}>
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
                    </div>
                    )
                break;
                case 3:
                    return (
                        <div className="dropdown-container">
                        <div className="dropdown-content">
                        {guestRating.map(filter=>{
                        return (
                            <div className="check-boxes">
                                <Checkbox 
                                onChange={e =>handleFilterCheck('guestRating',e.target.checked, filter)}
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },
                                }}
                                checked={filterValue.guestRating.indexOf(filter) != -1}
                                />{filter}
                            </div>
                        )
                    })}
                        </div>
                    </div>
                    )
                break;
                case 4:
                    return (
                        <div className="dropdown-container">
                        <div className="dropdown-content">
                        
                            {[4,5].map(item=>{
                                return (
                                    <div className="check-boxes">
                                        <Checkbox 
                                        onChange={e =>handleFilterCheck('starRating',e.target.checked, item)} 
                                        sx={{
                                            "&.Mui-checked": {
                                            color: "#399a7a",
                                            },
                                            "& .MuiSvgIcon-root": {
                                                borderRadius: 10,
                                        },
                                        }}
                                        checked={filterValue.starRating.indexOf(item) != -1}
                                        />
                                        {item} <Star color='#FFD700' size={'14px'} fill='#FFD700'/>
                                    </div>
                                )
                            })}
                        
                        </div>
                    </div>
                    )
                break;
                case 5:
                    return (
                        <div className="dropdown-container">
                        <div className="dropdown-content">
                        {paymentMethods.map(filter=>{
                        return (
                            <div className="check-boxes">
                                <Checkbox 
                                onChange={e =>handleFilterCheck('paymentType',e.target.checked, filter)}
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },
                                }}
                                checked={filterValue.paymentType.indexOf(filter) != -1}
                                />{filter}
                            </div>
                        )
                    })}
                        </div>
                    </div>
                    )
                break;
                case 6:
                    return (
                        <div className="dropdown-container">
                        <div className="dropdown-content">
                        <div className="check-boxes">
                            <Checkbox 
                            onChange={e =>handleFilterCheck('cancellationOptions',e.target.checked, 'Fully refundable property')}
                            sx={{
                                "&.Mui-checked": {
                                  color: "#399a7a",
                                },
                                "& .MuiSvgIcon-root": {
                                    borderRadius: 10,
                             },

                              }}
                              checked={filterValue.cancellationOptions.indexOf('Fully refundable property') != -1}
                            />{'Fully refundable property'}
                        </div>
                        </div>
                    </div>
                    )
                break;
                case 7:
                    return (
                        <div className="dropdown-container">
                        <div className="dropdown-content">
                        {propertyType.map(filter=>{
                        return (
                            <div className="check-boxes">
                                <Checkbox
                                onChange={e =>handleFilterCheck('propertyType',e.target.checked, filter.value)} 
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },
                                }}
                                checked={filterValue.propertyType.indexOf(filter.value) != -1}
                                />{filter.label}
                            </div>
                        )
                    })}
                        </div>
                    </div>
                    )
                break;
                case 8:
                    return (
                        <div className="dropdown-container">
                        <div className="dropdown-content">
                        {mealPlans.map(filter=>{
                        return (
                            <div className="check-boxes">
                                <Checkbox
                                onChange={e =>handleFilterCheck('mealPlans',e.target.checked, filter)}
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },
                                }}
                                checked={filterValue.mealPlans.indexOf(filter) != -1}
                                />{filter}
                            </div>
                        )
                    })}
                        </div>
                    </div>
                    )
                break;
                case 9:
                    return (
                        <div className="dropdown-container">
                        <div className="dropdown-content">
                        {AmenitiesList.map((filter, i)=>{
                        return (
                            <div key={i} className="check-boxes">
                                <Checkbox
                                onChange={e =>handleFilterCheck('amenities',e.target.checked, filter.name)}
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },
                                }}
                                checked={filterValue.amenities.indexOf(filter.name) != -1}
                                />{filter.name}
                            </div>
                        )
                    })}
                        </div>
                    </div>
                    )
                break;
                case 10:
                    return (
                        <div className="dropdown-container">
                        <div className="dropdown-content">
                        {Accessibilities.map((filter, i)=>{
                        return (
                            <div key={i} className="check-boxes">
                                <Checkbox
                                onChange={e =>handleFilterCheck('accessibilities',e.target.checked, filter)} 
                                sx={{
                                    "&.Mui-checked": {
                                    color: "#399a7a",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        borderRadius: 10,
                                },
                                }}
                                checked={filterValue.accessibilities.indexOf(filter) != -1}
                                />{filter}
                            </div>
                        )
                    })}
                        </div>
                    </div>
                    )
                break;
                default :
                    return <></>
            }})()}
        </div>
    )
};
export default FilterComponent;