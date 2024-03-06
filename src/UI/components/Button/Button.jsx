import './button.css';
const Button = ({label='submit', onClick=()=>{}}) => {
    return <button onClick={onClick} className='btn'>{label}</button>
}
export default Button;