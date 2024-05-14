import React,{ useState } from 'react';
import './Dropdown.css';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
const DropdownComponent = ({label, options=[], index, setTitle, title}) => {
  console.log(title);
  const handleChange = (e) =>{
    console.log(index);
    const titles = title.map((item, i) => {
      if(index === i){
        return e.target.value;
      }
      return item;
    });
    setTitle([...titles]);
  }
    return (
        <div >
        {/* <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel> */}
        <TextField
          className='dropdown'
          labelId="demo-simple-select-helper-label"
          id={`title`}
          label={label}
          defaultValue={options[0].value}
          onChange={handleChange}
          select
        >
          {options.map(option => <MenuItem value={option.value}>{option.label}</MenuItem>)}
        </TextField>
        </div>
    )
};
export default DropdownComponent;