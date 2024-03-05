import './Navbar.css'
import NavList from '../NavigationList/NavList';
import { NavbarList } from '../../constants/constants'
import { Instagram, Mail } from 'lucide-react';
const NavBarComponent = () => {
    return (
        <div className='nav'>
            <div className='logo'>
                <b>Travel Mania</b>
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