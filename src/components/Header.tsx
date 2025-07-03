import '../styles/Header.css';
import { useState } from 'react';
import hamBurgerIcon from '../assets/hamburger.png';
import crossMenu from '../assets/crossMenu.png';
import stats from '../assets/graph.png';
import leaderBoard from '../assets/team.png';


type headerProps = {
  setIsAuth: (auth: boolean) => void;
};

export default function Header({setIsAuth }: headerProps) {
    const [sideBar, setSideBar] = useState(false);
    return (
        <div className="header">
                <div className='userName'>Hello Yashwant!</div>
                <img src={stats} className='menuBtnStats' title="Your Stats" />
                <img src={leaderBoard} className='menuBtnLeaderBoard'title="Leader Board" />
                {!sideBar ? 
                     <img src={hamBurgerIcon} className='menuBtnHamburger' onClick={() => setSideBar(prev => !prev)} />
                    : (
                    <>
                     <img src={crossMenu} className='menuBtnCross' onClick={() => setSideBar(prev => !prev)} />
                    <div className="sideMenu">
                        <button onClick={() => setIsAuth(false)}>Log Out</button>
                    </div>
                    </>
                   
                )}
        </div>
    );
} 