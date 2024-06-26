import React,{useState} from 'react';
import './Navbar.css'
import { NavbarList } from '../../constants/constants'
import { useNavigate } from 'react-router-dom';
import { Instagram, Mail, Menu } from 'lucide-react';
const NavBarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleLogoClick = () =>{
        window.location.replace('/');
    }
    return (
        <div className='nav'>
            <div className='logo' onClick={handleLogoClick}>
                <span style={{ marginBottom:'-14px'}}>Phuket</span>
                <span >Concierge</span>
            </div>
            <div className='hamburger-menu' onClick={toggleMenu}>
                {!isOpen && <Menu />}
                {isOpen && <button className='btn-close'/>}
                {isOpen && <ul className={`menu-icon ${isOpen ? 'open' : ''}`}>
                 {NavbarList.map((listitem,i) => <><li key={i}><a href={listitem.addr}>{listitem.name}</a></li><hr /></>
                    )}
                    <li><Instagram fill='#000' color='#fff'/> Instagram</li>
                    <hr/>
                    <li><Mail fill='#000' color='#fff' /> email</li>
                    <hr />
                </ul>}
            </div>
            <ul className='nav-list'>
                {NavbarList.map((listitem,i) => <li key={i}><a href={listitem.addr}>{listitem.name}</a></li>
                    )}
            </ul>
            <div className='icons'>
                <Instagram fill='#000' color='#fff'/>
                <Mail fill='#000' color='#fff' />
            </div>
        </div>
    )
}
export default NavBarComponent;