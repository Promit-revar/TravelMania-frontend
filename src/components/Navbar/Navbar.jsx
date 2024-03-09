import './Navbar.css'
import { NavbarList } from '../../constants/constants'
import { Instagram, Mail } from 'lucide-react';
const NavBarComponent = () => {
    return (
        <div className='nav'>
            <div className='logo'>
                <span style={{ marginBottom:'-14px'}}>Phuket</span>
                <span >Concierge</span>
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