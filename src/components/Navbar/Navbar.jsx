import React,{useState} from 'react';
import './Navbar.css'
import { NavbarList } from '../../constants/constants'
import { Instagram, Mail, Menu } from 'lucide-react';
const NavBarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className='nav'>
            <div className='logo'>
                <span style={{ marginBottom:'-14px'}}>Phuket</span>
                <span >Concierge</span>
            </div>
            <div className='hamburger-menu' onClick={toggleMenu}>
                {!isOpen && <Menu />}
                {isOpen && <button className='btn-close'/>}
                <ul className={`menu-icon ${isOpen ? 'open' : ''}`}>
                {isOpen && NavbarList.map((listitem,i) => <><li key={i}><a href={listitem.addr}>{listitem.name}</a></li><hr /></>
                    )}
                </ul>
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