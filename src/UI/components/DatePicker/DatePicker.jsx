import { DatePicker, MuiPickersAdapterContext } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarDays } from 'lucide-react';
import './DatePicker.css';
const DatePickerComponent = ({ label }) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <DatePicker
                    className='date-picker'
                    label={label}
                    slots={{
                        openPickerIcon: CalendarDays,
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