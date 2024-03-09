import './SelectRoom.css';
import DatePickerComponent from '../../UI/components/DatePicker/DatePicker';
import Button from '../../UI/components/Button/Button';
import DropdownComponent from '../../UI/components/Dropdown/Dropdown';
const SelectRoomComponent = () => {
    return (
        <div className='schedule-block'>
            <div className="select-block">
                <DatePickerComponent label='Check-in'/>
                <DatePickerComponent label={'Check-out'}/>
            </div>
            <DropdownComponent label={'Travelers'}/>
            <Button label='Reserve'/>
            <div className='msg'>You won't be charged yet</div>
        </div>
    )
}
export default SelectRoomComponent;