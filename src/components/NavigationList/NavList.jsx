import './NavList.css';
import React from 'react';
import { useState } from 'react';
const NavList = ({items}) => {
    const [selectedId, setSelectedId] = useState(0);
    return (
        <ul className='navigation-items-list'>
            {
                items.map((listitem,i) => {
                    if(selectedId === i){
                        return (
                        <li key={i} onClick={()=>setSelectedId(i)}>
                            <div className='itembox underline'>
                                <a href={listitem.addr}>{listitem.name}</a>
                            </div>
                        </li>
                        )
                    }
                    else{
                        return (
                            <li key={i} onClick={()=>setSelectedId(i)}>
                                <div className='itembox'>
                                    <a href={listitem.addr}>{listitem.name}</a>
                                </div>
                            </li>
                            )
                    }
                }
                )
            }
        </ul>
    )
}
export default NavList;