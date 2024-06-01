import React,{useContext} from 'react';
import { DatePicker, MuiPickersAdapterContext } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import './DatePicker.css';
import CalendarIcon from '../../../Icons/CalendarIcon';

const DatePickerComponent = ({ label, date, setDate }) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <img src={CalendarIcon} /> */}
                <DatePicker
                    onChange={(date)=>setDate(dayjs(date).format('YYYY-MM-DD'))}
                    className='date-picker'
                    label={label}
                    defaultValue={dayjs(new Date(date))}
                    format='MMM DD'
                    slots={{
                        openPickerIcon: CalendarIcon,
                      }}
                    slotProps={{
                        // Targets the `IconButton` component.
                        openPickerButton: {
                            color: '#000',
                        },
                        // Targets the `InputAdornment` component.
                        inputAdornment: {
                            position: 'start',
                        },
                    }}
                />

            </LocalizationProvider>
            {/* <input type='date' className="date-picker" /> */}

        </>
    )
};
export default DatePickerComponent;