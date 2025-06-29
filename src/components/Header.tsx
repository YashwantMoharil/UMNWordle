import '../styles/Header.css';
import { useState } from 'react';
import hamBurgerIcon from '../assets/hamburger.png';
import crossMenu from '../assets/crossMenu.png';



export default function Header() {
    const [sideBar, setSideBar] = useState(false);
    return (
        <div className="header">
                <div className='userName'>Hello Yashwant!</div>
                {sideBar ? 
                     <img src={hamBurgerIcon} className='menuBtnHamburger' onClick={() => setSideBar(prev => !prev)} />
                    : (
                    <>
                     <img src={crossMenu} className='menuBtnCross' onClick={() => setSideBar(prev => !prev)} />
                    <div className="sideMenu">
                        <button >Leaders</button>
                        <button >Stats</button>
                        <button >Log Out</button>
                    </div>
                    </>
                   
                )}
        </div>
    );
} 