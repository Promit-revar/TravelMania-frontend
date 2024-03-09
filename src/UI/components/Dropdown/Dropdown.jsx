import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import './Dropdown.css';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
const DropdownComponent = ({label}) => {
    return (
        <div >
        {/* <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel> */}
        <TextField
          className='dropdown'
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label={label}
          select
        >
          <MenuItem value={label}>
            <em>{label}</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </TextField>
        </div>
    )
};
export default DropdownComponent;