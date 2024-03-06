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
            <DropdownComponent label={'Age'}/>
            <Button label='Reserve'/>
        </div>
    )
}
export default SelectRoomComponent;