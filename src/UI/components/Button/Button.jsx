import './button.css';
const Button = ({label='submit', onClick=()=>{}}) => {
    return <button onClick={onClick} className='button'>{label}</button>
}
export default Button;